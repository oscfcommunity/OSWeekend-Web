  const mongoose = require('mongoose');

  const chatMessageSchema = new mongoose.Schema({
    user: String,
    message: String,
    messageType: String,
    fileName: String,
    fileType: String,
    // Fields for handling replies
    isReply: Boolean,         // Indicates whether it's a reply or a regular message
    repliedToUser: String,    // Username of the user being replied to
    repliedToMessage: String,
    seenByUsers: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  });
  // Create a TTL index on the createdAt field with an expiration of 1 minute (60 seconds)
  // chatMessageSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 60000 })

  const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

  module.exports = ChatMessage;
