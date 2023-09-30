import React, { useEffect, useState } from "react";
import "./Team.css";
import TeamTile from "./TeamTile";
import toolbar from "../../img/toolbar.png";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { hostname } from "../../hostname";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [user, setUser] = useState(null);
  const isDeleteEnabled = true;

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
  const [team, setteam] = useState({
    team: "",
    name: "",
    post: "",
    bio: "",
    social_links: [],
    teamprofilephoto: null,
  });
  const [nameError, setnameError] = useState("");
  const [postError, setpostError] = useState("");
  const [teamError, setteamError] = useState("");
  const [bioError, setbioError] = useState("");
  const [social_linksError, setsocial_linksError] = useState("");
  const [selectedteamprofilephoto, setSelectedteamprofilephoto] =
    useState(null);
  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(`${hostname}/all-team-members`);
      if (!response.ok) {
        throw new Error("Failed to fetch team members");
      }
      const data = await response.json();
      console.log(data.teams);
      setTeamMembers(data.teams);
    } catch (error) {
      console.error("Error fetching team members:", error.message);
    }
  };
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleChange = (e) => {
    const pics = e.target.files[0];
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Open Source Weekend");
      data.append("cloud_name", "darsh-cloud");
      fetch("https://api.cloudinary.com/v1_1/darsh-cloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setSelectedteamprofilephoto(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };
  const [textInputs, setTextInputs] = useState([""]);

  const handleTextInputChange = (identifier, event) => {
    if (event && event.target) {
      const updatedteam = { ...team };

      if (identifier === "teamname") {
        updatedteam.name = event.target.value;
        setnameError("");
      } else if (identifier === "teampost") {
        updatedteam.post = event.target.value;
        setpostError("");
      } else if (identifier === "teambio") {
        updatedteam.bio = event.target.value;
        setbioError("");
      } else if (identifier === "team") {
        updatedteam.team = event.target.value;
        setteamError("");
      }
      console.log(updatedteam);

      setteam(updatedteam);
    }
  };
  const handlelinksInputChange = (event, index) => {
    const updatedSocialLinks = [...team.social_links];
    updatedSocialLinks[index] = event.target.value;
    setteam({
      ...team,
      social_links: updatedSocialLinks,
    });
  };
  const removeTextInput = (index) => {
    if (textInputs.length > 1) {
      const updatedInputs = [...textInputs];
      updatedInputs.splice(index, 1);
      setTextInputs(updatedInputs);
    }
  };

  const addTextInput = () => {
    setTextInputs([...textInputs, ""]);
    setteam((prevTeam) => ({
      ...prevTeam,
      sociallinks: [...prevTeam.social_links, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !team.name ||
      !team.post ||
      !team.bio ||
      !team.team ||
      team.social_links.length === 0
    ) {
      // Set error messages for the respective input fields
      if (!team.name) {
        setnameError(" Name is required.");
      }
      if (!team.post) {
        setpostError("Post is required.");
      }
      if (!team.bio) {
        setbioError("Bio are required.");
      }
      if (!team.team) {
        setteamError("Team are required.");
      }
      if (!team.sociallinksofteam) {
        setsocial_linksError("Social Links are required.");
      }
      return;
    }

    console.log(localStorage.getItem("adminAuthToken"));
    fetch(`${hostname}/admin/add-teammember`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("adminAuthToken"),
      },
      body: JSON.stringify({
        name: team.name,
        bio: team.bio,
        post: team.post,
        team: team.team,
        social_links: team.social_links,
        pics: selectedteamprofilephoto,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Team member added successfully:", data.team_member);
          setteam({
            name: "",
            post: "",
            bio: "",
            team: "",
            social_links: [],
          });

          fetchTeamMembers();
          setShowModal(false);
          toast("Successfully Submited!", {
            position: "top-right",
            backgroundColor: "green",
          });
        } else {
          console.error("Error adding team member:", data.message);
          toast("Error Occured!", {
            position: "top-right",
            backgroundColor: "red",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast("Error Occured!", {
          position: "top-right",
          backgroundColor: "red",
        });
      });
  };

  const handleDelete = async (event, Id) => {
    if (isDeleteEnabled) {
      console.log(isDeleteEnabled);
      event.preventDefault();
      try {
        const response = await fetch(`${hostname}/delete/team-member/${Id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("adminAuthToken"),
          },
        });

        if (!response.ok) {
          toast("Error Deleting a team member", {
            position: "top-right",
            backgroundColor: "red",
          });
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        toast("Deleted SuccessFully!", {
          position: "top-right",
          backgroundColor: "green",
        });
        console.log("Speaker deleted successfully:", data);
        fetchTeamMembers();
      } catch (error) {
        toast("Error Deleting!", {
          position: "top-right",
          backgroundColor: "red",
        });
        console.error("Error deleting speaker:", error);
      }
    }
  };
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className="team">
        <Navbar />
        <div className="teamheader">
          <div className="teamheadertitle">
            <span style={{ color: "#0E8388" }}>Our</span> Team
          </div>
          {/* <div className="headertext">
            {/* <p>
              Google is known all around the world. Everyone is 'googling',
              checking on 'maps' and communicating in 'gmail'. For simple users,
              they are services that just works, but not for us. Developers see
              much more: APIs, scalability issues, complex technology stacks.
              And that is what GDG is about.
            </p>
            <p>
              Our goal is to organize space to connect the best industry experts
              with Indian audience to boost development of IT. And Our Core Team
              is:
            </p> 
          </div> */}
        </div>
        {user && user.type === "admin" && (
          <div
            className="addteammember"
            style={{ marginLeft: "10vw", marginTop: "3vw" }}
          >
            {/* <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add Team Member
            </button> */}
            <button
              type="button"
              className="btn btn-primary"
              ata-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={handleModalToggle}
            >
              Add Team Member
            </button>
          </div>
        )}
        {showModal && (
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ opacity: 1 }}
          >
            <div
              className="modal-dialog modal-lg"
              style={{
                // marginRight: "10vw",
                width: "100%",
                // marginLeft: "0vw",
              }}
            >
              <div
                className="modal-content"
                style={{
                  // marginLeft: "30vw",
                  width: "100%",
                  marginTop: "20vw",
                }}
              >
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add Member
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    {/* Profile Photo */}
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Profile Photo
                      </label>
                      {/* {selectedteamprofilephoto && (
                        <img
                          className="teamprofilephoto"
                          src={selectedteamprofilephoto}
                          alt="Selected_Profile_Photo"
                        />
                      )} */}
                      <input
                        className="form-control"
                        name="teamprofilephoto"
                        type="file"
                        id="formFile"
                        onChange={handleChange}
                      />
                    </div>

                    {/* Name, Post, Team */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="teamname"
                        value={team.name}
                        onChange={(e) => handleTextInputChange("teamname", e)}
                        required
                      />
                      {nameError && (
                        <div className="error-message">{nameError}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="team-post" className="form-label">
                        Post
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="team-post"
                        name="teampost"
                        onChange={(e) => handleTextInputChange("teampost", e)}
                        required
                      />
                      {postError && (
                        <div className="error-message">{postError}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="team" className="form-label">
                        Team
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="team"
                        name="team"
                        value={team.team}
                        onChange={(e) => handleTextInputChange("team", e)}
                        required
                      />
                      {teamError && (
                        <div className="error-message">{teamError}</div>
                      )}
                    </div>

                    {/* Bio */}
                    <div className="mb-3">
                      <label htmlFor="team-bio" className="form-label">
                        Bio
                      </label>
                      <textarea
                        className="form-control"
                        id="team-bio"
                        name="teambio"
                        onChange={(e) => handleTextInputChange("teambio", e)}
                        required
                      />
                      {bioError && (
                        <div className="error-message">{bioError}</div>
                      )}
                    </div>

                    {/* Social Links */}
                    <div className="mb-3">
                      <label htmlFor="team-sociallinks" className="form-label">
                        Social Links
                      </label>
                      {textInputs.map((textInput, index) => (
                        <div className="minus" key={index}>
                          <div className="team-sociallinksInput">
                            <input
                              type="text"
                              id={`team-sociallinks-${index}`}
                              name={`teamsociallinks-${index}`}
                              value={team.social_links[index] || ""}
                              className="form-control"
                              onChange={(e) => handlelinksInputChange(e, index)}
                              required
                            />
                          </div>
                          <button
                            type="button"
                            className="ms-3 btn btn-primary"
                            style={{ backgroundColor: "#0E8388" }}
                            onClick={() => removeTextInput(index)}
                          >
                            Remove
                          </button>
                          {social_linksError && (
                            <div className="error-message">
                              {social_linksError}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ backgroundColor: "#0E8388" }}
                        onClick={addTextInput}
                      >
                        Add Social Links
                      </button>
                    </div>
                  </form>
                </div>
                <div className="modal-header"></div>
                <br />
                {/* <button
                    type="button"
                    className="btn btn-promary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button> */}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleSubmit}
                >
                  Submit
                  <ToastContainer />{" "}
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="TeamTile">
          {teamMembers.map((member, index) => (
            <TeamTile
              team={member}
              onDelete={(event) => handleDelete(event, member._id)}

              // ... Other props
            />
          ))}
        </div>
        {/* <div className="orgTeamMem">
          <h4>Organizing Team Members</h4>
          <button className="orgTeamMembutton">
            <div className="orgTeamMemImg">
              <img src={toolbar} alt="" />
            </div>
            {/* <div className="orgTeamMemInfo">
              <span>
                <p>Aura</p>
                <p>Aura Admin</p>
              </span>
              <a className="links" href="www.twitter.com">
                <i className="fa fa-brands fa-twitter fa-2xs"></i>
              </a>
              <a className="links" href="www.github.com">
                <i className="fa fa-brands fa-github fa-2xs"></i>
              </a>
              <a className="links" href="www.medium.com">
                <i className="fa fa-brands fa-medium fa-2xs"></i>
              </a>
            </div> 
          </button>
        </div> */}
        <Footer />
      </div>
    </>
  );
};

export default Team;
