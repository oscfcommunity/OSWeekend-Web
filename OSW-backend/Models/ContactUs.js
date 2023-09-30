const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  name: {
    type: String,
  },
  subject: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
