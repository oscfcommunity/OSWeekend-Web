const {
  markAllAsRead,
  updateReadStatus,
  GetUserNotification,
  deleteNotification,
  deleteAllNotifications,
} = require("../Controller/NotificationController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const NotificationRoutes = (app) => {
  app.get("/notifications", AuthMiddleware, GetUserNotification);
  app.post("/notifications/updatestatus", AuthMiddleware, updateReadStatus);
  app.post("/notifications/updatestatus-all", AuthMiddleware, markAllAsRead);
  app.delete("/notifications/delete", AuthMiddleware, deleteNotification);
  app.delete(
    "/notifications/delete-all",
    AuthMiddleware,
    deleteAllNotifications
  );
};

module.exports = NotificationRoutes;
