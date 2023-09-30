const { UserSignup, UserLogin, UserGoogleSignup, UserGoogleLogin } = require("../Controller/AuthController");
const {
  UserSendLink,
  resetPassword,
} = require("../Controller/forgetpassController");
// const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const AuthRoutes = (app) => {
  app.post("/user/signup", UserSignup);
  app.post("/user/google-signup", UserGoogleSignup);
  app.post("/user/login", UserLogin);
  app.post("/user/googlelogin", UserGoogleLogin);
  app.post("/user/forgotPassword", UserSendLink);
  app.post(
    "/user/reset-password/:_id/:resetToken/:expirationTime",
    resetPassword
  );
};

module.exports = AuthRoutes;
