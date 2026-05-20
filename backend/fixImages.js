require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gatherly")
  .then(async () => {
    const eventSchema = new mongoose.Schema({
      eventName: String,
      img: String
    }, { strict: false });
    
    const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

    await Event.updateOne({ eventName: "Innovation Fest" }, { img: "/is1.png" });
    await Event.updateOne({ eventName: "Musical Eve" }, { img: "/v1.png" });
    await Event.updateOne({ eventName: "Hackathon 2026" }, { img: "/acm.png" });
    await Event.updateOne({ eventName: "StandUp 2026" }, { img: "/harsh.png" });
    await Event.updateOne({ eventName: "IEEE Tech Conference" }, { img: "/ieeevent.png" });
    await Event.updateOne({ eventName: "Qwali Night" }, { img: "/qwali.jpeg" });
    await Event.updateOne({ eventName: "Love Fest" }, { img: "/love.png" });
    await Event.updateOne({ eventName: "GFG Tech Conference" }, { img: "/g5.png" });
    
    console.log("Images fixed in database!");
    process.exit(0);
  });
