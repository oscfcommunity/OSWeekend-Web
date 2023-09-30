import React, { useEffect, useState } from "react";
import "./TeamProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import { hostname } from "../../hostname";
import { ToastContainer, toast } from "react-toastify";
export default function TeamProfile(props) {
  const [memberDetails, setMemberDetails] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [teamname, setteamname] = useState("");
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [nameError, setnameError] = useState("");
  const [postError, setpostError] = useState("");
  const [teamError, setteamError] = useState("");
  const [bioError, setbioError] = useState("");
  const [social_linksError, setsocial_linksError] = useState("");
  const [selectedteamprofilephoto, setSelectedteamprofilephoto] =
    useState(null);
  const [textInputs, setTextInputs] = useState([""]);
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
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
  const fetchMemberDetails = async () => {
    try {
      const response = await fetch(`${hostname}/team-member/all-details/${id}`);
      const data = await response.json();
      if (data.success) {
        setMemberDetails(data.data);
        setteamname(data.data.team || "");
        setName(data.data.name || "");
        setPost(data.data.post || "");
        setBio(data.data.bio || "");
        setSocialLinks(data.data.social_links || []);
        setSelectedteamprofilephoto(data.data.pic || "");
      } else {
        console.error("Failed to fetch member details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching member details:", error);
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMemberDetails();
  }, []);

  if (loading) {
    // While loading, you can show a loading indicator or message
    return <div>Loading...</div>;
  }

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
          console.log(data.url.toString());
          setSelectedteamprofilephoto(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  const handleTextInputChange = (identifier, event) => {
    if (event && event.target) {
      if (identifier === "teamname") {
        setName(event.target.value);
        setnameError("");
      } else if (identifier === "team") {
        setteamname(event.target.value);
        setteamError("");
      } else if (identifier === "post") {
        setPost(event.target.value);
        setpostError("");
      } else if (identifier === "bio") {
        setBio(event.target.value);
        setbioError("");
      }
    }
  };
  const handlelinksInputChange = (event, index) => {
    const updatedSocialLinks = [...socialLinks];
    updatedSocialLinks[index] = event.target.value;
    setSocialLinks(updatedSocialLinks);
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
    setSocialLinks((prevSocialLinks) => [...prevSocialLinks, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !post || !bio || !teamname || socialLinks.length === 0) {
      // Set error messages for the respective input fields
      if (!name) {
        setnameError(" Name is required.");
      }
      if (!post) {
        setpostError("Post is required.");
      }
      if (!bio) {
        setbioError("Bio are required.");
      }
      if (!teamname) {
        setteamError("Team are required.");
      }
      if (!socialLinks) {
        setsocial_linksError("Social Links are required.");
      }
      return;
    }
    console.log(selectedteamprofilephoto);
    fetch(`${hostname}/team/update-team/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("adminAuthToken"),
      },
      body: JSON.stringify({
        name: name,
        bio: bio,
        post: post,
        team: teamname,
        social_links: socialLinks,
        pics: selectedteamprofilephoto,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Team member added successfully:", data.team_member);
          toast("Successfully Submited!", {
            position: "top-right",
            backgroundColor: "#0E8388",
          });
          fetchMemberDetails();
        } else {
          console.error("Error adding team member:", data.message);
          toast("Error Occured!", {
            position: "top-right",
            backgroundColor: "#0E8388",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast("Error Occured!", {
          position: "top-right",
          backgroundColor: "#0E8388",
        });
      });
  };
  const generateLinkIcon = (link) => {
    if (link.includes("twitter")) {
      return "Twitter";
    } else if (link.includes("linkedin")) {
      return "LinkedIn";
    } else if (link.includes("github")) {
      return "GitHub";
    } else if (link.includes("medium")) {
      return "Medium";
    } else if (link.includes("gmail")) {
      return "Gmail";
    } else if (link.includes("youtube")) {
      return "YouTube";
    } else if (link.includes("instagram")) {
      return "Instagram";
    } else {
      return "Link";
    }
  };
  function goback() {
    navigate("/team");
  }

  return (
    <div className="teamProfilepage">
      <div className="back">
        <span className="arrow">
          <button onClick={goback}>
            <i
              class="fa fa-solid fa-arrow-left"
              style={{ color: "#000000" }}
            ></i>
            Team
          </button>
        </span>
      </div>
      <div className="profile">
        <div
          className="memberPhotoAndOtherInfo"
          style={{ position: "relative" }}
        >
          {user && user.type === "admin" && (
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleModalToggle}
              // onClick={handleEdit} // Add your edit button click handler
            >
              <i className="fa fa-edit"></i> {/* Add your edit icon */}
            </button>
          )}
          <img src={memberDetails.pic} alt="" className="memberPhoto" />
          <p className="memberInfoName">{memberDetails.name}</p>
          <p className="memberInfoJob">{memberDetails.post}</p>
          <p className="mamberInfoWhichTeam">{memberDetails.team}</p>
        </div>
        <div className="memberInfo">
          <p className="memberInfoHeading">Bio</p>
          <p className="memberInfoMessage">{memberDetails.bio}</p>
          <br />
          <span className="memberInfoHeading">
            <p>Social Links</p>
            {/* <br /> */}
            <br />
            <div className="teamprofilesociallink">
              {memberDetails.social_links.map((link, index) => (
                <a key={index} className="links" href={link}>
                  {generateLinkIcon(link)}
                </a>
              ))}
            </div>
          </span>
        </div>
      </div>
      {showModal && (
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
                // marginRight: "10vw",
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
                  <div class="mb-3">
                    <label for="formFile" className="form-label">
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

                  <div className="d-flex">
                    <div className="mb-3 p-2 flex-fill">
                      <label htmlFor="name" className="col-form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                        id="name"
                        name="teamname"
                        defaultValue={name}
                        onChange={(e) => handleTextInputChange("teamname", e)}
                        required
                      />
                      {nameError && (
                        <div className="error-message">{nameError}</div>
                      )}
                    </div>
                    <div className="mb-3 p-2 flex-fill">
                      <label htmlFor="team-post" className="col-form-label">
                        Post
                      </label>
                      <input
                        type="text"
                        className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                        id="team-post"
                        name="teampost"
                        defaultValue={post}
                        onChange={(e) => handleTextInputChange("teampost", e)}
                        required
                      />
                      {postError && (
                        <div className="error-message">{postError}</div>
                      )}
                    </div>
                    <div className="mb-3 p-2 flex-fill">
                      <label htmlFor="team" className="col-form-label">
                        Team
                      </label>
                      <input
                        type="text"
                        className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                        id="team"
                        name="team"
                        defaultValue={teamname}
                        onChange={(e) => handleTextInputChange("team", e)}
                        required
                      />
                      {teamError && (
                        <div className="error-message">{teamError}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="team-bio" className="col-form-label">
                      Bio
                    </label>
                    <textarea
                      className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                      id="team-bio"
                      name="teambio" // <-- Corrected name attribute
                      defaultValue={bio}
                      onChange={(e) => handleTextInputChange("teambio", e)} // <-- Corrected identifier
                      required
                    ></textarea>
                    {bioError && (
                      <div className="error-message">{bioError}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="team-sociallinks"
                      className="col-form-label"
                    >
                      Social Links
                    </label>
                    {textInputs.map((textInput, index) => (
                      <div className="minus" key={index}>
                        <div className="team-sociallinksInput">
                          <input
                            type="text"
                            id={`team-sociallinks-${index}`}
                            name={`teamsociallinks-${index}`}
                            defaultValue={socialLinks[index] || ""}
                            className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
                <ToastContainer />{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
