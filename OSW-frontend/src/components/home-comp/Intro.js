import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import intro_img from "../../img/Onboarding.gif";
import "./Intro.css";

const Intro = () => {
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate("/login");
  };
  const handleClickAbout = () => {
    navigate("/about");
  };
  return (
    <div className="intro-container">
      <div className="image">
        <img src={intro_img} alt="" />
      </div>
      <div className="text">
        <b>
          <p className="heading">
            Make good things <span style={{ color: "#0E8388" }}>together</span>.
          </p>
        </b>
        <p className="AppName">Open Source Weekend</p>
        <p className="intro">
        Welcome to the Open Source Weekend (OSW)! OSW is a community-driven initiative aimed at promoting and celebrating open-source technologies on a regular basis. Our goal is to create a platform for knowledge sharing, collaboration, and exploration of various open-source projects.
        </p>
        {/* <div className="box-container">
          <div className="rounded-grey-div-lg">
            <a
              className="div-link"
              href="https://twitter.com/i/flow/login?redirect_after_login=%2Fhashtag%2FWTMJalandhar"
            >
              #WTMJalandhar
            </a>
          </div>
          <div className="rounded-grey-div-sm">
            <a
              className="div-link"
              href="https://twitter.com/i/flow/login?redirect_after_login=%2Fhashtag%2FGDG"
            >
              #GDG
            </a>
          </div>
          <div className="rounded-grey-div-lg">
            <a
              className="div-link"
              href="https://twitter.com/i/flow/login?redirect_after_login=%2Fhashtag%2FGDGJalandhar"
            >
              #GDGJalandhar
            </a>
          </div>
          <div className="rounded-grey-div-sm">
            <a
              className="div-link"
              href="https://twitter.com/i/flow/login?redirect_after_login=%2Fhashtag%2FAura"
            >
              #Aura
            </a>
          </div> */}
        {/* </div> */}
        <div className="buttons">
          <Button className="my-button" onClick={handleClickLogin}>
            Become A Member
          </Button>
          <Button className="my-button" onClick={handleClickAbout} style={{border: '2px solid #0e8388', background: 'none'}}>
            Learn More
          </Button>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Intro;
