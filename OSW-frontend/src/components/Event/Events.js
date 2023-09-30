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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Events = () => {
  // const [sortOrder, setSortOrder] = useState("asc");
  const [events, setEvents] = useState([]);
  const [Token, setToken] = useState("");
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
  const [userData, setUserData] = useState(null);
  const convertDate = (date) => {
    const originalDate = new Date(date); // Parse the original date string
    const year = originalDate.getFullYear(); // Get the year
    const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Get the month (adding 1 because months are zero-based)
    const day = String(originalDate.getDate()).padStart(2, "0"); // Get the day

    const formattedDate = `${year}-${month}-${day}`;
    // console.log(formattedDate); // Output: "2023-09-23"
    return formattedDate;
  };
  function isDateGreaterThanTomorrow(date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date

    // Convert the input date to a Date object if it's not already
    const inputDate = new Date(date);

    if (inputDate > tomorrow) {
      // seteditable(true);
      return true;
    }
  }
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${hostname}/user/profile/${user._id}`);
        const data = await response.json();
        if (data.success) {
          setUserData(data.data);
        } else {
          console.log(data.message);
          throw new Error("Failed to Get Profile. Please Reload");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (user._id && user._id !== "") {
      fetchUserProfile();
    }
  }, [user]);
  useEffect(() => {
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
            setToken(token);
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
            setToken(localStorage.getItem("adminAuthToken"));
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
  // const handleSort = () => {
  //   const sortedEvents = [...events].sort((a, b) => {
  //     const nameA = a.name.toLowerCase();
  //     const nameB = b.name.toLowerCase();

  //     if (nameA < nameB) {
  //       return sortOrder === "asc" ? -1 : 1;
  //     }
  //     if (nameA > nameB) {
  //       return sortOrder === "asc" ? 1 : -1;
  //     }
  //     return 0;
  //   });

  //   setEvents(sortedEvents);
  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  // };

  const handleSeeMoreClick = (event) => {
    console.log(event._id);
    navigate(`/event/details/${event._id}`);
  };
  const handleEditClick = (event) => {
    console.log(event._id);
    navigate(`/events/edit-Event/${event._id}`, { state: { event } });
  };
  const handleCreateClick = () => {
    console.log(user, Token);
    navigate(`/events/create-Event`, { state: { user, Token } });
  };
  const handlePersonalEevntsClick = async () => {
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
    try {
      const response = await fetch(`${hostname}/personal-events`, {
        method: "GET",
        headers: options,
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
          toast("Error Deleting Event!", {
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
        toast("Event Deleted SuccessFully!", {
          position: "top-right",
          backgroundColor: "green",
        });
        fetchData();
        // Add any further actions you want to take upon successful deletion
      })
      .catch((error) => {
        // Handle errors during the fetch
        toast("Error Deleting event!", {
          position: "top-right",
          backgroundColor: "red",
        });
        console.error("Error deleting event:", error);
      });
  };

  const fetchData = async () => {
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
  }, []);
  const handleAllEevntsClick = () => {
    fetchData();
  };
  return (
    <div className="eventpg">
      <Navbar />
      <div className="eventpg-intro">
        {/* <div className='eventpg-con'>
      <b><p className="eventpg-head">Our <span style={{ color: '#0E8388' }}>Events</span></p></b>
      <p className='eventpg-text'>Questions? Please contact <span style={{ color: '#0E8388' }}>connectwithaurapp@gmail.com</span></p>
      </div> */}
        <div className="eventpg-meetup">
          <Meetup />
        </div>
      </div>
      <div className="past-events">
        <p className="past-events-title">Directory of past events</p>
        <p className="past-events-text">
          Events are listed in reverse chronological order by date.
        </p>
        {user && (
          <>
            <button
              className="all-events-button"
              onClick={handleAllEevntsClick}
            >
              All Events
            </button>
            <button
              className="personal-events-button"
              onClick={handlePersonalEevntsClick}
            >
              Personal Events
            </button>
          </>
        )}
        <table className="event-table">
          <thead>
            <tr>
              <th>
                {/* <span onClick={handleSort}> */}
                Event Name
                {/* {sortOrder === "asc" ? " ↓" : " ↑"} */}
                {/* </span> */}
              </th>
              <th>Date</th>
              <th>Type</th>
              <th>See More</th>
              {user && user.type === "admin" && (
                <>
                  <th>Edit Project</th>
                  <th>Delete Project</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event) => (
              <tr key={event._id}>
                <td>{event.event_name}</td>
                <td>{convertDate(event.event_date)}</td>
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
                {user && user.type === "admin" && (
                  <>
                    <td className="edit-project-buttons">
                      <div className="editprojectbutton">
                        {isDateGreaterThanTomorrow(event.event_date) ? (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEditClick(event)}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="edit"
                            ></FontAwesomeIcon>
                          </button>
                        ) : (
                          <span>Can not Edit</span>
                        )}
                      </div>
                    </td>
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
                          <ToastContainer />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}

            <tr>
              <td
                colSpan="10"
                style={{
                  backgroundColor: "white",
                  borderColor: "white",
                  borderStyle: "none",
                }}
              >
                <div className="event-pagination">
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
                    <p style={{ fontSize: "13px", paddingTop: "10px" }}>
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
        {user && (
          <>
            {userData.profile.first_name &&
            userData.profile.last_name &&
            userData.profile.profile_pic ? (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss
                  onClick={handleCreateClick}
                >
                  Create Event
                </button>
              </div>
            ) : (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Create Event
                </button>
              </div>
            )}
          </>
        )}
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

export default Events;
