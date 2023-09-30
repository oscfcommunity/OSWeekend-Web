import React, { useEffect, useState } from "react";
import "./ResourceLibrary.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { hostname } from "../../hostname";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function EditResourceLibrary({ project, isOpen }) {
  const [projectNameError, setProjectNameError] = useState("");
  const [projectDescError, setProjectDescError] = useState("");
  const [projectLinksError, setProjectLinksError] = useState("");
  const [projecttagsError, setProjecttagsError] = useState("");
  const [projectName, setProjectName] = useState(project.project_name || "");
  const [projectDetails, setProjectDetails] = useState(
    project.project_details || ""
  );
  const navigate = useNavigate();

  const [projectLinks, setProjectLinks] = useState(project.project_links || "");
  const [projectTags, setProjectTags] = useState(project.project_tags || "");
  const closeModal = () => {
    // Reload the page
    window.location.reload();
    navigate("/resourceLibrary"); // Navigate to the desired page (optional)
  };

  useEffect(() => {
    if (isOpen) {
      // Open the modal when isOpen is true
      const modalElement = document.getElementById("exampleModal");
      const modal = new Modal(modalElement);
      modal.show();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const githubLinkPattern = /github\.com/i;
    const dockerLinkPattern = /docker\.com/i;

    const areLinksValid =
      githubLinkPattern.test(projectLinks) ||
      dockerLinkPattern.test(projectLinks);

    if (
      !areLinksValid ||
      !projectName ||
      !projectDetails ||
      !projectLinks ||
      !projectTags
    ) {
      // closeModal();
      toast("Enter values Properly!", {
        position: "top-right",
        backgroundColor: "green",
      });
      return;
    }
    console.log(projectTags);
    console.log(localStorage.getItem("adminAuthToken"));
    fetch(`${hostname}/resource-library/update-project/${project._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("adminAuthToken"),
      },
      body: JSON.stringify({
        project_name: projectName,
        project_details: projectDetails,
        project_links: projectLinks,
        project_tags: projectTags,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Project added successfully:", data.updatedProject);
          // setProjectName("");
          // setProjectDetails("");
          // setProjectLinks("");
          // setProjectTags("");
          toast("Successfully Submitted!", {
            position: "top-right",
            backgroundColor: "green",
          });
          
          closeModal();
        } else {
          console.error("Error adding Project:", data.message);
          toast("Error Occurred!", {
            position: "top-right",
            backgroundColor: "red",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast("Error Occurred!", {
          position: "top-right",
          backgroundColor: "red",
        });
      });
  };

  // Close the modal (if you want)
  // Add code to close the modal here if needed

  const handleTextInputChange = (identifier, event) => {
    // Ensure that the event object is properly passed
    if (event && event.target) {
      console.log(event.target.value);
      // Clear previous error messages when input changes
      setProjectNameError("");
      setProjectDescError("");
      setProjectLinksError("");
      setProjecttagsError("");

      // Update the corresponding field based on the identifier
      if (identifier === "project_name") {
        setProjectName(event.target.value);
      } else if (identifier === "project_details") {
        setProjectDetails(event.target.value);
      } else if (identifier === "project_links") {
        setProjectLinks(event.target.value);
      } else if (identifier === "project_tags") {
        setProjectTags(event.target.value);
      }
    }
  };

  return (
    <>
      <div
        className={`modal fade ${isOpen ? "show" : ""}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!isOpen}
      >
        <div
          className="modal-dialog modal-lg"
          style={{
            marginLeft: "30vw",
            maxWidth: "150%",
            marginRight: "-90vw",
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="project-name" className="col-form-label">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                    id="project-name"
                    name="project_name"
                    defaultValue={projectName}
                    onChange={(e) => handleTextInputChange("project_name", e)}
                    required
                  />
                  {projectNameError && (
                    <div className="error-message">{projectNameError}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="project_details-text"
                    className="col-form-label"
                  >
                    Project Description
                  </label>
                  <textarea
                    className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                    id="project_details-text"
                    name="project_details"
                    defaultValue={projectDetails}
                    onChange={(e) =>
                      handleTextInputChange("project_details", e)
                    }
                    required
                  ></textarea>
                  {projectDescError && (
                    <div className="error-message">{projectDescError}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="project-taas" className="col-form-label">
                    Project Tags
                  </label>
                  <div className="minus">
                    <div className="project-tagsInput">
                      <input
                        type="text"
                        id={`project-tags`}
                        name={`project_tags`}
                        defaultValue={projectTags} // Use the correct tag value
                        className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                        onChange={(e) =>
                          handleTextInputChange("project_tags", e)
                        }
                        required
                      />
                    </div>
                    {projecttagsError && (
                      <div className="error-message">{projecttagsError}</div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="projectlinks" className="col-form-label">
                    Project Link
                  </label>
                  <div className="projectlinksInput">
                    <input
                      type="text"
                      id="project_links"
                      name="project_links"
                      defaultValue={projectLinks}
                      className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                      onChange={(e) =>
                        handleTextInputChange("project_links", e)
                      }
                      required
                    />
                    {projectLinksError && (
                      <div className="error-message">{projectLinksError}</div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-header"></div>
            <br />
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss
              onClick={handleSubmit}
            >
              Add Project
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
