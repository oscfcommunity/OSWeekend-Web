import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import "./About.css";
import facebook from "../img/facebook.png";
import communityguidlinessImg from "../img/communityguidlinessImg.png";

export default function About() {
  const navigate = useNavigate();

  const handleClickMember = () => {
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      {/* Header */}
      <div className="justify-center align-center header">
        <div className="aboutheader">
          <div className='aboutHeading'> 
            <span className="About" style={{ color: '#0E8388' }}> About </span>
          </div>
          <div className="parentForImgAndText">
            <div className="headerImgParent">
              <img src={facebook} alt="" className="headerImg" />
            </div>
            <div className="headerTextPerent container my-4 pt-5">
              <span>
                <p className="headerImgText mb-1">
                  OSW brings together developers, enthusiasts, and open-source advocates to engage in discussions, workshops, and presentations focused on different open-source technologies. We believe in the power of open-source software to drive innovation, foster collaboration, and build a stronger tech community.
                </p>
              </span>
              <span>
                <br />
                <div style={{ display: 'flex', justifyContent: 'left' }}>
                  <button type="button" className="becomeMember" onClick={handleClickMember}>
                    Become a Member
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="communityGuidelinesParent">
          <div className="communityGuidliness">
            <h2 className="communityGuidlinessText">Community Guidelines</h2>
            {/* ... (community guidelines code) */}
          </div>
          <div className="communityGuidlinessimgParent">
            <img src={communityguidlinessImg} alt="" className="communityGuidlinessimg" />
          </div>
        </div>
      </div>

      {/* Code of Conduct and Anti-Harassment Policy */}
      <div className="aboutDescription">
        <div className="codeOfConduct">
          <h2 className="codcodeOfConductText">Code of Conduct</h2>
          {/* ... (code of conduct code) */}
        </div>

        <div className="antiHarassmentPolicy">
          <h2 className="antiHarassmentPolicyText">AntiHarassment Policy</h2>
          {/* ... (anti-harassment policy code) */}
        </div>
      </div>

      <Footer />
    </>
  );
}
