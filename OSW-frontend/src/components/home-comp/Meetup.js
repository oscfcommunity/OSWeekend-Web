import React, { useEffect, useState } from "react";
import "./Meetup.css";
import MeetupCard from "./MeetupCard";
import { hostname } from "../../hostname";
// import EventsPage from "../EventsPage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Meetup = () => {
  const [events, setEvents] = useState([]);
  const isDeleteEnabled = true;

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const response = await fetch(`${hostname}/events`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setEvents(data.eventsData);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch events:", errorData);
        // Handle the error or display an error message to the user
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      // Handle the error or display an error message to the user
    }
  };
  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
    console.log("Component mounted");
  }, []);

  const handleDelete = async (e, Id) => {
    // Make an HTTP DELETE request to delete the event
    if (isDeleteEnabled) {
      console.log(isDeleteEnabled);
      e.preventDefault();
      fetch(`${hostname}/event/delete-event/${Id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("adminAuthToken"), // Replace with your access token if needed
        },
      })
        .then((response) => {
          if (!response.ok) {
            toast("Error Occured!", {
              position: "top-right",
              backgroundColor: "red",
            });
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle the successful response
          console.log("Event deleted successfully:", data);
          toast("Event deleted SuccessFully!", {
            position: "top-right",
            backgroundColor: "green",
          });
          fetchData();
          // Add any further actions you want to take upon successful deletion
        })
        .catch((error) => {
          // Handle errors during the fetch
          console.error("Error deleting event:", error);
        });
    }
  };
  return (
    <div className="meetup-con">
      <div className="meetup-content">
        <b>
          <p className="meetup-head">
            Our <span style={{ color: "#0E8388" }}>Feature Event</span> &{" "}
            <span style={{ color: "#0E8388" }}>Meetup</span>
          </p>
        </b>
        <p> Events are listed in reverse chronological order by date.</p>
        <div className="display-card">
          <div className="meet-p1">
            {events.map((event) => (
              <>
                {event.hosted_by_admin && (
                  <MeetupCard
                    // id={event._id}
                    // date={event.event_date}
                    // event={event.event_name}
                    // mode={event.event_type}
                    event={event}
                    onDelete={(e) => handleDelete(e, event._id)}
                  />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetup;
