import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./SecFooter.css";

const SecFooter = () => {
    return(
        <div className="secFooter">
            <div className="sf-body">
                <div className="sf-link1"><CustomLink to="/"  ><span className="nav-icons"><i className="fa-solid fa-house" style={{ color: '#5a5e63' }}></i></span><p className="sf-body">Home</p></CustomLink></div>
                <div className="sf-link2"><CustomLink to="/events" ><span className="nav-icons"><i className="fa-solid fa-calendar-check" style={{ color: '#5a5e63' }}></i></span><p className="sf-body">Events</p></CustomLink></div>
                <div className="sf-link3"><CustomLink to="/about" ><span className="nav-icons"><i className="fa-solid fa-address-card" style={{ color: '#5a5e63' }}></i></span><p className="sf-body">About</p></CustomLink></div>
                <div className="sf-link4"><CustomLink to="/contact" ><span className="nav-icons"><i className="fa-solid fa-comments" style={{ color: '#5a5e63' }}></i></span><p className="sf-body">Contact</p></CustomLink></div>
            </div>
        </div>
    )
}

export default SecFooter;

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }