// const { UserSignup, UserLogin } = require("../Controller/AuthController");

const {
  UserSendOtp,
  UserVerification,
} = require("../Controller/VerficationController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const VerifyRoutes = (app) => {
  app.post("/user/email-verification/sendotp", AuthMiddleware, UserSendOtp);
  app.post("/user/email-verification/verify", AuthMiddleware, UserVerification);
};

module.exports = VerifyRoutes;
