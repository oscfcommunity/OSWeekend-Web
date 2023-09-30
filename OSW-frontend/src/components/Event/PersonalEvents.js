import React, { useEffect, useState } from "react";
import "./Events.css";
import Meetup from "../home-comp/Meetup";
import Navbar from "../Navbar";
import Footer from "../Footer";
import SecFooter from "../SecFooter";
import { hostname } from "../../hostname";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const PersonalEvents = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [events, setEvents] = useState([]);
  const rowsPerPageOptions = [5, 10, 15]; // Customize the rows per page options as needed
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };
  const prev = <i className="fa-solid fa-less-than"></i>;
  const next = (
    <i className="fa-solid fa-greater-than" style={{ paddingLeft: "8px" }}></i>
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination calculation
  const totalEvents = events.length;
  const totalPages = Math.ceil(totalEvents / rowsPerPage);
  const indexOfLastEvent = currentPage * rowsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - rowsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the JWT token from wherever you have stored it (e.g., localStorage)
    const getUser = async () => {
      if (localStorage.getItem("userAuthToken")) {
        const token = localStorage.getItem("userAuthToken");

        if (token) {
          console.log(token);
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
  const handleSort = () => {
    const sortedEvents = [...events].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setEvents(sortedEvents);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSeeMoreClick = (event) => {
    console.log(event._id);
    navigate(`/event/details/${event._id}`);
  };
  const handleEditClick = (event) => {
    console.log(event._id);
    navigate(`/events/edit-Event/${event._id}`);
  };
  const handleDeleteClick = (eventId) => {
    // Make an HTTP DELETE request to delete the event
    fetch(`${hostname}/event/delete-event/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminAuthToken"), // Replace with your access token if needed
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the successful response
        console.log("Event deleted successfully:", data);
        fetchData();
        // Add any further actions you want to take upon successful deletion
      })
      .catch((error) => {
        // Handle errors during the fetch
        console.error("Error deleting event:", error);
      });
  };

  const fetchData = async (options) => {
    try {
      const response = await fetch(`${hostname}/personal-events`, {
        method: "GET",
        headers:options,
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
    let options;

    if (user && user.type === "user") {
      console.log(localStorage.getItem("userAuthToken"));
      options = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("userAuthToken"),
      };
    } else {
      options = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminAuthToken"),
      };
    }
    fetchData(options); // Call the fetchData function when the component mounts
  }, [user]);

  return (
    <div className="eventpg">
      <Navbar />
      <div className="eventpg-intro">
        {/* <div className='eventpg-con'>
      <b><p className="eventpg-head">Our <span style={{ color: '#0E8388' }}>Events</span></p></b>
      <p className='eventpg-text'>Questions? Please contact <span style={{ color: '#0E8388' }}>connectwithaurapp@gmail.com</span></p>
      </div> */}
      </div>
      <div className="past-events">
        <p className="past-events-title">Directory of past events</p>
        <p className="past-events-text">
          Events are listed in reverse chronological order by date.
        </p>
        <table className="event-table">
          <thead>
            <tr>
              <th>
                <span onClick={handleSort}>
                  Event Name
                  {sortOrder === "asc" ? " ↓" : " ↑"}
                </span>
              </th>
              <th>Date</th>
              <th>Type</th>
              <th>See More</th>
              <th>Edit Project</th>
              {user && user.type === "admin" && (
                <>
                  <th>Delete Project</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event) => (
              <tr key={event._id}>
                <td>{event.event_name}</td>
                <td>{event.event_date}</td>
                <td>{event.event_type}</td>
                <td>
                  {/* <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  > */}
                  <i
                    onClick={() => handleSeeMoreClick(event)}
                    className="fa-solid fa-eye"
                    style={{
                      fontSize: "25px",
                      color: "#5a5e63",
                      paddingLeft: "20px",
                    }}
                  ></i>

                  {/* </button> */}
                </td>
                <td className="edit-project-buttons">
                  <div className="editprojectbutton">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(event)}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="edit"
                      ></FontAwesomeIcon>
                    </button>
                  </div>
                </td>
                {user && user.type === "admin" && (
                  <>
                    <td className="delete-project-buttons">
                      <div className="deleteprojectbutton">
                        <button
                          className="btn btn-primary"
                          onClick={(e) => handleDeleteClick(event._id)}
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
              <td colSpan="4">
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
                        <option key={option} value={option}>
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
                    <p style={{ fontSize: "13px", paddingTop: "5px" }}>
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
      </div>
      <p className="eventpg-text">
        <span style={{ color: "#0E8388", fontSize: "30px", fontWeight: "500" }}>
          Questions?
        </span>
        <br /> Please contact{" "}
        <span style={{ color: "#0E8388" }}>connectwithaurapp@gmail.com</span>
      </p>
      <Footer />
      <SecFooter />
    </div>
  );
};

export default PersonalEvents;
