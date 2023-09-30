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
  navigate('/login')

};


  return (

    <>
    <Navbar/>
    <div className="justify-center align-center header">
      {/* Header of this page */}
      <div className="aboutheader">
        <div className='aboutHeading'> 
          <span className="About" style={{color: '#0E8388'}}> About </span>
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
              <div style={{display: 'flex', justifyContent: 'left'}}>
              <button type="button" className="becomeMember" onClick={handleClickMember}>
                
                  Become a Member
      
              </button>
              {/* <button type="button" className="learnMore"> */}
                {/* <a href="http://g.co/dev/gdg" target="_blank">
                  Learn More
                </a>
              </button> */}
              </div>
            </span>
          </div>
        </div>
      </div>
      {/* Community Guidline Accordion */}

      <div className="communityguidlinesparent">
        <div className="communityguidliness">
          <h2 className="communityguidlinessText">Community Guidelines</h2>
          <div
            className="accordion .open shadow bg-white rounded "
            id="accordionExample"
          >
            <div className="accordion-item ">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Be nice
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  We're all part of the same community, so be friendly,
                  welcoming, and generally a nice person. Be someone that other
                  people want to be around.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Be respectful and constructive
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Remember to be respectful and constructive with your
                  communication to fellow members. Don't get into flamewars,
                  make personal attacks, vent, or rant unconstructively.
                  Everyone should take responsibility for the community and take
                  the initiative to diffuse tension and stop a negative thread
                  as early as possible.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Be collaborative
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Work together! We can learn a lot from each other. Share
                  knowledge, and help each other out.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="communityguidlinessimgParent">
          <img
            src={communityguidlinessImg}
            alt=""
            className="communityguidlinessimg"
          />
        </div>
      </div>
      {/* code of conduct */}
      <div className="aboutdesc">
        <div className="codeOfConduct">
          <h2 className="codcodeOfConductText">Code of conduct</h2>
          <p>
            When you join our programs, you're joining a community. And like any
            growing community, a few ground rules about expected behavior are
            good for everyone. These guidelines cover both online (e.g. mailing
            lists, social channels) and offline (e.g. in-person meetups)
            behavior. Violations of this code of conduct can result in members
            being removed from the program. Use your best judgment, and if you'd
            like more clarity or have questions feel free to reach out.
          </p>
        </div>
        {/* AntiHarassment Policy */}
        <div className="antiHarassmentPolicy">
          <h2 className="antiHarassmentPolicyText">AntiHarassment Policy</h2>
          <h5 className="mx-2">
            Why do we have an official Anti-Harassment policy for OSW
            events?
          </h5>
          <span style={{ fontSize: 16 }}>
            <ul>
              <li className="my-2">
                It sets expectations for behavior at the event. Simply having an
                anti-harassment policy can prevent harassment.
              </li>
              <li className="my-2">
                It encourages people to attend who have had bad experiences at
                other events
              </li>
              <li className="my-2">
                It gives event staff/volunteers instructions on how to handle
                harassment quickly, with minimum amount of disruption for the
                event.
              </li>
            </ul>
          </span>
          <h4 className="mx-2">
            OSW is dedicated to providing a harassment-free event
            experience for everyone, regardless of:
          </h4>
          <span className="regarLessOf" style={{ fontSize: 19.36 }}>
            <ul>
              <li className="my-2">Gender</li>
              <li className="my-2">Sexual Orientation</li>
              <li className="my-2">Disability</li>
              <li className="my-2">Gender Identity</li>
              <li className="my-2">Age</li>
              <li className="my-2">Race</li>
              <li className="my-2">Religion</li>
              <li className="my-2">Nationality</li>
            </ul>
          </span>
          <span style={{ fontSize: 17.6 }}>
            <p>
              The above is not an exhaustive list -- we do not tolerate
              harassment of event spanarticipants in any form.
            </p>
            <p>
              Sexual language and imagery is not appropriate for any event
              venue, including talks. Event participants violating these rules
              may be expelled from the event, and event banned from future
              events at the discretion of the event organizers/management.
            </p>
            <p>Harassment includes (but is not limited to):</p>
            <ul>
              <li className="my-2">
                Offensive verbal comments related to gender, sexual orientation,
                disability, gender identity, age, race, religion
              </li>
              <li className="my-2">
                The use or display of sexual images in public spaces
              </li>
              <li className="my-2">Deliberate intimidation</li>
              <li className="my-2">Stalking</li>
              <li className="my-2">Harassing photography or recording</li>
              <li className="my-2">
                Sustained disruption of talks or other events
              </li>
              <li className="my-2">Inappropriate physical contact</li>
              <li className="my-2">Unwelcome sexual attention</li>
            </ul>
          </span>
          <p>
            Participants asked to stop any harassing behavior are expected to
            comply immediately.
          </p>
          <p style={{ fontSize: 17 }}>
            Exhibiting partners and guests are also subject to the
            anti-harassment policy. In particular, exhibitors and speakers
            should not use sexualized images, activities, or other material, or
            otherwise create a sexualized environment in their slide decks,
            exhibit material, exhibit staffing, promotional items or demo
            material.
          </p>
          <p style={{ fontSize: 17 }}>
            If you are being harassed, notice that someone else is being
            harassed, or have any other concerns, please contact an organizer or
            event volunteer immediately. Organizers and event volunteers may be
            identified by t-shirts or special badges/lanyards. Organizers will
            investigate the issue and take appropriate action. This may include
            helping participants contact venue security or local law
            enforcement, provide escorts, or otherwise assist these experiencing
            harassment to fell safe for the duration of the event.
          </p>
          <p style={{ fontSize: 17 }}>
            Though we hope that we never have to invoke this policy, we believe
            that having this document helps everyone think a little more about
            how their actions and words affect the whole community, as well as
            individuals in the community.
          </p>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
}
