require("dotenv").config({ path: "../.env" });
const User = require("../Models/Users");
const { sendOTP, verifyOTP } = require("../Services/otpService");

exports.UserSendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email doesnt match.",
      });
    }
    if (!user.verified) {
      try {
        await sendOTP(email);
        res.status(200).send({ success: true, message: "OTP sent" });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Error sending OTP !!!" });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "Your email is already verified.",
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

exports.UserVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email });
    const is_verified = verifyOTP(email, otp);
    console.log(user.verified);
    if (is_verified) {
      user.verified = true;
      await user.save();
      console.log(user.verified);
      res.status(200).send({
        success: true,
        type: "user",
        message: "Your email is verifyed",
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
