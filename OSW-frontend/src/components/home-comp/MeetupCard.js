import React, { useEffect, useState } from "react";
import "./MeetupCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MeetupCard = ({ event, onDelete }) => {
  // console.log(event);

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
            // console.log(payload.type);
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
  const convertDate = (date) => {
    const originalDate = new Date(date); // Parse the original date string
    const year = originalDate.getFullYear(); // Get the year
    const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Get the month (adding 1 because months are zero-based)
    const day = String(originalDate.getDate()).padStart(2, "0"); // Get the day

    const formattedDate = `${year}-${month}-${day}`;
    // console.log(formattedDate); // Output: "2023-09-23"
    return formattedDate;
  };
  return (
    <Link
      to={{ pathname: `/event/details/${event._id}`, state: { data: event } }}
      className="card-con"
    >
      {user && user.type === "admin" && (
        <button className="deleteevent-icon" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
          <ToastContainer />
        </button>
      )}
      <div className="card-text">
        <p className="date">{convertDate(event.event_date)}</p>
        <p className="event-name">{event.event_name}</p>
        <p className="mode">{event.event_type}</p>
      </div>
      <div className="card-text2">
        <p className="see-more">See More</p>
      </div>
    </Link>
  );
};

export default MeetupCard;
