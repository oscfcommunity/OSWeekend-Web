import React, { useEffect, useState } from "react";
import "./EventForm.css";
import { hostname } from "../../hostname";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventEditForm() {
  const Id = useParams();
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    event_name: "",
    language: "",
    event_date: null,
    startTime: null,
    endTime: null,
    timeZone: "UTC",
    event_type: "",
    address: "", //add to form
    country: "",
    city: "",
    state: "", //add to form
    pincode: 0,
    location: null,
    meet_link: "",
    limit: null, //add o form
    socialmedia_links: [], //add to form
    social_links: "",
    event_goals: "",
    event_tags: [],
    updatedTags: "",
    speakers: [],
    external_speaker: "",
    agreement: false,
    event_description: "",
    // ... (other fields)
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownSpeakerOpen, setDropdownSpeakerOpen] = useState(false);
  const [speakerOptions, setSpeakerOptions] = useState([]);
  const [user, setUser] = useState(null);
  const [eventPoster, setEventPoster] = useState(null);
  const [token1, setToken] = useState();
  const getUser = async () => {
    if (localStorage.getItem("userAuthToken")) {
      const token = localStorage.getItem("userAuthToken");
      setToken(localStorage.getItem("userAuthToken"));

      if (token) {
        try {
          // Split the token into its parts
          const tokenParts = token.split(".");

          // Base64-decode and parse the payload part (the second part)
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log(payload.type);
        } catch (error) {
          // Handle decoding error (e.g., token is invalid)
          console.error("Error decoding JWT token:", error);
        }
      }
    } else {
      const token = localStorage.getItem("adminAuthToken");
      console.log();
      if (token) {
        try {
          // Split the token into its parts
          const tokenParts = token.split(".");

          // Base64-decode and parse the payload part (the second part)
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log(payload.type);
          setUser(payload); // Set user state with decoded data
          setToken(localStorage.getItem("adminAuthToken"));
        } catch (error) {
          // Handle decoding error (e.g., token is invalid)
          console.error("Error decoding JWT token:", error);
        }
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (user && user === "admin") {
      get_speaker();
    }
    // Call the function to fetch the speakers
  }, [user]);
  const convertTime = (time) => {
    const inputDate = new Date(time);

    const hours = String(inputDate.getUTCHours()).padStart(2, "0"); // Extract hours and pad with 0 if needed
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, "0"); // Extract minutes and pad with 0 if needed

    const formattedTime = `${hours}:${minutes}`;
    console.log(formattedTime); // Outputs: "00:00"
    return formattedTime;
  };
  const convertDate = (date) => {
    const originalDate = new Date(date); // Parse the original date string
    const year = originalDate.getFullYear(); // Get the year
    const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Get the month (adding 1 because months are zero-based)
    const day = String(originalDate.getDate()).padStart(2, "0"); // Get the day

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate); // Output: "2023-09-23"
    return formattedDate;
  };
  const get_speaker = async () => {
    try {
      const response = await fetch(`${hostname}/all-speaker`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any headers if needed
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Now, 'data' contains the fetched speakers
        setSpeakerOptions(data.speakers);
        console.log(data.speakers);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch speakers:", errorData);
        // Handle error or display an error message to the user
      }
    } catch (error) {
      console.error("An error occurred while fetching speakers:", error);
      // Handle the error
    }
  };
  useEffect(() => {
    if (user && user.type === "admin") {
      get_speaker();
    }
    // Call the function to fetch the speakers
  }, [user]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${hostname}/event/${Id.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.eventData);
          setFormData({
            event_name: data.eventData.event_name || "",
            language: data.eventData.language || "",
            event_date: convertDate(data.eventData.event_date) || null,
            startTime: convertTime(data.eventData.startTime) || null,
            endTime: convertTime(data.eventData.endTime) || null,
            timeZone: data.eventData.timeZone || "UTC",
            event_type: data.eventData.event_type || "",
            address: data.eventData.address || "", //add to form
            country: data.eventData.location.country || "",
            city: data.eventData.location.city || "",
            state: data.eventData.location.state || "", //add to form
            pincode: data.eventData.location.pincode || 0,
            meet_link: data.eventData.meet_link || "",
            limit: data.eventData.limit || null, //add o form
            socialmedia_links: data.eventData.social_links || [], //add to form
            event_goals: data.eventData.event_goals || "",
            event_tags: data.eventData.event_tags || [],
            speakers: data.eventData.speakers || [],
            event_description: data.eventData.event_description || "",
            // ... (other fields)
          });
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch event details:", errorData);
          // Handle the error or display an error message to the user
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        // Handle the error or display an error message to the user
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };
    fetchData(); // Call the fetchData function when the component mounts
  }, [Id]);

  if (loading) {
    // While loading, you can show a loading indicator or message
    return <div>Loading...</div>;
  }
  // const handleImageChange = (e) => {
  //   const pics = e.target.files[0];
  //   if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //     const data = new FormData();
  //     data.append("file", pics);
  //     data.append("upload_preset", "chat-app");
  //     data.append("cloud_name", "darsh-cloud");
  //     fetch("https://api.cloudinary.com/v1_1/darsh-cloud/image/upload", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setEventPoster(data.url.toString());
  //         console.log(data.url.toString());
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     return;
  //   }
  // };
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = value;
    setFormData({ ...formData, [name]: newValue });

    const updatedTags = [...formData.event_tags];
    const updatedSpeakers = [...formData.speakers];

    if (name === "event_tags") {
      if (checked) {
        updatedTags.push(value); // Add the selected tag
      } else {
        const index = updatedTags.indexOf(value);
        if (index !== -1) {
          updatedTags.splice(index, 1); // Remove the deselected tag
        }
      }
    } else if (name === "speakers") {
      if (checked) {
        updatedSpeakers.push(value); // Add the selected speaker
      } else {
        const index = updatedSpeakers.indexOf(value);
        if (index !== -1) {
          updatedSpeakers.splice(index, 1); // Remove the deselected speaker
        }
      }
    }

    setFormData({
      ...formData,
      [name]: newValue,
      event_tags: updatedTags,
      speakers: updatedSpeakers,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  const toggleSpeakerDropdown = () => {
    setDropdownSpeakerOpen(!dropdownSpeakerOpen);
  };
  const handleAddCustomTag = () => {
    if (formData.customTag.trim() !== "") {
      const updatedTags = [...formData.event_tags, formData.customTag]; // Add customTag to the tags array
      setFormData({ ...formData, event_tags: updatedTags, customTag: "" }); // Update formData and clear customTag
    }
  };
  const handleAddCustomSpeaker = () => {
    if (formData.external_speaker.trim() !== "") {
      const external_speaker = [
        ...formData.speakers,
        formData.external_speaker,
      ]; // Add customTag to the tags array
      setFormData({
        ...formData,
        speakers: external_speaker,
        external_speaker: "",
      }); // Update formData and clear customTag
    }
  };

  const handleAddSocial_links = () => {
    if (formData.social_links.trim() !== "") {
      const social_links = [
        ...formData.socialmedia_links,
        formData.social_links,
      ]; // Add customTag to the tags array
      setFormData({
        ...formData,
        socialmedia_links: social_links,
        social_links: "",
      }); // Update formData and clear customTag
    }
  };

  const meetingModeOptions = [
    { value: "", label: "Select Meeting Mode" },
    { value: "Online", label: "Online" },
    { value: "Offline", label: "Offline" },
  ];

  const tagOptions = [
    // { value: "", label: "Select Tag" },
    { value: "Coding", label: "Coding" },
    {
      value: "Community building and planning",
      label: "Community building and planning",
    },
    { value: "Design", label: "Design" },
    { value: "Documentation", label: "Documentation" },
    { value: "Evangelizing & Teaching", label: "Evangelizing & Teaching" },
    {
      value: "Localization and translation",
      label: "Localization and translation",
    },
    { value: "Marketing", label: "Marketing" },
    { value: "Policy & Advocacy", label: "Policy & Advocacy" },
    { value: "Testing", label: "Testing" },
    { value: "User Support", label: "User Support" },
    // Add more tag options her
  ];
  const createEvent = async (options) => {
    const ProfilePicFile = new File(
      [formData.event_poster],
      "event_poster.jpg"
    );
    try {
      // console.log(formData);
      console.log(ProfilePicFile);
      const formData1 = new FormData();
      formData1.append("file", ProfilePicFile);
      const startTimeParts = formData.startTime.split(":");
      const endTimeParts = formData.endTime.split(":");
      const eventDateParts = formData.event_date.split("-"); // Assuming event_date is in "YYYY-MM-DD" format

      const startDateTime = new Date();
      startDateTime.setFullYear(parseInt(eventDateParts[0], 10)); // Set year
      startDateTime.setMonth(parseInt(eventDateParts[1], 10) - 1); // Set month (0-based index)
      startDateTime.setDate(parseInt(eventDateParts[2], 10)); // Set day
      startDateTime.setHours(parseInt(startTimeParts[0], 10)); // Set hours
      startDateTime.setMinutes(parseInt(startTimeParts[1], 10)); // Set minutes

      const endDateTime = new Date();
      endDateTime.setFullYear(parseInt(eventDateParts[0], 10)); // Set year
      endDateTime.setMonth(parseInt(eventDateParts[1], 10) - 1); // Set month (0-based index)
      endDateTime.setDate(parseInt(eventDateParts[2], 10)); // Set day
      endDateTime.setHours(parseInt(endTimeParts[0], 10)); // Set hours
      endDateTime.setMinutes(parseInt(endTimeParts[1], 10)); // Set minutes

      const response = await fetch(`${hostname}/event/update-event/${Id.id}`, {
        method: "PUT",
        headers: options,
        body: JSON.stringify({
          event_name: formData.event_name,
          event_description: formData.event_description,
          language: formData.language,
          event_date: formData.event_date,
          startTime: startDateTime,
          endTime: endDateTime,
          timeZone: formData.timeZone,
          event_type: formData.event_type,
          meet_link: formData.meet_link,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
          limit: formData.limit,
          socialmedia_links: formData.socialmedia_links,
          event_goals: formData.event_goals,
          event_tags: formData.event_tags,
          speakers: formData.speakers,
          pic: eventPoster,
        }), // Convert form data to JSON
      });

      if (response.ok) {
        const data = await response.json();
        toast("Event Created SuccessFully!", {
          position: "top-right",
          backgroundColor: "green",
        });
        console.log("Event created successfully:", data.Event);
        navigate(`/event/details/${Id.id}`, { replace: true });
        // Reset the form or perform any other actions
      } else {
        const errorData = await response.json();
        console.error("Failed to create event:", errorData.message);
        toast("Error Editing Event", {
          position: "top-right",
          backgroundColor: "red",
        });
        throw new Error(errorData.message);
        // Handle error or display an error message to the user
      }
    } catch (error) {
      toast("Error Editing event", {
        position: "top-right",
        backgroundColor: "red",
      });
      console.error("Error creating event:", error);
      // Handle network errors or other exceptions
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let options;

    // if (user && user.type === "user") {
    options = {
      "Content-type": "application/json",
      authorization: token1,
    };
    // } else {
    //   options = {
    //     authorization: localStorage.getItem("adminAuthToken"),
    //   };
    // }
    await createEvent(options); // Call the createEvent function to send the data to the server
  };

  return (
    <div className="event-registration-form">
      <div className="top_section"></div>
      <h1>Event Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="event">Event Name</label> {/* Updated label */}
          <input
            type="text"
            name="event_name"
            placeholder="Event name"
            defaultValue={formData.event_name}
            // value={formData.event_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          {/* <select
            name="language"
            // defaultValue={"English"}
            // value={formData.language}
            onChange={handleChange}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select> */}
          <input
            type="text"
            name="language"
            placeholder="Language"
            defaultValue={formData.language}
            // value={formData.event_name}
            onChange={handleChange}
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="eventImage">Event Image</label> 
          <input
            type="file"
            name="event_poster"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div> */}
        <div className="dates">
          <div className="form-group" id="SD">
            <label htmlFor="startDate">Event Date</label> {/* Updated label */}
            <input
              type="date"
              name="event_date"
              defaultValue={formData.event_date}
              // value={formData.event_date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="times">
          <div className="form-group" id="ST">
            <label htmlFor="startTime">Start Time</label> {/* Updated label */}
            <input
              type="time"
              name="startTime"
              defaultValue={formData.startTime}
              // value={formData.startTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" id="ET">
            <label htmlFor="endTime">End Time</label> {/* Updated label */}
            <input
              type="time"
              name="endTime"
              defaultValue={formData.endTime}
              // value={formData.endTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="timezone">Timezone</label>
          {/* <select
            name="timeZone"
            // defaultValue={}
            value={formData.timeZone}
            onChange={handleChange}
          >
            {timezoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select> */}
          <input
            type="text"
            name="timeZone"
            placeholder="TimeZone"
            defaultValue={formData.timeZone}
            // value={formData.event_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="meetingMode">Meeting Mode</label>
          <select
            name="event_type"
            value={formData.event_type}
            // defaultValue={}
            onChange={handleChange}
          >
            {meetingModeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {formData.event_type === "Online" && (
          <div className="form-group">
            <label htmlFor="meet_link">Meeting Link</label>{" "}
            {/* Updated label */}
            <input
              type="url"
              name="meet_link"
              placeholder="Meeting link"
              defaultValue={formData.meet_link}
              // value={formData.meet_link}
              onChange={handleChange}
            />
          </div>
        )}

        {formData.event_type === "Offline" && (
          <>
            <div className="form-group">
              <label htmlFor="address">Address</label> {/* Updated label */}
              <input
                type="text"
                name="address"
                placeholder="Address"
                defaultValue={formData.address}
                // value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              {/* <select name="city" value={formData.city} onChange={handleChange}>
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select> */}
              <input
                type="text"
                name="city"
                placeholder="City"
                defaultValue={formData.city}
                // value={formData.event_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">state</label>
              {/* <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select> */}
              <input
                type="text"
                name="state"
                placeholder="State"
                defaultValue={formData.state}
                // value={formData.event_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              {/* <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select> */}
              <input
                type="text"
                name="country"
                placeholder="Country"
                defaultValue={formData.country}
                // value={formData.event_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pin Code</label> {/* Updated label */}
              <input
                type="number"
                name="pincode"
                placeholder="Enter Zip Code/Pin Code of city"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="limit">Limit of Number of Attendees</label>{" "}
          {/* Updated label */}
          <input
            type="number"
            name="limit"
            placeholder="Enter limit"
            defaultValue={formData.limit}
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="form-group">
            <label>Social Media Links:</label>
            <div className="custom-tag-input">
              <input
                type="text"
                name="social_links"
                value={formData.social_links}
                onChange={handleChange}
              />
              <button type="button" onClick={handleAddSocial_links}>
                Add
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Given Social media links:</label>
            <textarea
              readOnly
              defaultValue={formData.socialmedia_links.join(", ")}
              // value={formData.socialmedia_links.join(", ")}
              rows={"1"}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="event_goals">Event Goals</label> {/* Updated label */}
          <textarea
            name="event_goals"
            placeholder="Enter event goals"
            value={formData.event_goals}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDescription">Event Description</label>
          <textarea
            name="event_description"
            placeholder="Enter event description"
            value={formData.event_description}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="event_tags">Event Tags</label> {/* Updated label */}
            <div className={`dropdown ${dropdownOpen ? "open" : ""}`}>
              <div
                className={`checkbox-dropdown ${
                  dropdownOpen ? "is-active" : ""
                }`}
                onClick={toggleDropdown}
              >
                Select Tags
                <ul
                  className="checkbox-dropdown-list"
                  onClick={stopPropagation}
                >
                  <li>
                    <div className="custom-tag-input">
                      <input
                        type="text"
                        name="customTag"
                        value={formData.customTag}
                        onChange={handleChange}
                      />
                      <button type="button" onClick={handleAddCustomTag}>
                        Add
                      </button>
                    </div>
                  </li>
                  <li>
                    {tagOptions.map((option) => (
                      <label key={option.value}>
                        <input
                          type="checkbox"
                          name="event_tags"
                          value={option.label}
                          defaultChecked={formData.event_tags.includes(
                            option.value
                          )}
                          checked={formData.event_tags.includes(option.value)}
                          onChange={handleChange}
                        />
                        {option.label}
                      </label>
                    ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Selected Tags:</label>
            <textarea
              readOnly
              value={formData.event_tags.join(", ")}
              rows={"1"}
            />
          </div>
        </div>

        <div>
          {user && user.type === "admin" ? (
            <div>
              <div className="form-group">
                <label htmlFor="speakers">Speakers</label>
                <div
                  className={`dropdown ${dropdownSpeakerOpen ? "open" : ""}`}
                >
                  <div
                    className={`checkbox-dropdown ${
                      dropdownSpeakerOpen ? "is-active" : ""
                    }`}
                    onClick={toggleSpeakerDropdown}
                  >
                    Select Speaker
                    <ul
                      className="checkbox-dropdown-list"
                      onClick={stopPropagation}
                    >
                      <li>
                        <div className="custom-tag-input">
                          <input
                            type="text"
                            name="external_speaker"
                            // value={formData.external_speaker}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            onClick={handleAddCustomSpeaker}
                          >
                            Add
                          </button>
                        </div>
                      </li>
                      <li>
                        {speakerOptions.map((speaker) => (
                          <label key={speaker._id}>
                            <input
                              type="checkbox"
                              name="speakers"
                              value={speaker._id}
                              defaultChecked={formData.speakers.includes(
                                speaker._id
                              )}
                              onChange={handleChange}
                            />
                            {speaker.name}
                          </label>
                        ))}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Selected Speakers:</label>
                <textarea
                  readOnly
                  value={formData.speakers.join(", ")}
                  rows={"1"}
                />
              </div>
            </div>
          ) : (
            // Render custom add functionality for non-admin users here
            <div>
              <div className="form-group">
                <label>Add a Speaker</label>
                <div className="custom-tag-input">
                  <input
                    type="text"
                    name="external_speaker"
                    value={formData.external_speaker}
                    onChange={handleChange}
                  />
                  <button type="button" onClick={handleAddCustomSpeaker}>
                    Add
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Custom Speakers:</label>
                <textarea
                  readOnly
                  value={formData.speakers.join(", ")}
                  rows={"1"} // You can adjust the number of rows as needed
                />
              </div>
            </div>
          )}
        </div>
        {/* Add more form fields for other input types */}

        <div className="form-group">
          <label htmlFor="agreement">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleCheckboxChange}
            />
            I agree to the community guidelines
          </label>
        </div>

        <button type="submit">
          Create Event
          <ToastContainer />
        </button>
      </form>
    </div>
  );
}

export default EventEditForm;
