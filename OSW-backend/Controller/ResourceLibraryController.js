const Admin = require("../Models/Admin");
const Resource = require("../Models/ResouceLibrary");
const {
  NotifyUsersProjects,
  NotifyUsersEvent,
} = require("./NotificationController");

exports.AddProject = async (req, res) => {
  const Id = req.user._id;
  const admin = await Admin.findOne({ _id: Id });

  if (req.userType !== "admin") {
    return res.status(401).send({ success: false, message: "Not Authorized." });
  }
  if (!admin) {
    return res.status(400).send({
      success: false,
      message: "Admin account not found.",
    });
  }
  try {
    // const { project_name, project_details, project_links, project_tags } =
    //   req.body;
    const projectTags = req.body.project_tags; // Array of project tags
    const projectName = req.body.project_name; // Array of project tags
    const projectDetails = req.body.project_details; // Array of project tags
    const projectLinks = req.body.project_links; // Array of project links

    console.log(projectName, projectDetails, projectTags, projectLinks);
    const newProject = new Resource({
      project_name: projectName,
      project_details: projectDetails,
      project_links: projectLinks,
      project_tags: projectTags,
    });
    const createdProject = await newProject.save();
    if (createdProject) {
      const title = "New Open Source Project Available";
      const content = `A new Open Source Project is available.\nProject Name is : ${newProject.project_name}.`;
      NotifyUsersProjects(newProject, content, title, (type = "create"));
      return res.status(200).json({
        success: true,
        Project: createdProject,
      });
    }
    return res.status(200).json(createdProject);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
  }
};

exports.GetProjects = async (req, res) => {
  try {
    const projects = await Resource.find(
      {},
      {
        _id: 1,
        project_name: 1,
        project_details: 1,
        project_links: 1,
        project_tags: 1,
      }
    );
    return res.status(200).send({ success: true, projects });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
  }
};

exports.GetProjectDetails = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Resource.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }
    const responseData = {
      project_name: project.project_name,
      project_details: project.project_details,
      project_links: project.project_links,
      project_tags: project.project_tags,
    };
    res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
  }
};

exports.UpdateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { project_name, project_details, project_links, project_tags } =
      req.body;
    let project;
    if (req.userType === "admin") {
      project = await Resource.findById(projectId);
    } else {
      return res
        .status(401)
        .send({ success: false, message: "Not Authorized." });
    }
    let content = `The Project "${project.project_name}" has been updated. Changes include:\n`;
    if (project_name !== project.project_name) {
      content += `- Project Name: ${project.project_name} -> ${project_name}\n`;
      project.project_name = project_name;
    }
    if (project_details !== project.project_details) {
      content += `- Project Details: ${project.project_details} -> ${project_details}\n`;
      project.project_details = project_details;
    }
    if (project_tags !== project.project_tags) {
      content += `- Project Tags: ${project.project_tags} -> ${project_tags}\n`;
      project.project_tags = project_tags;
    }
    if (project_links !== project.project_links) {
      project.project_links = project_links;
    }
    project.updatedAt = Date.now();
    const updatedProject = await project.save();
    console.log(updatedProject);
    if (updatedProject) {
      const title = "A project is updated";
      content += "\nCheck it out now!";
      NotifyUsersProjects(updatedProject, content, title, (type = "update"));
    }
    return res.status(200).json({ success: true, updatedProject });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
  }
};

exports.DeleteProject = async (req, res) => {
  if (req.userType !== "admin") {
    console.log(1);
    return res.status(401).send({ success: false, message: "Not Authorized." });
  }
  try {
    const projectId = req.params.id;
    const Project = await Resource.findById(projectId);
    if (!Project) {
      console.log(1);
      return res
        .status(400)
        .json({ success: false, message: "Project not found" });
    }
    const deletedProject = await Resource.findByIdAndDelete(projectId);
    if (deletedProject) {
      const title = "A Project is deleted";
      let content = `The Project ${deletedProject.project_name} has been deleted by the admin.`;
      NotifyUsersEvent(deletedProject, content, title, (type = "delete"));
    }
    return res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
  }
};
