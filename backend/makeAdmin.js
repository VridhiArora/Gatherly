require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gatherly")
  .then(async () => {
    // We get the rollno from the command line arguments
    const rollno = process.argv[2];
    if (!rollno) {
      console.log("❌ Please provide a roll number.");
      console.log("Usage: node makeAdmin.js <roll-number>");
      process.exit(1);
    }

    // Since User model might be defined in server.js directly, let's just define a minimal model here to update
    const userSchema = new mongoose.Schema({
      rollno: String,
      isAdmin: Boolean
    }, { strict: false });
    
    const User = mongoose.models.User || mongoose.model("User", userSchema);

    const user = await User.findOneAndUpdate(
      { rollno: rollno }, 
      { isAdmin: true }, 
      { new: true }
    );

    if (user) {
      console.log(`✅ Success! The account [${rollno}] is now an Admin.`);
      console.log(`👉 Please log out and log back in on the frontend to get your new Admin token.`);
    } else {
      console.log(`❌ Could not find a user with the roll number: ${rollno}`);
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
