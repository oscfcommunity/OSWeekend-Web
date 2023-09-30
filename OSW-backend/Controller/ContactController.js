const Contact = require("../Models/ContactUs");

exports.ContactUs = async (req, res) => {
  try {
    const { name, subject, email, message } = req.body;
    if (!name || !subject || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All details are required!!!",
      });
    }
    const newMessage = new Contact({
      name,
      subject,
      email,
      message,
    });
    await newMessage.save();
    return res.status(200).send({
      success: true,
      message: newMessage,
      message: "Your message was given Successfully",
    });
  } catch (error) {
    console.error("Error in sending message:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while contacting us.",
    });
  }
};
