import React, { useEffect, useState } from "react";
import "./TeamTile.css";
import TruncateText from "../TruncateText";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function TeamTile({ team, onDelete }) {
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
            console.log(payload.type);
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
  const generateLinkIcon = (link) => {
    // Determine the icon based on the link
    // ... Your existing icon logic
    if (link.includes("twitter")) {
      return <i className="fa fa-brands fa-twitter fa-2xs"></i>;
    } else if (link.includes("linkedin")) {
      return <i className="fa fa-brands fa-linkedin fa-2xs"></i>;
    } else if (link.includes("facebook")) {
      return <i className="fa fa-brands fa-facebook fa-2xs"></i>;
    } else if (link.includes("github")) {
      return <i className="fa fa-brands fa-github fa-2xs"></i>;
    } else if (link.includes("medium")) {
      return <i className="fa fa-brands fa-medium fa-2xs"></i>;
    } else if (link.includes("gmail")) {
      return <i className="fa fa-envelope fa-2xs"></i>;
    } else if (link.includes("youtube")) {
      return <i className="fa fa-brands fa-youtube fa-2xs"></i>;
    } else if (link.includes("instagram")) {
      return <i className="fa fa-brands fa-instagram fa-2xs"></i>;
    }
  };
  return (
    // <div className="teamTile">
    <Link
      to={{
        pathname: `/team-member/details/${team._id}`,
        state: { data: team },
      }}
      className="Team"
    >
      {user && user.type === "admin" && (
        <button className="deleteteam-icon" onClick={onDelete}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            // className="delete-icon"
          />
        </button>
      )}
      <img className="teamimg" src={team.pic} alt="" />
      <TruncateText text={team.name} maxChars={20} />
      <TruncateText text={team.post} maxChars={20} />
      <div className="teamlinkss">
        <div className="teamlinks">
          {team.social_links.map((link, index) => (
            <a
              key={index}
              className="links"
              href={`https://${link}`}
            >
              {generateLinkIcon(link)}
            </a>
          ))}
        </div>
      </div>{" "}
    </Link>
  );
}
