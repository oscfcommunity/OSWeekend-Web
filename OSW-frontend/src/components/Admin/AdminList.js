import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import SecFooter from "../SecFooter";
import "./User.css";
import { hostname } from "../../hostname";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  // const [sortOrder, setSortOrder] = useState("asc");
  const [user, setUsers] = useState([]);
  const [adminId, setAdminId] = useState();
  const rowsPerPageOptions = [5, 10, 15]; // Customize the rows per page options as needed
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
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
  useEffect(() => {
    // Get the JWT token from wherever you have stored it (e.g., localStorage)
    const getUser = async () => {
      const token = localStorage.getItem("adminAuthToken");
      if (token) {
        try {
          const tokenParts = token.split(".");
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log(payload.type);
          setAdminId(payload._id); // Set user state with decoded data
        } catch (error) {
          console.error("Error decoding JWT token:", error);
        }
      }
    };
    getUser();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${hostname}/admins`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("adminAuthToken"),
          // Add any additional headers you need (e.g., authentication headers)
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Users data:", data.users);
      setUsers(data.admins);
      // Process the data as needed
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${hostname}/delete/admin/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("adminAuthToken"), // Add your authentication token here
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast("Error Deleting the Admin!", {
          position: "top-right",
          backgroundColor: "red",
        });
        throw new Error(data.message);
      }

      console.log("User deleted successfully:", data.message);
      fetchUsers();
      // Handle success here
    } catch (error) {
      toast(error, {
        position: "top-right",
        backgroundColor: "green",
      });
      console.error("Error deleting user:", error);
      // Handle error here
    }
  };
  // Pagination calculation
  const totalEvents = user.length;
  const totalPages = Math.ceil(totalEvents / rowsPerPage);
  const indexOfLastEvent = currentPage * rowsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - rowsPerPage;
  const currentEvents = user.slice(indexOfFirstEvent, indexOfLastEvent);

  // const handleSort = () => {
  //   const sortedEvents = [...user].sort((a, b) => {
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

  //   setUsers(sortedEvents);
  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  // };

  return (
    <div className="eventpg">
      <Navbar />
      <div className="eventpg-intro"></div>
      <div className="past-events">
        <p className="past-events-title">Admin List</p>
        <table className="event-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Super Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                {user.superadmin ? <td>Yes</td> : <td>No</td>}
                {adminId !== user._id && (
                  <td className="delete-project-buttons">
                    <div className="deleteprojectbutton">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => deleteUser(user._id)}
                        style={{ marginLeft: "-6.5  vw" }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="trash"
                        ></FontAwesomeIcon>
                        <ToastContainer />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}

            <tr>
              <td colSpan="10">
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
      </div>
      <Footer />
      <SecFooter />
    </div>
  );
};

export default Admin;
