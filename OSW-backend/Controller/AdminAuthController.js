require("dotenv").config({ path: "../.env" });
const Admin = require("../Models/Admin");
const Blog = require("../Models/Blog");
const Event = require("../Models/Event");
const genToken = require("../Services/jwtTokenService");
const bcrypt = require("bcrypt");

exports.AddAdmin = async (req, res) => {
  try {
    const adminId = req.user._id;
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin.superadmin) {
      return res
        .status(401)
        .send({ success: false, message: "Not Authorized." });
    }
    const { email, password, superadmin } = req.body;
    console.log(superadmin);
    // Check if admin with the same email already exists
    const exist = await Admin.findOne({ email: email });
    if (exist) {
      return res.status(400).send({
        success: false,
        message: "Admin with this email already exists.",
      });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    // Save the admin data to the Admin schema
    const newAdmin = new Admin({
      email: email,
      password: password,
      superadmin: superadmin,
    });

    await newAdmin.save();

    res.status(200).send({
      success: true,
      message: "Adim added Successfully",
      _id: newAdmin._id,
      email: newAdmin.email,
      type: "admin",
    });
  } catch (error) {
    console.error("Error in AdminSignup:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while registering the admin.",
    });
  }
};

exports.AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(400).send({
        success: false,
        message: "Email address is not registered",
      });
    }
    // Compare the password from the request with the encrypted password stored in the database
    let isPasswordMatch;
    isPasswordMatch = password === admin.password ? true : false;

    if (isPasswordMatch) {
      // Passwords match, generate token and send the response
      const payload = {
        _id: admin._id,
        email: admin.email,
        superadmin: admin.superadmin,
        type: "admin",
      };

      const authToken = genToken(payload);

      return res.status(200).send({
        success: true,
        result: authToken,
        _id: admin._id,
        email: admin.email,
        type: "admin",
      });
    } else {
      // Passwords do not match
      return res.status(401).send({
        success: false,
        message: "Not able to Login - Invalid credentials",
      });
    }
  } catch (error) {}
};

exports.getAllAdmins = async (req, res) => {
  try {
    const userType = req.userType;
    const admin = Admin.findOne({ _id: req._id });
    if (userType !== "admin" && !admin.superadmin) {
      return res
        .status(403)
        .send({ success: false, message: "Not Authorized." });
    }
    const admins = await Admin.find({});
    return res.status(200).json({ success: true, admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const userType = req.userType;
    const admin = Admin.findOne({ _id: req._id });
    if (userType !== "admin" && !admin.superadmin) {
      return res
        .status(403)
        .send({ success: false, message: "Not Authorized." });
    }
    const _id = req.params.id;
    await Event.deleteMany({ hosted_by_admin: _id });
    await Blog.deleteMany({ admin_author: _id });
    const admins = await Admin.findOne({ _id });
    if (!admins) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found." });
    }
    const result = await Admin.findByIdAndDelete(_id);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete Admin." });
    }
    return res.status(200).send({ success: true, message: "Admin Deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
