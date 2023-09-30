import React, { useState, useEffect } from "react";
import "./Speakers/Speakers.css";
import SpeakersTile from "./Speakers/SpeakersTile";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { hostname } from "../hostname";

const AddSpeakers = () => {
  const [textInputs, setTextInputs] = useState([""]);
  // const exampleModal = document.geElementById("exampleModal");

  const [nameofspeakerError, setnameofspeakerError] = useState("");
  const [postofspeakerError, setpostofspeakerError] = useState("");
  const [universityofspeakerError, setuniversityofspeakerError] = useState("");
  const [cityofspeakerError, setcityofspeakerError] = useState("");
  const [stateofspeakerError, setstateofspeakerError] = useState("");
  const [pincodeofspeakerError, setpincodeofspeakerError] = useState("");
  const [aboutofspeakerError, setaboutofspeakerError] = useState("");
  const [sociallinksofspeakerError, setsocsociallinksofspeakerError] =
    useState("");
  const [selectedspeakerprofilephoto, setSelectedspeakerprofilephoto] =
    useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const exampleModal = document.getElementById("exampleModal");
    if (exampleModal) {
      exampleModal.addEventListener("show.bs.modal", (event) => {
        // Your event handling code here
      });
    }
  }, []);
  const navigate = useNavigate();
  const [speaker, setspeaker] = useState({
    nameofspeaker: "",
    postofspeaker: "",
    universityofspeaker: "",
    cityofspeaker: "",
    stateofspeaker: "",
    pincodeofspeaker: "",
    aboutofspeaker: "",
    sociallinksofspeaker: [],
    selectedspeakerprofilephoto: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setspeaker({ ...speaker, [name]: newValue });

    setspeaker((prevSpeaker) => ({
      ...prevSpeaker,
      [name]: newValue,
    }));

    // Set the selected file for display
    setSelectedFile(files[0]);

    if (type === "file") {
      const speakerprofilephoto = files[0];
      // Create a temporary URL for the selected image
      const imageUrl = URL.createObjectURL(files[0]);
      setSelectedspeakerprofilephoto(imageUrl); // Store the URL in state
      setspeaker({ ...speaker, [name]: speakerprofilephoto });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !speaker.nameofspeaker ||
      !speaker.postofspeaker ||
      !speaker.universityofspeaker ||
      !speaker.cityofspeaker ||
      !speaker.stateofspeaker ||
      !speaker.pincodeofspeaker ||
      !speaker.aboutofspeaker ||
      !speaker.sociallinksofspeaker
    ) {      // Set error messages for the respective input fields
      if (!speaker.nameofspeaker) {
        setnameofspeakerError(" Name is required.");
      }
      if (!speaker.postofspeaker) {
        setpostofspeakerError("Post is required.");
      }
      if (!speaker.universityofspeaker) {
        setuniversityofspeakerError("University are required.");
      }
      if (!speaker.cityofspeaker) {
        setcityofspeakerError("City are required.");
      }
      if (!speaker.stateofspeaker) {
        setstateofspeakerError("State are required.");
      }
      if (!speaker.pincodeofspeaker) {
        setpincodeofspeakerError("Pincode are required.");
      }
      if (!speaker.aboutofspeaker) {
        setaboutofspeakerError("About are required.");
      }
      if (!speaker.sociallinksofspeaker) {
        setsocsociallinksofspeakerError("Social Links  are required.");
      }
      // Prevent form submission
      return;
    }

    // Continue with form submission or other actions
    console.log(
      "Form submitted with valid links and all required fields:",
      speaker
    );

    // If you want to reset the form fields after submission, you can do so by setting the project state to an empty object or initializing a new project object.
    setspeaker({
      nameofspeaker: "",
      postofspeaker: "",
      universityofspeaker: "",
      cityofspeaker: "",
      stateofspeaker: "",
      pincodeofspeaker: "",
      aboutofspeaker: "",
      sociallinksofspeaker: [],
    });

    // Close the modal (if you want)
    // Add code to close the modal here if needed
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
  };

  const handleTextInputChange = (identifier, event) => {
    // Ensure that the event object is properly passed
    if (event && event.target) {
      // Create a copy of the speaker object
      const updatedSpeaker = { ...speaker };

      // Update the corresponding field based on the identifier
      if (identifier === "speakername") {
        updatedSpeaker.nameofspeaker = event.target.value;
        setnameofspeakerError("");
      } else if (identifier === "speakerpost") {
        updatedSpeaker.postofspeaker = event.target.value;
        setpostofspeakerError("");
      } else if (identifier === "speakeruniversity") {
        updatedSpeaker.universityofspeaker = event.target.value;
        setuniversityofspeakerError("");
      } else if (identifier === "speakercity") {
        updatedSpeaker.cityofspeaker = event.target.value;
        setcityofspeakerError("");
      } else if (identifier === "speakerstate") {
        updatedSpeaker.stateofspeaker = event.target.value;
        setstateofspeakerError("");
      } else if (identifier === "speakerpincode") {
        updatedSpeaker.pincodeofspeaker = event.target.value;
        setpincodeofspeakerError("");
      } else if (identifier === "speakerabout") {
        updatedSpeaker.aboutofspeaker = event.target.value;
        setaboutofspeakerError("");
      } else if (identifier === "speakersociallinks") {
        updatedSpeaker.sociallinksofspeaker = event.target.value;
        setsocsociallinksofspeakerError("");
      }

      // Update the state with the modified speaker object
      setspeaker(updatedSpeaker);
    }
    // function SpeakersTile({ content }) {
    //   // Check if the content is not empty
    //   if (!content) {
    //     return null; // Return null to render nothing
    //   }
    // }
  };

  return (
    <>
      <Navbar />
      <div className="speakers">
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Speaker Registration
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div class="mb-3 ">
                    <label for="formFile" className="form-label">
                      Profile Photo
                    </label>
                    {selectedspeakerprofilephoto && (
                      <img
                        className="speakerprofilephoto"
                        src={selectedspeakerprofilephoto}
                        alt="Selected Profile Photo"
                      />
                    )}
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
                        value={speaker.nameofspeaker}
                        onChange={(e) =>
                          handleTextInputChange("speakername", e)
                        }
                        required
                      />
                      {nameofspeakerError && (
                        <div className="error-message">
                          {nameofspeakerError}
                        </div>
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
                        value={speaker.postofspeaker}
                        onChange={(e) =>
                          handleTextInputChange("speakerpost", e)
                        }
                        required
                      />
                      {postofspeakerError && (
                        <div className="error-message">
                          {postofspeakerError}
                        </div>
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
                      value={speaker.universityofspeaker}
                      onChange={(e) =>
                        handleTextInputChange("speakeruniversity", e)
                      }
                      required
                    />
                    {universityofspeakerError && (
                      <div className="error-message">
                        {universityofspeakerError}
                      </div>
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
                          value={speaker.cityofspeaker}
                          onChange={(e) =>
                            handleTextInputChange("speakercity", e)
                          }
                          required
                        />
                        {cityofspeakerError && (
                          <div className="error-message">
                            {cityofspeakerError}
                          </div>
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
                          value={speaker.stateofspeaker}
                          onChange={(e) =>
                            handleTextInputChange("speakerstate", e)
                          }
                          required
                        />
                        {stateofspeakerError && (
                          <div className="error-message">
                            {stateofspeakerError}
                          </div>
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
                          value={speaker.pincodeofspeaker}
                          onChange={(e) =>
                            handleTextInputChange("speakerpincode", e)
                          }
                          required
                        />
                        {pincodeofspeakerError && (
                          <div className="error-message">
                            {pincodeofspeakerError}
                          </div>
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
                      value={speaker.aboutofspeaker}
                      onChange={(e) => handleTextInputChange("speakerabout", e)}
                      required
                    ></textarea>
                    {aboutofspeakerError && (
                      <div className="error-message">{aboutofspeakerError}</div>
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
                            id="speaaker-sociallinks"
                            name="speakersociallinks"
                            value={speaker.sociallinksofspeaker}
                            className="form-control border border-2 shadow-sm bg-body-tertiary rounded"
                            onChange={(e) =>
                              handleTextInputChange("speakersociallinks", e)
                            }
                            required
                          />
                          {sociallinksofspeakerError && (
                            <div className="error-message">
                              {sociallinksofspeakerError}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          className="ms-3 btn btn-primary"
                          style={{ backgroundColor: "#0E8388" }}
                          onClick={() => removeTextInput(index)}
                        >
                          Remove
                        </button>
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AddSpeakers;
