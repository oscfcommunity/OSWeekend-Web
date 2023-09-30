import React, { useEffect, useState } from "react";
import "./ResourceLibrary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDocker, faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TruncateText from "../TruncateText";
// import ResourceLibraryProfile from "./ResourceLibraryProfile";
import Navbar from "../Navbar";
import Footer from "../Footer";
import SecFooter from "../SecFooter";
import { hostname } from "../../hostname";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditResourceLibrary from "./edit_project_details";
export default function ResourceLibrary() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [projectNameError, setProjectNameError] = useState("");
  const [projectDescError, setProjectDescError] = useState("");
  const [projectLinksError, setProjectLinksError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseditModalOpen, setIseditModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [projecttagsError, setProjecttagsError] = useState("");
  const rowsPerPageOptions = [5, 10, 15];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState({
    project_name: "",
    project_details: "",
    project_tags: "",
    project_links: "",
  });
  const [getprojects, setGetProjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the JWT token from wherever you have stored it (e.g., localStorage)
    const getUser = async () => {
      if (localStorage.getItem("userAuthToken")) {
        const token = localStorage.getItem("userAuthToken");

        if (token) {
          try {
            // Split the token into its parts
            const tokenParts = token.split(".");

            // Base64-decode and parse the payload part (the second part)
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log(payload.type);
            await setUser(payload); // Set user state with decoded data
          } catch (error) {
            // Handle decoding error (e.g., token is invalid)
            console.error("Error decoding JWT token:", error);
          }
        }
      } else {
        const token = localStorage.getItem("adminAuthToken");
        if (token) {
          try {
            // Split the token into its parts
            const tokenParts = token.split(".");

            // Base64-decode and parse the payload part (the second part)
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log(payload.type);
            await setUser(payload); // Set user state with decoded data
          } catch (error) {
            // Handle decoding error (e.g., token is invalid)
            console.error("Error decoding JWT token:", error);
          }
        }
      }
    };
    getUser();
    // console.log(user.type);
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${hostname}/resource-library/allprojects`);
      if (response.ok) {
        const data = await response.json();
        console.log(data.projects);
        setGetProjects(data.projects); // Assuming the response structure has a 'projects' property
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("An error occurred while fetching projects", error);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects when the component mounts
  }, []);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const prev = <i className="fa-solid fa-less-than"></i>;
  const next = (
    <i className="fa-solid fa-greater-than" style={{ paddingLeft: "8px" }}></i>
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalProjects = getprojects.length;
  const totalPages = Math.ceil(totalProjects / rowsPerPage);
  const indexOfLastProject = currentPage * rowsPerPage;
  // const indexOfFirstProject = indexOfLastProject - rowsPerPage;
  const indexOfFirstProject = indexOfLastProject - rowsPerPage;
  const currentProjects = getprojects.slice(indexOfFirstProject, indexOfLastProject);

  // const handleSort = () => {
  //   const sortedProjects = [...getprojects].sort((a, b) => {
  //     const nameA = a.name.toLowerCase();
  //     const nameB = b.name.toLowerCase();

  //     if (nameA < nameB) {
  //       return sortOrder === "asc" ? -1 : 1;
  //     }
  //     if (nameA > nameB) {
  //       return sortOrder === "asc" ? 1 : -1;
  //     }
  //     return 0;
  //   });

  //   setGetProjects(sortedProjects);
  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  // };
  const handleEditButtonClick = (project) => {
    console.log(project);
    setEditProject(project);
    setIseditModalOpen(true);
  };

  const handleDelete = (projectId) => {
    console.log(projectId);
    // Make an HTTP DELETE request to delete the event
    fetch(`${hostname}/resource-library/delete-project/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminAuthToken"), // Replace with your access token if needed
      },
    })
      .then((response) => {
        if (!response.ok) {
          toast("Error Deleting a Project", {
            position: "top-right",
            backgroundColor: "red",
          });
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        toast("Deleted SuccessFully!", {
          position: "top-right",
          backgroundColor: "green",
        });
        // Handle the successful response
        console.log("Event deleted successfully:", data);
        fetchProjects();
        // Add any further actions you want to take upon successful deletion
      })
      .catch((error) => {
        toast("Error Deleting a Project", {
          position: "top-right",
          backgroundColor: "red",
        });
        // Handle errors during the fetch
        console.error("Error deleting event:", error);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      projects.project_name,
      projects.project_details,
      projects.project_links,
      projects.project_tags
    );
    // console.log(projects);

    const githubLinkPattern = /github\.com/i;
    const dockerLinkPattern = /docker\.com/i;
    // Check if project_links is a string
    const projectLinks = projects.project_links || "";

    // Assuming githubLinkPattern and dockerLinkPattern are RegExp patterns
    const areLinksValid =
      githubLinkPattern.test(projectLinks) ||
      dockerLinkPattern.test(projectLinks);

    // Now areLinksValid will be true if the link matches either pattern

    if (
      !areLinksValid ||
      !projects.project_name ||
      !projects.project_details ||
      !projects.project_links ||
      !projects.project_tags
    ) {
      setIsModalOpen(false); // Add this line to close the modal

      // Prevent form submission
      toast("Error Occured!", {
        position: "top-right",
        backgroundColor: "red",
      });
      return;
    }

    // Continue with form submission or other actions

    fetch(`${hostname}/resource-library/add-project`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("adminAuthToken"), // Replace with your access token if needed
      },
      body: JSON.stringify({
        project_name: projects.project_name,
        project_details: projects.project_details,
        project_links: projects.project_links,
        project_tags: projects.project_tags,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Team member added successfully, you can handle the response data here
          console.log("Project added successfully:", data.team_member);
          setProjects({
            project_name: "",
            project_details: "",
            project_links: "",
            project_tags: "",
          });

          // Close the modal (if you want)
          fetchProjects();
          // setIsModalOpen(false);
          // Add code to close the modal here if needed
          toast("Successfully Submited!", {
            position: "top-right",
            backgroundColor: "green",
          });
          setIsModalOpen(false);
        } else {
          // Error occurred while adding a team member, handle the error message
          console.error("Error adding Project:", data.message);
          toast("Error Occured!", {
            position: "top-right",
            backgroundColor: "red",
          });
        }
      })
      .catch((error) => {
        // Handle any network or other errors
        console.error("Error:", error);
        toast("Error Occured!", {
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
      const updatedProjects = { ...projects }; // Create a copy of the projects array

      // Clear previous error messages when input changes
      setProjectNameError("");
      setProjectDescError("");
      setProjectLinksError("");
      setProjecttagsError("");

      // Update the corresponding field based on the identifier and index
      if (identifier === "project_name") {
        console.log(event.target.value);
        updatedProjects.project_name = event.target.value;
        setProjectNameError("");
      } else if (identifier === "project_details") {
        updatedProjects.project_details = event.target.value;
        setProjectDescError("");
      } else if (identifier === "project_links") {
        updatedProjects.project_links = event.target.value;
        setProjectLinksError("");
      } else if (identifier === "project_tags") {
        updatedProjects.project_tags = event.target.value;
        setProjecttagsError("");
      }
      // console.log(updatedProjects);

      // Update the state with the modified projects array
      setProjects(updatedProjects);
    }
  };
  return (
    <>
      <Navbar />
      <div className="resourceLibrarypg">
        <div className="past-projects">
          <p className="past-projects-title">Directory of Projects</p>
          <p className="past-projects-text">
            Projects are listed in reverse chronological order by date.
          </p>
          <table className="project-table">
            <thead>
              <tr>
                <th>
                  {/* <span onClick={handleSort}> */}
                  Project Name
                  {/* {sortOrder === "asc" ? " ↓" : " ↑"} */}
                  {/* </span> */}
                </th>
                <th>Project Discription</th>
                <th>Github/Docker Link</th>
                <th>Tags</th>
                {user && user.type === "admin" && (
                  <>
                    <th>Edit Project</th>
                    <th>Delete Project</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((projects) => (
                <tr key={projects._id}>
                  <td>{projects.project_name}</td>
                  <td
                    className="project_details"
                    style={{ paddingLeft: "50px" }}
                  >
                    <TruncateText
                      text={projects.project_details}
                      maxChars={20}
                    ></TruncateText>
                  </td>
                  <td className="github-docker-icons">
                    {projects.project_links && (
                      <React.Fragment key={projects._id}>
                        {projects.project_links.includes("docker") && (
                          <a
                            href={`https://${projects.project_links}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon
                              icon={faDocker}
                              className="docker"
                            />
                          </a>
                        )}
                        {projects.project_links.includes("github") && (
                          <a
                            href={`https://${projects.project_links}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon
                              icon={faGithub}
                              className="github"
                            />
                          </a>
                        )}
                      </React.Fragment>
                    )}
                  </td>

                  <td className="tags-cell">
                    {/* Add margin or padding to the tags */}
                    {projects.project_tags}
                  </td>
                  {user && user.type === "admin" && (
                    <>
                      <td className="edit-project-buttons">
                        <div className="editprojectbutton">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEditButtonClick(projects)}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="edit"
                            ></FontAwesomeIcon>
                          </button>
                        </div>
                      </td>
                      {iseditModalOpen && (
                        <EditResourceLibrary
                          project={editProject}
                          isOpen={iseditModalOpen}
                        />
                      )}
                      <td className="delete-project-buttons">
                        <div className="deleteprojectbutton">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleDelete(projects._id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="trash"
                            ></FontAwesomeIcon>
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}

              <tr>
                <td
                  colSpan="10"
                  style={{
                    backgroundColor: "white",
                    borderColor: "white",
                    borderStyle: "none",
                  }}
                >
                  <div className="pagination">
                    {/* Number of rows per page select */}
                    <div className="pagination-con">
                      <label className="rpp" htmlFor="rowsPerPage">
                        Rows per page:
                      </label>
                      <select
                        className="rppdd"
                        id="rowsPerPage"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                      >
                        {rowsPerPageOptions.map((option) => (
                          <option
                            key={option}
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>

                      {/* Number of pages */}
                      <button
                        className="page-btn"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        {prev}
                      </button>
                      <p style={{ fontSize: "13px", paddingTop: "10px" }}>
                        Page {currentPage} of {totalPages}
                      </p>
                      {/* Pagination controls */}

                      <button
                        className="page-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        {next}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="add-project-button">
            {user && user.type === "admin" && (
              <div className="addpeojectfromhere">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Project
                </button>
              </div>
            )}
            {isModalOpen && (
              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ opacity: 1 }}
              >
                <div
                  className="modal-dialog modal-lg"
                  style={{
                    // marginLeft: "30vw",
                    width: "100%",
                    // marginRight: "-90vw",
                  }}
                >
                  <div
                    className="modal-content"
                    style={{
                      // marginLeft: "30vw",
                      width: "100%",
                      marginTop: "8vw",
                    }}
                  >
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Add Project
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => setIsModalOpen(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label
                            htmlFor="project-name"
                            className="col-form-label"
                          >
                            Project Name
                          </label>
                          <input
                            type="text"
                            className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                            id="project-name"
                            name="project_name"
                            // value={getprojects.projectname}
                            onChange={(e) =>
                              handleTextInputChange("project_name", e)
                            }
                            required
                          />
                          {projectNameError && (
                            <div className="error-message">
                              {projectNameError}
                            </div>
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
                            // value={projects.project_details}
                            onChange={(e) =>
                              handleTextInputChange("project_details", e)
                            }
                            required
                          ></textarea>
                          {projectDescError && (
                            <div className="error-message">
                              {projectDescError}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="project-taas"
                            className="col-form-label"
                          >
                            Project Tags
                          </label>
                          <div className="minus">
                            <div className="project-tagsInput">
                              <input
                                type="text"
                                id={`project-tags`}
                                name={`project_tags`}
                                // value={projects.project_tags[index] || ""}
                                className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                                onChange={(e) =>
                                  handleTextInputChange("project_tags", e)
                                }
                                required
                              />
                            </div>
                            {projecttagsError && (
                              <div className="error-message">
                                {projecttagsError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="projectlinks"
                            className="col-form-label"
                          >
                            Project Link
                          </label>
                          <div className="projectlinksInput">
                            <input
                              type="text"
                              id="project_links"
                              name="project_links"
                              // value={projects.project_links}
                              className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                              onChange={(e) =>
                                handleTextInputChange("project_links", e)
                              }
                              required
                            />
                            {projectLinksError && (
                              <div className="error-message">
                                {projectLinksError}
                              </div>
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
            )}
          </div>
          <ToastContainer /> <SecFooter />
          <Footer />
        </div>
      </div>
    </>
  );
}
