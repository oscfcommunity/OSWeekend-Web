const {
  AddProject,
  GetProjects,
  GetProjectDetails,
  UpdateProject,
  DeleteProject,
} = require("../Controller/ResourceLibraryController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const ResourceLibraryRoutes = (app) => {
  app.post("/resource-library/add-project", AuthMiddleware, AddProject);
  app.get("/resource-library/allprojects", GetProjects);
  app.get("/resource-library/project/:id", GetProjectDetails);
  app.put(
    "/resource-library/update-project/:id",
    AuthMiddleware,
    UpdateProject
  );
  app.delete(
    "/resource-library/delete-project/:id",
    AuthMiddleware,
    DeleteProject
  );
};
module.exports = ResourceLibraryRoutes;
