// models/AdminUser.js
const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  username: String,
  password: String, // You should hash passwords for security
  isAdmin: Boolean, // Add this field
});

module.exports = mongoose.model('AdminUser', adminUserSchema);
