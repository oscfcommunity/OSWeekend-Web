const speakeasy = require("speakeasy");
const sendMail = require("./mailService");

exports.sendLink = async (email, _id, resetToken, expirationTime) => {
  // send mail using sendMail service
  const link = `http://localhost:3000/user/reset-password?_id=${_id}&resetToken=${resetToken}&expirationTime=${expirationTime}`;
  try {
    const mailRes = await sendMail(
      (to = email),
      (subject = "Change Your Password"),
      (text = `This link will be available for 2 hours.\nClick the link below to reset your password:\n${link}`)
    );

    console.log("Email response:", mailRes);
    return mailRes;
  } catch (error) {
    // console.error('Error sending email:', error);
    throw error;
  }
};
