import React, { useEffect, useState } from "react";
import "./SpeakersProfile.css";
import { Link, useParams } from "react-router-dom";
import { hostname } from "../../hostname";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Navbar";
export default function SpeakersProfile(props) {
  const [speakerDetails, setSpeakerDetails] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [textInputs, setTextInputs] = useState([""]);
  // const exampleModal = document.geElementById("exampleModal");
  const [nameError, setnameError] = useState("");
  const [postError, setpostError] = useState("");
  const [universityError, setuniversityError] = useState("");
  const [cityError, setcityError] = useState("");
  const [stateError, setstateError] = useState("");
  const [pincodeError, setpincodeError] = useState("");
  const [aboutError, setaboutError] = useState("");
  const [sociallinksError, setsocsociallinksError] = useState("");
  const [selectedspeakerprofilephoto, setSelectedspeakerprofilephoto] =
    useState(null);
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [university, setUniversity] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [about, setAbout] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
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
            setUser(payload); // Set user state with decoded data
          } catch (error) {
            // Handle decoding error (e.g., token is invalid)
            console.error("Error decoding JWT token:", error);
          }
        }
      } else {
        const token = localStorage.getItem("adminAuthToken");
        if (token) {
          try {
            const tokenParts = token.split(".");
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log(payload.type);
            setUser(payload); // Set user state with decoded data
          } catch (error) {
            console.error("Error decoding JWT token:", error);
          }
        }
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const exampleModal = document.getElementById("exampleModal");
    if (exampleModal) {
      exampleModal.addEventListener("show.bs.modal", (event) => {});
    }
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
          setSelectedspeakerprofilephoto(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(1);
    if (
      !name ||
      !post ||
      !university ||
      !city ||
      !state ||
      !pincode ||
      !about ||
      socialLinks.length === 0
    ) {
      // Set error messages for the respective input fields
      if (!name) {
        setnameError(" Name is required.");
      }
      if (!post) {
        setpostError("Post is required.");
      }
      if (!university) {
        setuniversityError("University are required.");
      }
      if (!city) {
        setcityError("City are required.");
      }
      if (!state) {
        setstateError("State are required.");
      }
      if (!pincode) {
        setpincodeError("Pincode are required.");
      }
      if (!about) {
        setaboutError("About are required.");
      }
      if (!socialLinks) {
        setsocsociallinksError("Social Links  are required.");
      }
      // Prevent form submission
      toast("Error Occured!", {
        position: "top-right",
        backgroundColor: "#0E8388",
      });
      return;
    }

    fetch(`${hostname}/speaker/update-speaker/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("adminAuthToken"), // Replace with your access token if needed
      },
      body: JSON.stringify({
        name,
        post,
        university,
        city,
        state,
        pincode,
        about,
        pic: selectedspeakerprofilephoto,
        social_links: socialLinks,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Team member added successfully, you can handle the response data here
          console.log("Speaker added successfully:", data.team_member);
          // Close the modal (if you want)
          // Add code to close the modal here if needed
          toast("Successfully Submited!", {
            position: "top-right",
            backgroundColor: "#0E8388",
          });
          fetchSpeakDetails();
        } else {
          // Error occurred while adding a team member, handle the error message
          console.error("Error adding Speaker:", data.message);
          toast("Error Occured!", {
            position: "top-right",
            backgroundColor: "#0E8388",
          });
        }
      })
      .catch((error) => {
        // Handle any network or other errors
        console.error("Error:", error);
        toast("Error Occured!", {
          position: "top-right",
          backgroundColor: "#0E8388",
        });
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
    setSocialLinks((prevLinks) => [...prevLinks, ""]);
  };

  const handleTextInputChange = (identifier, event, index) => {
    if (event && event.target) {
      const updatedSocialLinks = [...socialLinks];

      if (identifier === "speakername") {
        setName(event.target.value);
      } else if (identifier === "speakerpost") {
        setPost(event.target.value);
      } else if (identifier === "speakeruniversity") {
        setUniversity(event.target.value);
      } else if (identifier === "speakercity") {
        setCity(event.target.value);
      } else if (identifier === "speakerstate") {
        setState(event.target.value);
      } else if (identifier === "speakerpincode") {
        setPincode(event.target.value);
      } else if (identifier === "speakerabout") {
        setAbout(event.target.value);
      }

      updatedSocialLinks[index] = event.target.value;
      setSocialLinks(updatedSocialLinks);
    }
  };

  const handleLinksInputChange = (event, index) => {
    const updatedSocialLinks = [...socialLinks];
    updatedSocialLinks[index] = event.target.value;
    setSocialLinks(updatedSocialLinks);
  };

  // const navigate = useNavigate();
  const fetchSpeakDetails = async () => {
    try {
      const response = await fetch(`${hostname}/speaker/all-details/${id}`);
      const data = await response.json();
      if (data.success) {
        console.log(data.data);
        setSpeakerDetails(data.data);
        setName(data.data.name || "");
        setAbout(data.data.about || "");
        setUniversity(data.data.university || "");
        setCity(data.data.location.city || "");
        setState(data.data.location.state || "");
        setPincode(data.data.location.pincode || "");
        setPost(data.data.post || "");
        setSelectedspeakerprofilephoto(data.data.pic || "");
        console.log(data.data.social_links);
        setSocialLinks(data.data.social_links || []);
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
    fetchSpeakDetails();
  }, [id]);

  if (loading) {
    // While loading, you can show a loading indicator or message
    return <div>Loading...</div>;
  }
  const generateLinkIcon = (link) => {
    // Determine the icon based on the link
    // ... Your existing icon logic
    if (link.includes("twitter")) {
      return <i className="fa fa-brands fa-twitter fa-2xs"></i>;
    } else if (link.includes("linkedin")) {
      return <i className="fa fa-brands fa-linkedin fa-2xs"></i>;
    } else if (link.includes("github")) {
      return <i className="fa fa-brands fa-github fa-2xs"></i>;
    } else if (link.includes("medium")) {
      return <i className="fa fa-brands fa-medium fa-2xs"></i>;
    } else if (link.includes("gmail")) {
      return <i className="fa fa-envelope fa-2xs"></i>;
    } else if (link.includes("youtube")) {
      return <i className="fa fa-brands fa-youtube fa-2xs"></i>;
    } else if (link.includes("facebook")) {
      return <i className="fa fa-brands fa-facebook fa-2xs"></i>;
    } else if (link.includes("instagram")) {
      return <i className="fa fa-brands fa-instagram fa-2xs"></i>;
    } else {
      return <i className="fa fa-brands fa-link mx fa-2xs"></i>;
    }
  };
  return (
    <>
      <Navbar />
      <div className="speakerspPage">
        <div className="SpeakersProfile">
          <div className="bio">
            <div className="biobackgroundimg">
              <div className="avatar">
                {user && user.type === "admin" && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{
                      position: "relative",
                      marginRight: "-80%",
                      marginLeft: "47%",
                      colorScheme: "blue",
                    }}
                    onClick={handleModalToggle}
                  >
                    {/* Add your edit icon, e.g., a pencil icon */}
                    <i className="fa fa-edit"></i>
                  </button>
                )}
                <img src={speakerDetails.pic} alt="" />
              </div>
            </div>

            <div className="info">
              <div className="infotext">
                <p className="name">{speakerDetails.name}</p>
                <br />
                <p className="job">{speakerDetails.post} </p>
                <br />
                <p className="community">{speakerDetails.university}</p>
                <h1> </h1>
                <p className="address">
                  {speakerDetails.location.city} ,{" "}
                  {speakerDetails.location.state}{" "}
                  {speakerDetails.location.pincode}
                </p>
              </div>
              <div className="links">
                {speakerDetails.social_links.map((link, index) => (
                  <a key={index} className="" href={link}>
                    {generateLinkIcon(link)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="aboutspeaker">
            <h5 className="aboutspeakertitle">About</h5>
            <span>{speakerDetails.about}</span>
          </div>
        </div>
        <div className="sessions">
          <p className="title">Sessions</p>
          <div className="sessionbodymain">
            {speakerDetails.sessions.map((session, index) => (
              <Link
                to={{
                  pathname: `/event/details/${session._id}`,
                }}
              >
                <div key={index} className="sessionbody">
                  <span className="sessionAvatar">
                    {session.event_name.charAt(0)}
                  </span>
                  <span className="sessionname">{session.event_name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
                  marginTop: "55vw",
                }}
              >
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Speaker Registration
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
                    <div class="mb-3 ">
                      <label for="formFile" className="form-label">
                        Profile Photo
                      </label>
                      {/* {selectedspeakerprofilephoto && (
                        <img
                          className="speakerprofilephoto"
                          src={selectedspeakerprofilephoto}
                          alt="SelectedProfilePhoto"
                        />
                      )} */}
                      <input
                        className="form-control"
                        name="speakerprofilephoto"
                        type="file"
                        id="formFile"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="d-flex">
                      <div className="mb-3 p-2 flex-fill">
                        <label
                          htmlFor="speaker-name"
                          className="col-form-label"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                          id="speaker-name"
                          name="speakername"
                          defaultValue={name}
                          onChange={(e) =>
                            handleTextInputChange("speakername", e)
                          }
                          required
                        />
                        {nameError && (
                          <div className="error-message">{nameError}</div>
                        )}
                      </div>
                      <div className="mb-3 p-2 flex-fill">
                        <label
                          htmlFor="speaker-post"
                          className="col-form-label"
                        >
                          Post
                        </label>
                        <input
                          type="text"
                          className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                          id="speaker-post"
                          name="speakerpost"
                          defaultValue={post}
                          onChange={(e) =>
                            handleTextInputChange("speakerpost", e)
                          }
                          required
                        />
                        {postError && (
                          <div className="error-message">{postError}</div>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="speaker-university"
                        className="col-form-label"
                      >
                        University
                      </label>
                      <input
                        type="text"
                        className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                        id="speaker-university"
                        name="speakeruniversity"
                        defaultValue={university}
                        onChange={(e) =>
                          handleTextInputChange("speakeruniversity", e)
                        }
                        required
                      />
                      {universityError && (
                        <div className="error-message">{universityError}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">Location</label>
                      <div className="d-flex">
                        <span className="p-2 flex-fill">
                          <label
                            htmlFor="speaker-city"
                            className="col-form-label"
                          >
                            city
                          </label>
                          <input
                            type="text"
                            className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                            id="speaker-city"
                            name="speakercity"
                            defaultValue={city}
                            onChange={(e) =>
                              handleTextInputChange("speakercity", e)
                            }
                            required
                          />
                          {cityError && (
                            <div className="error-message">{cityError}</div>
                          )}
                        </span>
                        <span className="p-2 flex-fill">
                          <label
                            htmlFor="speaker-state"
                            className="col-form-label"
                          >
                            state
                          </label>
                          <input
                            type="text"
                            className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                            id="speaker-state"
                            name="speakerstate"
                            defaultValue={state}
                            onChange={(e) =>
                              handleTextInputChange("speakerstate", e)
                            }
                            required
                          />
                          {stateError && (
                            <div className="error-message">{stateError}</div>
                          )}
                        </span>
                        <span className="p-2 flex-fill">
                          <label
                            htmlFor="speaker-pincode"
                            className="col-form-label"
                          >
                            Pincode
                          </label>
                          <input
                            type="text"
                            className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                            id="speaker-pincode"
                            name="speakerpincode"
                            defaultValue={pincode}
                            onChange={(e) =>
                              handleTextInputChange("speakerpincode", e)
                            }
                            required
                          />
                          {pincodeError && (
                            <div className="error-message">{pincodeError}</div>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="speaker-about" className="col-form-label">
                        About
                      </label>
                      <textarea
                        className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                        id="speaker-about"
                        name="speakerabout"
                        defaultValue={about}
                        onChange={(e) =>
                          handleTextInputChange("speakerabout", e)
                        }
                        required
                      ></textarea>
                      {aboutError && (
                        <div className="error-message">{aboutError}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="speaker-sociallinks"
                        className="col-form-label"
                      >
                        Social Links
                      </label>
                      {textInputs.map((textInput, index) => (
                        <div className="minus" key={index}>
                          <div className="speaker-sociallinksInput">
                            <input
                              type="text"
                              id={`speaker-sociallinks-${index}`}
                              name={`speakersociallinks-${index}`}
                              defaultValue={socialLinks[index] || ""} // Use the value from the state based on the index
                              className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                              onChange={(e) => handleLinksInputChange(e, index)}
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
                          {sociallinksError && (
                            <div className="error-message">
                              {sociallinksError}
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
    </>
  );
}
