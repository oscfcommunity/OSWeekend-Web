const {
  CreateEvent,
  GetEvents,
  GetPersonalEvents,
  GetEventById,
  UpdateEvent,
  DeleteEvent,
  AttendEvent,
} = require("../Controller/EventController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");
const fileUploaderMiddleware = require("../Middlewares/fileUploaderMiddleware");
const eventmediaUploaderMiddleware = fileUploaderMiddleware("event");

const BLogRoutes = (app) => {
  // media routes : auth required
  app.get("/events", GetEvents);
  app.get("/personal-events", AuthMiddleware, GetPersonalEvents);
  app.get("/event/:id", GetEventById);
  app.post(
    "/event/create-event",
    AuthMiddleware,
    // eventmediaUploaderMiddleware,
    CreateEvent
  );
  app.put("/event/update-event/:id", AuthMiddleware, UpdateEvent);
  app.delete("/event/delete-event/:id", AuthMiddleware, DeleteEvent);
  app.post("/event/attend-event/:eventid", AuthMiddleware, AttendEvent);
};

module.exports = BLogRoutes;
