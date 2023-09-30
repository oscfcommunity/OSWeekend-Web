import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <footer>
      <div className="footer-con">
        <div className="follow">
          <span>
            <p className="footer-head">Follow Us:
            <a href="https://www.facebook.com/OSWeekend/" target="_blank">
              <i
                className=" fa fa-brands fa-facebook-f fa-sm mx-3"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
            <a href="https://x.com/OSWeekend?t=vdey0igVTb1qNwUGe40xSw&s=08" target="_blank">
              <i
                className="fa fa-brands fa-twitter fa-lg"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
            <a href="https://www.instagram.com/osweekend/" target="_blank">
              <i
                className="fa fa-brands fa-instagram fa-lg mx-3"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
            <a href="https://github.com/oscf-io/OSWeekend#open-source-weekend-osw" target="_blank">
              <i
                className="fa fa-brands fa-github fa-lg"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
            <a href="https://www.linkedin.com/company/open-source-weekend/" target="_blank">
              <i
                className="fa fa-brands fa-linkedin fa-lg mx-3"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
            {/* <a href="https://youtube.com" target="_blank">
              <i
                className="fa fa-brands fa-youtube fa-lg"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a> */}
            {/* <a href="https://medium.com" target="_blank">
              <i
                className="fa fa-brands fa-medium fa-lg mx-3"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a> */}
            </p>
          </span>
        </div>
       </div>
       <div className="footer1 ">
        <div className="pair-1">
        <div className="about">
          <span className="aboutHeading">About</span>
          <span className="aboutText">
            <p>
              <a href="https://github.com/oscf-io">Open Source Community Foundation </a> <br />
              <a href="https://github.com/oscf-io/CloudCaptain">Cloud Captain</a> <br />
              {/* <a href="https://developers.google.com/programs/community/gdg/">
                Google Developers Groups
              </a> */}
            </p>
          </span>
         </div>
         <div className="resources">
          <span className="resourcesHeading">Resources</span>
          <span className="resourcesText">
            <p>
              <a href="/">Become a Sponsor </a> <br />
              <a href="/">Some Link Name</a>
            </p>
          </span>
         </div>
         </div>
  
          <div className="pair-2">
            
            <div className="developerConsole">
          <span className="developerConsoleHeading">Open Source Weekend</span>
          <span className="developerConsoleText">
            <p>
              <a href="/">Code of Conduct </a> <br />
              <a href="/">Terms and Services</a> <br />
              <a href="/">Community Guidelines</a>
            </p>
          </span>
          </div>
     
          </div>
      </div>
    </footer>
  );
}
