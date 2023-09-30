require("dotenv").config({ path: "../.env" });
const User = require("../Models/Users");
const genToken = require("../Services/jwtTokenService");
const bcrypt = require("bcrypt");

exports.UserSignup = async (req, res) => {
  try {
    const { user_name, email, password, confirm_password } = req.body;
    // Check if user with the same user_name or email already exists
    const exist = await User.findOne({
      $or: [{ user_name: user_name }, { email: email }],
    });
    if (exist) {
      return res.status(400).send({
        success: false,
        message: "User with this user_name or email already exists.",
      });
    }
    // Check if password and confirm_password match
    if (password !== confirm_password) {
      return res.status(400).send({
        success: false,
        message: "Password and Confirm Password do not match.",
      });
    }
    // Encrypt the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Save the user data to the User schema
    const newUser = new User({
      user_name: user_name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    const payload = {
      _id: newUser._id,
      user_name: newUser.user_name,
      email: newUser.email,
      password: newUser.password,
      name: user.profile.first_name + " " + user.profile.last_name,
      type: "user", 
    };

    const authToken = genToken(payload);

    res.status(200).send({
      success: true,
      result: authToken,
      _id: newUser._id,
      user_name: newUser.user_name,
      email: newUser.email,
      type: "user",
    });
  } catch (error) {
    console.error("Error in UserSignup:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while registering the user.",
    });
  }
};

exports.UserGoogleSignup = async (req, res) => {
  try {
    const { user_name, email, first_name, last_name } = req.body;
    // Check if user with the same user_name or email already exists
    const exist = await User.findOne({
      $or: [{ user_name: user_name }, { email: email }],
    });
    if (exist) {
      return res.status(400).send({
        success: false,
        message: "User with this user_name or email already exists.",
      });
    }
    // Save the user data to the User schema
    const newUser = new User({
      user_name: user_name,
      email: email,
      "profile.first_name": first_name,
      "profile.last_name": last_name,
    });

    await newUser.save();

    const payload = {
      _id: newUser._id,
      user_name: newUser.user_name,
      email: newUser.email,
      type: "user",
    };

    const authToken = genToken(payload);

    res.status(200).send({
      success: true,
      result: authToken,
      _id: newUser._id,
      user_name: newUser.user_name,
      email: newUser.email,
      first_name: newUser.profile.first_name,
      last_name: newUser.profile.last_name,
      type: "user",
    });
  } catch (error) {
    console.error("Error in UserSignup:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while registering the user.",
    });
  }
};

exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      console.warn("inside");
      return res.status(400).send({
        success: false,
        message: "Email address is not registered",
      });
    }
    // Compare the password from the request with the encrypted password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log(user);
    if (isPasswordMatch) {
      // Passwords match, generate token and send the response
      const payload = {
        _id: user._id,
        user_name: user.user_name,
        email: user.email,
        name: user.profile.first_name + " " + user.profile.last_name,
        type: "user",
      };

      const authToken = genToken(payload);

      return res.status(200).send({
        success: true,
        result: authToken,
        _id: user._id,
        user_name: user.user_name,
        email: user.email,
        type: "user",
      });
    } else {
      // Passwords do not match
      return res.status(401).send({
        success: false,
        message: "Not able to Login - Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error in UserLogin:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while loging in the user.",
    });
  }
};

exports.UserGoogleLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      console.warn("inside");
      return res.status(400).send({
        success: false,
        message: "Email address is not registered",
      });
    }
    // Compare the password from the request with the encrypted password stored in the database
    // const isPasswordMatch = await bcrypt.compare(password, user.password);

    // if (isPasswordMatch) {
    // Passwords match, generate token and send the response
    const payload = {
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
      type: "user",
    };

    const authToken = genToken(payload);

    return res.status(200).send({
      success: true,
      result: authToken,
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
      type: "user",
    });
    // } else {
    // Passwords do not match
    // return res.status(401).send({
    //   success: false,
    //   message: "Not able to Login - Invalid credentials",
    // });
    // }
  } catch (error) {
    console.error("Error in UserLogin:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while loging in the user.",
    });
  }
};
