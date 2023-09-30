const jwt = require("jsonwebtoken");
const jwt_sec = process.env.JWT_SEC;
const User = require("../Models/Users");
const Admin = require("../Models/Admin");

module.exports = async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Token not found !!!" });
  }

  try {
    const { type, email, _id } = jwt.verify(
      token,
      jwt_sec
    );
    console.log("_id: " + _id + " type: " + type);

    switch (type) {
      case "user":
        try {
          const user = await User.find({ _id }, { _id: 1 });
          console.warn("user ", user);
          if (user) {
            req.user = user[0];
            req.userType = "user";
            break;
          }
          throw new Error("Unauthorized");
        } catch (error) {
          return res
            .status(401)
            .json({ success: false, message: "Not Authorized." });
        }
      case "admin":
        try {
          const admin = await Admin.find({ _id }, { _id: 1 });
          console.warn("admin ", admin);
          if (admin) {
            req.user = admin[0];
            req.userType = "admin";
            break;
          }
          throw new Error("Unauthorized");
        } catch (error) {
          return res
            .status(401)
            .json({ success: false, message: "Not Authorized." });
        }s
      default:
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized." });
    }

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token. Not Authorized." });
    }
    return res
      .status(500)
      .json({ success: false, message: "Server internal error" });
  }
};
