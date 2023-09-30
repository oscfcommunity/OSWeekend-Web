const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  link: {
    type:String,
  },
  recipients: [
    {
      recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
