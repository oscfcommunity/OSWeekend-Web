import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Contact.css";
import sideImg from "../img/contact.svg";
// import { Tooltip, IconButton } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
import SecFooter from "./SecFooter";

function Contact() {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <div className="side1 side">
        <p style={{fontSize: "38px", fontWeight: "600", fontFamily: '"Open Sans", sans-serif;'}}>
           How to Get <span style={{ color: "#0E8388"}}>Involved</span>   
          </p>          <p id="disc">
          We welcome anyone interested in open-source technologies to join the OSW community. Here's how you can get involved:
          </p>
          <li>
          Participate in Events: Attend our regular OSW events where we cover various open-source topics through talks, workshops, and hands-on sessions.
          </li>
          <li>
          Share Your Expertise: Propose a session or workshop to share your knowledge and experience with the community.
          </li>
          <li>
          Contribute to Projects: Collaborate with other developers on open-source projects showcased during OSW events.
          </li>
          <li>
          Connect with the Community: Join our online forums and social media channels to connect with like-minded individuals, ask questions, and share your insights.
          </li>
          <br />
          <br />
          <p>
            Questions? Please contact{" "}
            <a href="mailto:opensourceweekend@gmail.com">
              opensourceweekend@gmail.com
            </a>
          </p>
          <br></br>
          {/* <p>
            Follow Us:
            <a href="https://www.facebook.com/">
              <i
                className=" fa fa-brands fa-facebook-f fa-sm mx-3"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
            <a href="https://twitter.com/gdgjalandhar">
              <i
                className="fa fa-brands fa-twitter fa-lg"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
            <a href="https://instagra.com">
              <i
                className="fa fa-brands fa-instagram fa-lg mx-3"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
            <a href="https://github.com/gdg-jalandhar">
              <i
                className="fa fa-brands fa-github fa-lg"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
            <a href="https://www.linkedin.com/company/18048778">
              <i
                className="fa fa-brands fa-linkedin fa-lg mx-3"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
            <a href="https://youtube.com">
              <i
                className="fa fa-brands fa-youtube fa-lg"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
            <a href="https://medium.com">
              <i
                className="fa fa-brands fa-medium fa-lg mx-3"
                style={{ color: "#7d7d7d" }}
              ></i>
            </a>
          </p> */}
          {/* <br></br> */}
          <button type="button" className="hash btn btn-secondary" style={{color: 'white'}}>
            #OWS
          </button>
          <button type="button" className="hash btn btn-secondary" style={{color: 'white'}}>
            #OpenSourceWeekend
          </button>
        </div>
        <div className="side2 side">
          <img className="sideImg" src={sideImg} alt="sideimg"></img>
        </div>
      </div>
      <SecFooter />
      <Footer />
    </>
  );
}

export default Contact;
