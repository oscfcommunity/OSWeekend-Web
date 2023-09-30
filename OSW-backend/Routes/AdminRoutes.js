const {
  AdminLogin,
  AddAdmin,
  getAllAdmins,
  deleteAdmin,
} = require("../Controller/AdminAuthController");
const { AddTeamMember } = require("../Controller/TeamController");
const {
  AdminForgotPassword,
  OtpLogin,
  adminResetPassword,
} = require("../Controller/forgetpassController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const AdminRoutes = (app) => {
  app.post("/admin/add-newadmin",AuthMiddleware, AddAdmin);
  app.post("/admin/login", AdminLogin);
  app.post("/admin/forgotpassword", AdminForgotPassword);
  app.post("/admin/templogin", OtpLogin);
  app.post("/admin/resetPassword", AuthMiddleware, adminResetPassword);
  app.get("/admins", AuthMiddleware, getAllAdmins);
  app.delete("/delete/admin/:id", AuthMiddleware, deleteAdmin);
};

module.exports = AdminRoutes;
