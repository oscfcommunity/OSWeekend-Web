import React, { useEffect, useState } from "react";
import "./EventsPage.css";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar";
import { hostname } from "../../hostname";

const EventsPage = (props) => {
  // const navigate = useNavigate();
  const [event, setEvent] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Add loading state
  const [user, setUser] = useState(null);
  const [regisered, setRegistered] = useState(false);
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
            console.log(payload);
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
      }
    };
    getUser();
    // console.log(user.type);
  }, []);

  const convertDate = (date) => {
    const originalDate = new Date(date); // Parse the original date string
    const year = originalDate.getFullYear(); // Get the year
    const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Get the month (adding 1 because months are zero-based)
    const day = String(originalDate.getDate()).padStart(2, "0"); // Get the day

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate); // Output: "2023-09-23"
    return formattedDate;
  };
  const RegisterForEvent = async () => {
    console.log(1);
    try {
      const response = await fetch(`${hostname}/event/attend-event/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("userAuthToken"), // Replace with your authorization token
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Successfully registered for the event:", data.message);
        fetchData();
      } else {
        console.error("Failed to register for the event:", data.message);
      }
    } catch (error) {
      console.error("Error registering for the event:", error.message);
    }
  };

  const convertTime = (time) => {
    const inputDate = new Date(time);

    const hours = String(inputDate.getUTCHours()).padStart(2, "0"); // Extract hours and pad with 0 if needed
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, "0"); // Extract minutes and pad with 0 if needed

    const formattedTime = `${hours}:${minutes}`;
    console.log(formattedTime); // Outputs: "00:00"
    return formattedTime;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${hostname}/event/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.eventData);
        setEvent(data.eventData);
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
  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  if (loading) {
    // While loading, you can show a loading indicator or message
    return <div>Loading...</div>;
  }
  // const handleClick = () => {
  //   navigate("/events");
  // };
  return (
    <>
      <Navbar />
      <div className="events-page">
        <div className="eve-img-con">
          <div className="eve-img">
            <div className="eve-txt-con">
              <p className="eve-head">{event.event_name}</p>
              {event.hosted_by_user ? (
                <p className="eve-txt-1">{event.hosted_by_user}</p>
              ) : (
                <p className="eve-txt-1">{event.hosted_by_admin}</p>
              )}

              <p className="eve-txt-2">{convertDate(event.event_date)}</p>
            </div>
          </div>
        </div>
        <div className="eve-body">
          <div className="eve-details">
            <div className="eve-det-tit">
              <b>
                <p>{event.event_name} Details</p>
              </b>
            </div>
            <div className="eve-det-txt">
              <p>{event.event_description}</p>
            </div>
            <div id="rounded-grey-div-lg">
              <a
                className="div-link-eve"
                href="https://twitter.com/i/flow/login?redirect_after_login=%2Fhashtag%2FWTMJalandhar"
              >
                #DevFest 2021
              </a>
            </div>
            <div className="eve-det-det">
              <p>
                <b>Date:</b> {convertDate(event.event_date)}
              </p>
              <p>
                <b>Time:</b> {convertTime(event.startTime)} -{" "}
                {convertTime(event.endTime)}
              </p>
              <p>
                <b>Type:</b> {event.event_type}
              </p>
              {event.event_type === "Online" ? (
                <p>
                  <b>Meet_link:</b> {event.meet_link}
                </p>
              ) : (
                <p>
                  <b>Address:</b> {event.address}
                  <br />
                  <b>Location:</b> {event.location.city}, {event.location.state}
                  , {event.location.country}-{event.location.pincode}
                </p>
              )}
              <p>
                <b>Event Goals:</b> {event.event_goals}
              </p>
              <p>
                <b>Event Tags:</b> {event.event_tags.join(", ")}
              </p>
              <p>
                <b>Limit:</b> {event.limit}
              </p>
              <p>
                <b>Speakers:</b> {event.speakers.join(", ")}
              </p>
              <p>
                <b>Total Attendees:</b> {event.total_attendees}
              </p>
            </div>

            <div className="eve-det-btn">
              {user && (
                <>
                  {event.hosted_by_user !== user.name && (
                    <button
                      className="btn btn-primary custom-btn1"
                      onClick={
                        !event.attendees.includes(user._id)
                          ? RegisterForEvent
                          : null
                      }
                    >
                      <p className="btn-text">
                        {!event.attendees.includes(user._id)
                          ? "REGISTER"
                          : "REGISTERED"}
                      </p>
                    </button>
                  )}
                </>
              )}

              {/* <button className="btn btn-secondary custom-btn2 ">
                <p className="btn-text">MEETUP</p>
              </button> */}
              {/* <button className="btn btn-success custom-btn3">
                <p className="btn-text">CALL FOR SPEAKERS</p>
              </button> */}
              <button className="btn btn-danger custom-btn4">
                <p className="btn-text">FACEBOOK</p>
              </button>
              <button className="btn btn-warning custom-btn5">
                <p className="btn-text">FEEDBACK</p>
              </button>
              <button className="btn btn-info custom-btn6">
                <p className="btn-text">YOUTUBE LIVE</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
