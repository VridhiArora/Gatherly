const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
require("dotenv").config()

const {
  handleValidationErrors,
  signupRules,
  loginRules,
  registerEventRules,
  contactRules
} = require("./middleware/validation")

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
  userId:       { type: String, required: true },
  username:     { type: String, required: true },
  rollno:       { type: String, required: true },
  email:        { type: String, required: true },
  phone:        { type: String },
  clubName:     { type: String },
  eventName:    { type: String, required: true },
  registeredAt: { type: Date, default: Date.now }
})
const EventReg = mongoose.model("EventReg", eventRegSchema)

// ── Contact Message Schema ──
const contactMessageSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  roll:      { type: String },
  email:     { type: String, required: true },
  subject:   { type: String, default: "Event Registration Query" },
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})
const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema)

// ── Auth Middleware ──
// Reads the token from the Authorization header, verifies it using JWT_SECRET,
// and attaches the decoded user object to req.user for downstream route handlers.
// Any route using this middleware is automatically protected.
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"]

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ error: "Access denied. Please log in." })

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded  // { userId, username, rollno, session, iat, exp }
    next()
  } catch (err) {
    return res.status(401).json({ error: "Session expired. Please log in again." })
  }
}

// ── POST /api/signup ──
app.post("/api/signup", signupRules, handleValidationErrors, async (req, res) => {
  const { username, rollno, password, session } = req.body

  try {
    const existing = await User.findOne({ $or: [{ username }, { rollno }] })
    if (existing)
      return res.status(409).json({ error: "Username or Roll No already exists." })

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await User.create({ username, rollno, password: hashedPassword, session })

    return res.status(201).json({ message: "Account created!", userId: user._id })
  } catch (err) {
    console.error("Signup Error:", err)
    return res.status(500).json({ error: "Server error." })
  }
})

// ── POST /api/login ──
app.post("/api/login", loginRules, handleValidationErrors, async (req, res) => {
  const { username, rollno, password } = req.body

  try {
    const user = await User.findOne({ username, rollno })
    if (!user)
      return res.status(401).json({ error: "Invalid credentials." })

    // ── Password check with lazy migration for old plaintext accounts ──
    let passwordMatch = false
    const isAlreadyHashed = user.password.startsWith("$2b$") || user.password.startsWith("$2a$")

    if (isAlreadyHashed) {
      passwordMatch = await bcrypt.compare(password, user.password)
    } else {
      passwordMatch = (password === user.password)
      if (passwordMatch) {
        const upgraded = await bcrypt.hash(password, SALT_ROUNDS)
        await User.updateOne({ _id: user._id }, { password: upgraded })
        console.log(`🔐 Upgraded plaintext password for: ${user.username}`)
      }
    }

    if (!passwordMatch)
      return res.status(401).json({ error: "Invalid credentials." })

    // ── Generate JWT ──
    // The payload carries just enough info for the frontend.
    // The server will verify this signature on every protected request.
    const token = jwt.sign(
      { userId: user._id, username: user.username, rollno: user.rollno, session: user.session },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    // Return only the token — no raw user fields exposed
    return res.json({ message: "Login successful!", token })
  } catch (err) {
    console.error("Login Error:", err)
    return res.status(500).json({ error: "Server error." })
  }
})

// ── POST /api/register-event (PROTECTED) ──
// verifyToken runs first. userId/username/rollno come from the verified token —
// the client can no longer spoof who is registering.
app.post("/api/register-event", verifyToken, registerEventRules, handleValidationErrors, async (req, res) => {
  const { email, phone, clubName, eventName } = req.body
  const { userId, username, rollno } = req.user  // trusted — from token

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

// ── GET /api/my-events (PROTECTED) ──
// No longer takes userId as a URL param — gets it from the verified token.
// This prevents any user from fetching another user's events by guessing an ID.
app.get("/api/my-events", verifyToken, async (req, res) => {
  try {
    const events = await EventReg
      .find({ userId: req.user.userId })
      .sort({ registeredAt: -1 })
    return res.json(events)
  } catch (err) {
    return res.status(500).json({ error: "Server error." })
  }
})

// ── POST /api/contact ──
// Public endpoint for submitting the contact form. Validates input properties,
// checks email structure, persists the record, and triggers local development logging.
app.post("/api/contact", contactRules, handleValidationErrors, async (req, res) => {
  const { name, roll, email, subject, message } = req.body

  try {
    const newMessage = await ContactMessage.create({
      name,
      roll,
      email,
      subject: subject || "Event Registration Query",
      message
    })

    // Simulated email dispatcher logging (for local development testing)
    console.log(`\n==================================================`)
    console.log(`✉️  [SIMULATED EMAIL DISPATCH]`)
    console.log(`To: gatherly@chitkara.edu.in`)
    console.log(`From: ${email} (${name})`)
    console.log(`Subject: ${subject || "New Contact Message"}`)
    console.log(`Message Body:\n--------------------------------------------------\n${message}\n--------------------------------------------------`)
    console.log(`==================================================\n`)

    return res.status(201).json({ message: "Message sent successfully!", data: newMessage })
  } catch (err) {
    console.error("Contact API Error:", err)
    return res.status(500).json({ error: "Internal server error. Message could not be sent." })
  }
})

// ── GET /health ──
app.get("/health", (req, res) => {
  res.json({ status: "ok", db: mongoose.connection.readyState === 1 ? "connected" : "disconnected" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))