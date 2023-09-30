import React, { useState, useEffect } from "react";
import "./Speakers.css";
import Navbar from "../Navbar";
import SpeakersTile from "./SpeakersTile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SecFooter from "../SecFooter";
import Footer from "../Footer";
import { hostname } from "../../hostname";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js.map";

// import minus from "../img/minus-solid.svg";
export default function Speakers() {
  const [getspeakers, setgetSpeakers] = useState([]);
  const isDeleteEnabled = true;
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
  const fetchSpeakers = async () => {
    try {
      const response = await fetch(`${hostname}/all-speaker`);
      if (response.ok) {
        const data = await response.json();
        console.log(data.speakers);
        setgetSpeakers(data.speakers);
      } else {
        console.error("Failed to fetch speakers");
      }
    } catch (error) {
      console.error("Error fetching speakers:", error);
    }
  };
  useEffect(() => {
    fetchSpeakers();
  }, []);
  useEffect(() => {
    const exampleModal = document.getElementById("exampleModal");
    if (exampleModal) {
      exampleModal.addEventListener("show.bs.modal", (event) => {});
    }
  }, []);
  const [speaker, setspeaker] = useState({
    name: "",
    post: "",
    university: "",
    city: "",
    state: "",
    pincode: "",
    about: "",
    sociallinks: [],
    selectedspeakerprofilephoto: null,
  });

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
          toast("Error ading the picture!", {
            position: "top-right",
            backgroundColor: "#0E8388",
          });
        });
    } else {
      return;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(speaker.sociallinks);
    console.log(1);
    if (
      !speaker.name ||
      !speaker.post ||
      !speaker.university ||
      !speaker.city ||
      !speaker.state ||
      !speaker.pincode ||
      !speaker.about ||
      speaker.sociallinks.length === 0
    ) {
      // Set error messages for the respective input fields
      if (!speaker.name) {
        setnameError(" Name is required.");
      }
      if (!speaker.post) {
        setpostError("Post is required.");
      }
      if (!speaker.university) {
        setuniversityError("University are required.");
      }
      if (!speaker.city) {
        setcityError("City are required.");
      }
      if (!speaker.state) {
        setstateError("State are required.");
      }
      if (!speaker.pincode) {
        setpincodeError("Pincode are required.");
      }
      if (!speaker.about) {
        setaboutError("About are required.");
      }
      if (!speaker.sociallinks) {
        setsocsociallinksError("Social Links  are required.");
      }
      // Prevent form submission
      toast("Add All fileds!", {
        position: "top-right",
        backgroundColor: "#0E8388",
      });
      return;
    }

    fetch(`${hostname}/admin/add-speaker`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("adminAuthToken"), // Replace with your access token if needed
      },
      body: JSON.stringify({
        name: speaker.name,
        post: speaker.post,
        university: speaker.university,
        city: speaker.city,
        state: speaker.state,
        pincode: speaker.pincode,
        about: speaker.about,
        pic: selectedspeakerprofilephoto,
        social_links: speaker.sociallinks,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Team member added successfully, you can handle the response data here
          console.log("Speaker added successfully:", data.team_member);
          fetchSpeakers();
          // Close the modal (if you want)
          // Add code to close the modal here if needed
          toast("Successfully Submited!", {
            position: "top-right",
            backgroundColor: "#0E8388",
          });
          setShowModal(false);
        } else {
          // Error occurred while adding a team member, handle the error message
          console.error("Error adding Speaker:", data.message);
          toast(data.message, {
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
    setspeaker((prevSpeaker) => ({
      ...prevSpeaker,
      sociallinks: [...prevSpeaker.sociallinks, ""],
    }));
  };

  const handleTextInputChange = (identifier, event, index) => {
    // Ensure that the event object is properly passed
    if (event && event.target) {
      // Create a copy of the speaker object
      const updatedSpeaker = { ...speaker };

      // Update the corresponding field based on the identifier
      if (identifier === "speakername") {
        updatedSpeaker.name = event.target.value;
        setnameError("");
      } else if (identifier === "speakerpost") {
        updatedSpeaker.post = event.target.value;
        setpostError("");
      } else if (identifier === "speakeruniversity") {
        updatedSpeaker.university = event.target.value;
        setuniversityError("");
      } else if (identifier === "speakercity") {
        updatedSpeaker.city = event.target.value;
        setcityError("");
      } else if (identifier === "speakerstate") {
        updatedSpeaker.state = event.target.value;
        setstateError("");
      } else if (identifier === "speakerpincode") {
        updatedSpeaker.pincode = event.target.value;
        setpincodeError("");
      } else if (identifier === "speakerabout") {
        updatedSpeaker.about = event.target.value;
        setaboutError("");
      }

      // Update the state with the modified speaker object
      setspeaker(updatedSpeaker);
    }
  };
  const handlelinksInputChange = (event, index) => {
    const updatedSocialLinks = [...speaker.sociallinks];
    updatedSocialLinks[index] = event.target.value;
    setspeaker({
      ...speaker,
      sociallinks: updatedSocialLinks,
    });
  };

  const handleDelete = async (event, Id) => {
    // Make an HTTP DELETE request to delete the event
    if (isDeleteEnabled) {
      console.log(isDeleteEnabled);
      event.preventDefault();
      try {
        const response = await fetch(`${hostname}/delete/speaker/${Id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("adminAuthToken"),
          },
        });

        if (!response.ok) {
          toast(response.json().message, {
            position: "top-right",
            backgroundColor: "#0E8388",
          });
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Speaker deleted successfully:", data);
        fetchSpeakers();
        // Navigate to the "/speakers" route
      } catch (error) {
        toast("Error Occured!", {
          position: "top-right",
          backgroundColor: "#0E8388",
        });
        console.error("Error deleting speaker:", error);
      }
    }
  };

  return (
    <div className="speakers">
      <Navbar />
      <div className="speakersheader">
        <span style={{ color: "#0E8388" }}>Our</span> Speakers
      </div>
      {user && user.type === "admin" && (
        <div
          className="registeryourself"
          style={{ marginLeft: "9vw", marginTop: "3vw" }}
        >
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={handleModalToggle}
          >
            Add Speaker
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
                marginTop: "35vw",
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
                      <label htmlFor="speaker-name" className="col-form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                        id="speaker-name"
                        name="speakername"
                        value={speaker.name}
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
                      <label htmlFor="speaker-post" className="col-form-label">
                        Post
                      </label>
                      <input
                        type="text"
                        className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                        id="speaker-post"
                        name="speakerpost"
                        value={speaker.post}
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
                      value={speaker.university}
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
                          value={speaker.city}
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
                          value={speaker.state}
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
                          value={speaker.pincode}
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
                      value={speaker.about}
                      onChange={(e) => handleTextInputChange("speakerabout", e)}
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
                            // value={speaker.sociallinks[index] || ""} // Use the value from the state based on the index
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
      <div className="SpeakersTile">
        {getspeakers.map((speaker) => (
          <SpeakersTile
            // _id={speaker._id}
            speaker={speaker}
            // university={speaker.university}
            // image={speaker.pic} // Assuming pic is the image URL
            // links={speaker.social_links}
            onDelete={(event) => handleDelete(event, speaker._id)}
          />
        ))}
      </div>
      <SecFooter />
      <Footer />
    </div>
  );
}
