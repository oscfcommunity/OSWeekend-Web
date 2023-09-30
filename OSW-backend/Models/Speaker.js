const mongoose = require("mongoose");

const SpeakerSchema = mongoose.Schema({
  name: {
    type: String,
  },
  post: {
    type: String,
  },
  university: {
    type: String,
  },
  location: {
    city: String,
    state: String,
    pincode: String,
  },
  about: {
    type: String,
  },
  social_links: [{ type: String }],
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  pic: {
    type: String,
  },
});

const Speaker = mongoose.model("Speaker", SpeakerSchema);
module.exports = Speaker;
