const {
  AddSpeakers,
  getallSpeakers,
  getspeakerDetails,
  deleteSpeaker,
  UpdateSpeaker,
} = require("../Controller/SpeakerController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");
const fileUploaderMiddleware = require("../Middlewares/fileUploaderMiddleware");
const picUploaderMiddleware = fileUploaderMiddleware("speaker");
const SpeakerRoutes = (app) => {
  app.post(
    "/admin/add-speaker",
    AuthMiddleware,
    // picUploaderMiddleware,
    AddSpeakers
  );
  app.get("/speaker/all-details/:id", getspeakerDetails);
  app.get("/all-speaker", getallSpeakers);
  app.put("/speaker/update-speaker/:id", AuthMiddleware, UpdateSpeaker);
  app.delete("/delete/speaker/:id", AuthMiddleware, deleteSpeaker);
};

module.exports = SpeakerRoutes;
