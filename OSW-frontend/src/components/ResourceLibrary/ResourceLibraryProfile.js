import React from "react";
import "./ResourceLibraryProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDocker, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function ResourceLibraryProfile(props) {
  const hasDockerLink = Array.isArray(props.projectlinksInputs) && props.projectlinksInputs.includes("docker");
  const hasGithubLink = Array.isArray(props.projectlinksInputs) && props.projectlinksInputs.includes("github");

  return (
    <div className="projectProfilepage">
      <div className="projectprofile">
        <div className="projectinfo">
            <h4 className="projectprofilename">Project Name</h4>
            {props.projectname}
            <h4 className="projectprofiledesc">Project Description</h4>
            {props.projectdesc}

            <h4 className="projectprofilelinks">Project Links</h4>
            {hasDockerLink && (
              <FontAwesomeIcon icon={faDocker} className="docker" />
            )}
            {hasGithubLink && (
              <FontAwesomeIcon icon={faGithub} className="github" />
            )}

            <h4 className="projectprofiletags">Project Tags</h4>
            {props.projecttags}{" "}
        </div>
      </div>
    </div>
  );
}
