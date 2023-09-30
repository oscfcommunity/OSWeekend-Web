import React, { useEffect, useState } from "react";
import "./SpeakersTile.css";
import TruncateText from "../TruncateText";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
export default function SpeakersTile({ speaker, onDelete }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("userAuthToken")) {
        const token = localStorage.getItem("userAuthToken");

        if (token) {
          try {
            const tokenParts = token.split(".");

            const payload = JSON.parse(atob(tokenParts[1]));
            console.log(payload.type);
            setUser(payload); // Set user state with decoded data
          } catch (error) {
            console.error("Error decoding JWT token:", error);
          }
        }
      } else {
        const token = localStorage.getItem("adminAuthToken");
        if (token) {
          try {
            const tokenParts = token.split(".");

            const payload = JSON.parse(atob(tokenParts[1]));
            console.log(payload.type);
            setUser(payload); // Set user state with decoded data
          } catch (error) {
            console.error("Error decoding JWT token:", error);
          }
        }
      }
    };
    getUser();
  }, []);
  const generateLinkIcon = (link) => {
    if (link.includes("twitter")) {
      return <i className="fa fa-brands fa-twitter fa-2xs"></i>;
    } else if (link.includes("linkedin")) {
      return <i className="fa fa-brands fa-linkedin fa-2xs"></i>;
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
    } else if (link.includes("facebook")) {
      return <i className="fa fa-brands fa-facebook fa-2xs"></i>;
    } else {
      return <i className="fa fa-brands fa-link mx fa-2xs"></i>;
    }
  };

  return (
    <Link
      to={{
        pathname: `/speaker/details/${speaker._id}`,
        state: { data: speaker },
      }}
      className="Team"
    >
      {user && user.type === "admin" && (
        <button className="deletespeaker-icon" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      )}
      <img className="speakertilespeakerimg" src={speaker.pic} alt="hsbd" />
      <TruncateText text={speaker.name} maxChars={20} />
      <TruncateText text={speaker.university} maxChars={20} />
      <div className="teamlinks">
        <div className="teamlinks">
          {speaker.social_links.map((link, index) => (
            <a
              key={index}
              className="links"
              href={`https://${link}`}
            >
              {generateLinkIcon(link)}
            </a>
          ))}
        </div>
      </div>
    </Link>
  );
}
