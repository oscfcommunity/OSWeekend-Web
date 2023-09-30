const {
  AddUserProfile,
  getUserProfile,
  uploadProfilePic,
  getProfilePic,
  getAllUsers,
  deleteUser,
} = require("../Controller/ProfileController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");
const fileUploaderMiddleware = require("../Middlewares/fileUploaderMiddleware");
const picUploaderMiddleware = fileUploaderMiddleware("pic");

const ProfileRoutes = (app) => {
  app.post("/user/addprofile", AuthMiddleware, AddUserProfile);
  app.get("/user/profile/:id", getUserProfile);
  // app.post(
  //   "/user/upload-pic",
  //   AuthMiddleware,
  //   picUploaderMiddleware,
  //   uploadProfilePic
  // );
  app.get("/user/profile-pic/:id", getProfilePic);
  app.get("/users", AuthMiddleware, getAllUsers);
  app.delete("/delete/user/:id", AuthMiddleware, deleteUser);
};

module.exports = ProfileRoutes;
