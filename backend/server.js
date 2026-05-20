const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const cors = require("cors")
require("dotenv").config()

// Number of salt rounds for bcrypt — 10 is the industry-standard sweet spot
// (higher = slower hash = harder to brute-force, but also slower signup)
const SALT_ROUNDS = 10

const app = express()
app.use(cors())
app.use(express.json())

// ── Connect to MongoDB ──
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err))

// ── User Schema ──
const userSchema = new mongoose.Schema({
  username:  { type: String, required: true, unique: true },
  rollno:    { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  session:   { type: String, default: "JanJun2026" },
  createdAt: { type: Date, default: Date.now }
})
const User = mongoose.model("User", userSchema)

// ── Event Registration Schema ──
const eventRegSchema = new mongoose.Schema({
  userId:    { type: String, required: true },
  username:  { type: String, required: true },
  rollno:    { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String },
  clubName:  { type: String },
  eventName: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now }
})
const EventReg = mongoose.model("EventReg", eventRegSchema)

// ── POST /api/signup ──
app.post("/api/signup", async (req, res) => {
  const { username, rollno, password, session } = req.body

  if (!username || !rollno || !password)
    return res.status(400).json({ error: "All fields are required." })

  // Basic length check — prevent single-character passwords
  if (password.length < 4)
    return res.status(400).json({ error: "Password must be at least 4 characters." })

  try {
    const existing = await User.findOne({ $or: [{ username }, { rollno }] })
    if (existing)
      return res.status(409).json({ error: "Username or Roll No already exists." })

    // Hash the password before storing — the raw password NEVER touches the DB
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await User.create({ username, rollno, password: hashedPassword, session })

    // Never return the password field in the response
    return res.status(201).json({ message: "Account created!", userId: user._id })
  } catch (err) {
    console.error("Signup Error:", err)
    return res.status(500).json({ error: "Server error." })
  }
})

// ── POST /api/login ──
app.post("/api/login", async (req, res) => {
  const { username, rollno, password } = req.body

  if (!username || !rollno || !password)
    return res.status(400).json({ error: "All fields are required." })

  try {
    // Find by username + rollno only — we verify the password separately
    const user = await User.findOne({ username, rollno })
    if (!user)
      return res.status(401).json({ error: "Invalid credentials." })

    // ── Password verification with lazy migration ──
    // bcrypt hashes always start with "$2b$" — use this to detect plaintext accounts
    // from before hashing was introduced, and silently upgrade them on first login.
    let passwordMatch = false

    const isAlreadyHashed = user.password.startsWith("$2b$") || user.password.startsWith("$2a$")

    if (isAlreadyHashed) {
      // Normal path — compare the input against the stored bcrypt hash
      passwordMatch = await bcrypt.compare(password, user.password)
    } else {
      // Legacy path — this user's password was stored before hashing was added
      // Check if the raw input matches the old plaintext password
      passwordMatch = (password === user.password)

      if (passwordMatch) {
        // Silently upgrade: hash the correct password and save it now
        const upgraded = await bcrypt.hash(password, SALT_ROUNDS)
        await User.updateOne({ _id: user._id }, { password: upgraded })
        console.log(`🔐 Upgraded plaintext password to bcrypt hash for user: ${user.username}`)
      }
    }

    if (!passwordMatch)
      return res.status(401).json({ error: "Invalid credentials." })

    // Never return the password field — send only what the frontend needs
    return res.json({
      message:  "Login successful!",
      userId:   user._id,
      username: user.username,
      rollno:   user.rollno,
      session:  user.session
    })
  } catch (err) {
    console.error("Login Error:", err)
    return res.status(500).json({ error: "Server error." })
  }
})

// ── POST /api/register-event ──
app.post("/api/register-event", async (req, res) => {
  const { userId, username, rollno, email, phone, clubName, eventName } = req.body
  if (!userId || !username || !rollno || !email || !eventName)
    return res.status(400).json({ error: "All fields required." })
  try {
    const existing = await EventReg.findOne({ userId, eventName })
    if (existing)
      return res.status(409).json({ error: "Already registered for this event!" })
    const reg = await EventReg.create({ userId, username, rollno, email, phone, clubName, eventName })
    return res.status(201).json({ message: "Registered successfully!", reg })
  } catch (err) {
    return res.status(500).json({ error: "Server error." })
  }
})

// ── GET /api/my-events/:userId ──
app.get("/api/my-events/:userId", async (req, res) => {
  try {
    const events = await EventReg.find({ userId: req.params.userId }).sort({ registeredAt: -1 })
    return res.json(events)
  } catch (err) {
    return res.status(500).json({ error: "Server error." })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))