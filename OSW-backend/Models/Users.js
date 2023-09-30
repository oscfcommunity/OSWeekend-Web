const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contact_no: {
    type:Number,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  profile: {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    profile_pic: {
      type: String,
    },
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Number,
  },
  resetTokenUsed: {
    type: Boolean,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
