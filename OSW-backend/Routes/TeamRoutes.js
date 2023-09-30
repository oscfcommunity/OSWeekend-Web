const {
  AddTeamMember,
  getallTeamMembers,
  getmemberDetails,
  deleteTeam,
  UpdateTeam,
} = require("../Controller/TeamController");

const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const AdminRoutes = (app) => {
  app.post(
    "/admin/add-teammember",
    AuthMiddleware,
    // picUploaderMiddleware,
    AddTeamMember
  );
  app.put("/team/update-team/:id", AuthMiddleware, UpdateTeam);
  app.get("/team-member/all-details/:id", getmemberDetails);
  app.get("/all-team-members", getallTeamMembers);
  app.delete("/delete/team-member/:id", AuthMiddleware, deleteTeam);
};

module.exports = AdminRoutes;
