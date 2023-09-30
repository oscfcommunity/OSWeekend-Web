import React, { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../img/logo1.png";
import profile_img from "../img/profile-img.jpg";
import "./Navbar.css";
// import { Padding } from "@mui/icons-material";
// import ModalForm from "./ModalForm";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NotificationsPanel from "./Notification/notificationPanel";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(profile_img);
  const [showNotifications, setShowNotifications] = useState(false);
  const [panelClosing, setPanelClosing] = useState(false);
  const navigateToChat = () => {
    navigate("/chat");
  };
  const toggleNotifications = () => {
    if (showNotifications) {
      // Start the panel closing transition
      setPanelClosing(true);
      // Delay hiding the panel until the transition is complete
      setTimeout(() => {
        setShowNotifications(false);
        setPanelClosing(false); // Reset panel closing state
      }, 300); // Adjust the delay time to match your transition duration (0.3s in this case)
    } else {
      setShowNotifications(true);
    }
  };
  const dropdown = () => {
    setIsOpen(!isOpen);
  };
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
            console.log(payload);
            setUserId(payload._id);
            setUser(payload);
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
            console.log(payload);
            setUserId(payload._id); // Set user state with decoded data
            setUser(payload); // Set user state with decoded data
          } catch (error) {
            // Handle decoding error (e.g., token is invalid)
            console.error("Error decoding JWT token:", error);
          }
        }
      }
    };
    getUser();
  }, []);
  useEffect(() => {
    const fetchPic = async () => {
      console.log(userId);
      try {
        const response = await fetch(
          `http://localhost:4000/user/profile-pic/${userId}`
        );

        const res = await response.json();
        console.log(res);
        setSelectedImage(res.LogoURL);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId && userId !== "" && user.type === "user") {
      fetchPic();
    }
  }, [userId]);
  const handleLogoutClick = () => {
    // Handle the "Logout" action here
    if (localStorage.getItem("userAuthToken")) {
      localStorage.removeItem("userAuthToken");
      navigate("/login", { replace: true });
    } else {
      localStorage.removeItem("adminAuthToken");
      navigate("/adminLogin", { replace: true });
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    // Add or remove the 'menu-open' class to the body based on menuOpen state
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeNavbar = (event) => {
      // Check if the clicked element is part of the navbar
      if (!event.target.closest(".nav")) {
        setMenuOpen(false);
      }
    };

    // Add the click event listener to the document
    document.addEventListener("click", closeNavbar);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", closeNavbar);
    };
  }, []);
  const viewProfile = () => {
    navigate("/profile");
  };
  const login = () => {
    navigate("/login");
  };
  const AddAdmin = () => {
    navigate("/admin/add-admin");
  };
  const DeleteUser = () => {
    navigate("/admin/user-list");
  };
  const DeleteAdmin = () => {
    navigate("/admin/admin-list");
  };
  return (
    <nav className={`nav ${menuOpen ? "open" : ""}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>
      <div className="logo-img">
        <Link to="/" id="site-title">
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "45px",
              width: "120px",
              margin: "0px",
              objectFit: "fill",
            }}
          />
        </Link>
      </div>
      <div className="icons">
        <span className="icons-nav">
          <i class="fa-regular fa-comment-dots"></i>
        </span>
        <span className="icons-nav">
          <i class="fa-solid fa-bell"></i>
        </span>
        {/* <div><img className="profile-img-nav" src={profile_img} alt="" /></div> */}
        <div className="profile-div-nav" onClick={dropdown}>
          <img
            className="profile-img"
            src={selectedImage ? selectedImage : profile_img}
            alt=""
          />{" "}
        </div>
        {isOpen && (
          <ul className="dropdown-menu">
            {user ? (
              <>
                {user.type === "admin" ? (
                  <>
                    <li style={{ marginTop: "10px" }} onClick={DeleteUser}>
                      <i
                        className="fa-solid fa-user"
                        style={{ padding: "0", marginRight: "10px" }}
                      ></i>
                      User List
                    </li>
                    {user.superadmin === true && (
                      <>
                        <li style={{ marginTop: "10px" }} onClick={AddAdmin}>
                          <i
                            className="fa-solid fa-user"
                            style={{ padding: "0", marginRight: "10px" }}
                          ></i>
                          Add Admin
                        </li>
                        <li style={{ marginTop: "10px" }} onClick={DeleteAdmin}>
                          <i
                            className="fa-solid fa-user"
                            style={{ padding: "0", marginRight: "10px" }}
                          ></i>
                          Admin List
                        </li>
                      </>
                    )}
                  </>
                ) : (
                  <li style={{ marginTop: "10px" }} onClick={viewProfile}>
                    <i
                      className="fa-solid fa-user"
                      style={{ padding: "0", marginRight: "10px" }}
                    ></i>
                    View Profile
                  </li>
                )}
                <li
                  style={{ marginBottom: "10px" }}
                  onClick={handleLogoutClick}
                >
                  <i
                    className="fa-solid fa-arrow-right-from-bracket"
                    style={{ padding: "0", marginRight: "10px" }}
                  ></i>
                  Logout
                </li>
              </>
            ) : (
              <li style={{ marginTop: "10px" }} onClick={login}>
                <i
                  className="fa-solid fa-user"
                  style={{ padding: "0", marginRight: "10px" }}
                ></i>
                Login
              </li>
            )}
          </ul>
        )}
      </div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <img
          src={logo}
          className="logo-img2"
          alt="Logo"
          style={{
            height: "45px",
            width: "120px",
            margin: "0 10px",
            objectFit: "fill",
          }}
        />
        <hr />
        <CustomLink to="/" onClick={closeMenu}>
          <span className="nav-icons">
            <i className="fa-solid fa-house" style={{ color: "#5a5e63" }}></i>
          </span>
          Home
        </CustomLink>
        <CustomLink to="/events" onClick={closeMenu}>
          <span className="nav-icons">
            <i
              className="fa-solid fa-calendar-check"
              style={{ color: "#5a5e63" }}
            ></i>
          </span>
          Events
        </CustomLink>
        <CustomLink to="/team" onClick={closeMenu}>
          <span className="nav-icons">
            <i className="fa-solid fa-user" style={{ color: "#5a5e63" }}></i>
          </span>
          Team
        </CustomLink>
        <CustomLink to="/speakers" onClick={closeMenu}>
          <span className="nav-icons">
            <i
              className="fa-solid fa-volume-up"
              style={{ color: "#5a5e63" }}
            ></i>
          </span>
          Speakers
        </CustomLink>
        <CustomLink to="/about" onClick={closeMenu}>
          <span className="nav-icons">
            <i
              className="fa-solid fa-address-card"
              style={{ color: "#5a5e63" }}
            ></i>
          </span>
          About
        </CustomLink>
        <CustomLink to="/contact" onClick={closeMenu}>
          <span className="nav-icons">
            <i
              className="fa-solid fa-comments"
              style={{ color: "#5a5e63" }}
            ></i>
          </span>
          Contact
        </CustomLink>
        <CustomLink to="/blogs" onClick={closeMenu}>
          <span className="nav-icons">
            <i className="fa-solid fa-blog" style={{ color: "#5a5e63" }}></i>
          </span>
          Blogs
        </CustomLink>
        <CustomLink to="/resourceLibrary" onClick={closeMenu}>
          <span className="nav-icons">
            <i
              className="fa-solid fa-photo-film"
              style={{ color: "#5a5e63" }}
            ></i>
          </span>
          Resource Library
        </CustomLink>
        {user && user.type === "user" && (
          <>
            <span className="icons-norm" onClick={navigateToChat}>
              <i className="fa-solid fa-comment-dots"></i>
            </span>
            <span className="icons-norm">
              <i class="fa-solid fa-bell" onClick={toggleNotifications}></i>
              {showNotifications && (
                <NotificationsPanel onClose={toggleNotifications} />
              )}
            </span>
          </>
        )}
        <div className="profile-div" onClick={dropdown}>
          <img
            className="profile-img"
            src={selectedImage ? selectedImage : profile_img}
            alt=""
          />{" "}
        </div>
        {isOpen && (
          <ul className="dropdown-menu">
            {user ? (
              <>
                {user.type === "admin" ? (
                  <>
                    <li style={{ marginTop: "10px" }} onClick={DeleteUser}>
                      <i
                        className="fa-solid fa-user"
                        style={{ padding: "0", marginRight: "10px" }}
                      ></i>
                      User List
                    </li>
                    {user.superadmin === true && (
                      <>
                        <li style={{ marginTop: "10px" }} onClick={AddAdmin}>
                          <i
                            className="fa-solid fa-user"
                            style={{ padding: "0", marginRight: "10px" }}
                          ></i>
                          Add Admin
                        </li>
                        <li style={{ marginTop: "10px" }} onClick={DeleteAdmin}>
                          <i
                            className="fa-solid fa-user"
                            style={{ padding: "0", marginRight: "10px" }}
                          ></i>
                          Admin List
                        </li>
                      </>
                    )}
                  </>
                ) : (
                  <li style={{ marginTop: "10px" }} onClick={viewProfile}>
                    <i
                      className="fa-solid fa-user"
                      style={{ padding: "0", marginRight: "10px" }}
                    ></i>
                    View Profile
                  </li>
                )}
                <li
                  style={{ marginBottom: "10px" }}
                  onClick={handleLogoutClick}
                >
                  <i
                    className="fa-solid fa-arrow-right-from-bracket"
                    style={{ padding: "0", marginRight: "10px" }}
                  ></i>
                  Logout
                </li>
              </>
            ) : (
              <li style={{ marginTop: "10px" }} onClick={login}>
                <i
                  className="fa-solid fa-user"
                  style={{ padding: "0", marginRight: "10px" }}
                ></i>
                Login
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
