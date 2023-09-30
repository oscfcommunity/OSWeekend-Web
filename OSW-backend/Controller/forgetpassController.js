require("dotenv").config({ path: "../.env" });
const User = require("../Models/Users");
const { sendLink } = require("../Services/forgetPassService");
const crypto = require("crypto");
const moment = require("moment");
const bcrypt = require("bcrypt");
const Admin = require("../Models/Admin");
const { sendOTP, verifyOTP } = require("../Services/otpService");
const genToken = require("../Services/jwtTokenService");

exports.UserSendLink = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email doesnt match.",
      });
    }
    // Generate a one-time reset token with expiration time (e.g., 2 hours)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expirationTime = moment().add(2, "hours").unix(); // Expiration time in Unix timestamp format
    user.resetTokenUsed = false;
    user.resetToken = resetToken;
    user.resetTokenExpiration = expirationTime;
    await user.save();

    try {
      await sendLink(email, user._id, resetToken, expirationTime);
      res.status(200).send({ success: true, message: "Link sent" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error sending Link to change password !!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Verfying the email.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const id = req.params._id;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User Not Found.",
    });
  }

  // Check if the reset token and its expiration time are valid
  const resetToken = req.params.resetToken;
  const expirationTime = req.params.expirationTime;
  if (!resetToken || !expirationTime || expirationTime < moment().unix()) {
    return res.status(400).send({
      success: false,
      message: "Reset token is invalid or has expired.",
    });
  }

  // Check if the token has already been used
  if (user.resetTokenUsed) {
    return res.status(400).send({
      success: false,
      message: "Reset token has already been used.",
    });
  }

  try {
    const { password, confirm_password } = req.body;
    // Check if password and confirm_password match
    if (password !== confirm_password) {
      return res.status(400).send({
        success: false,
        message: "Password and Confirm Password do not match.",
      });
    }
    // Hash the new password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and mark the reset token as used
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    user.resetTokenUsed = true;
    await user.save();

    res
      .status(200)
      .send({ success: true, message: "Password successfully reset." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error resetting the password.",
    });
  }
};

exports.AdminForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(400).send({
        success: false,
        message: "Email doesnt match.",
      });
    }

    try {
      await sendOTP(email);
      res.status(200).send({ success: true, message: "OTP sent" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Error sending OTP !!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in temporary login of Admin.",
    });
  }
};

exports.OtpLogin = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await Admin.findOne({ email: email });
    const is_verified = verifyOTP(email, otp);
    if (is_verified) {
      const payload = {
        _id: admin._id,
        email: admin.email,
        superadmin: admin.superadmin,
        type: "admin",
      };

      const authToken = genToken(payload);

      return res.status(200).send({
        success: true,
        message: "You are temporaryly loggedin",
        result: authToken,
        _id: admin._id,
        email: admin.email,
        type: "admin",
      });
    } else res.status(400).send({ success: false, message: "Wrong OTP" });
  } catch (error) {
    console.warn(error);
    res.status(400).send({
      success: false,
      message: "Error Verfiying the email.",
    });
  }
};

exports.adminResetPassword = async (req, res) => {
  const AdminId = req.user._id;
  const admin = await Admin.findOne({ _id: AdminId });
  if (!admin) {
    return res.status(400).send({
      success: false,
      message: "Admin account not found.",
    });
  }
  try {
    const { password, confirm_password } = req.body;
    // Check if password and confirm_password match
    if (password !== confirm_password) {
      return res.status(400).send({
        success: false,
        message: "Password and Confirm Password do not match.",
      });
    }
    // Hash the new password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the admin's password and mark the reset token as used
    admin.password = hashedPassword;
    await admin.save();

    res
      .status(200)
      .send({ success: true, message: "Password successfully reset." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error resetting the password.",
    });
  }
};
