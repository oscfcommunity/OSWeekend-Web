import React, {useState, useEffect} from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./EventsNav.css";



const EventsNav = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    const closeMenu = () => {
      setMenuOpen(false);
    };
  
    useEffect(() => {
      // Add or remove the 'menu-open' class to the body based on menuOpen state
      if (menuOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
  
      // Clean up the class when the component unmounts
      return () => {
        document.body.classList.remove('menu-open');
      };
    }, [menuOpen]);
  
  
    useEffect(() => {
      const closeNavbar = (event) => {
        // Check if the clicked element is part of the navbar
        if (!event.target.closest('.nav')) {
          setMenuOpen(false);
        }
      };
  
      // Add the click event listener to the document
      document.addEventListener('click', closeNavbar);
  
      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener('click', closeNavbar);
      };
    }, []);

    return(
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
       <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
      </div>
      
      <hr />
        <CustomLink to="/" onClick={closeMenu}><span className="nav-icons"><i className="fa-solid fa-house" style={{ color: '#5a5e63' }}></i></span>Home</CustomLink>
        <CustomLink to="/events" onClick={closeMenu}><span className="nav-icons"><i className="fa-solid fa-calendar-check" style={{ color: '#5a5e63' }}></i></span>Events</CustomLink>
        <CustomLink to="/about" onClick={closeMenu}><span className="nav-icons"><i className="fa-solid fa-address-card" style={{ color: '#5a5e63' }}></i></span>About</CustomLink>
        <CustomLink to="/contact" onClick={closeMenu}><span className="nav-icons"><i className="fa-solid fa-comments" style={{ color: '#5a5e63' }}></i></span>Contact</CustomLink>
        <CustomLink to="/blogs" onClick={closeMenu}><span className="nav-icons"><i className="fa-brands fa-blogger" style={{ color: '#5a5e63' }}></i></span>Blogs</CustomLink>
        <CustomLink to="/resourceLibrary" onClick={closeMenu}><span className="nav-icons"><i className="fa-regular fa-images" style={{ color: '#5a5e63' }}></i></span>Resource Library</CustomLink>
      
     
    </nav>
    );
}

export default EventsNav;

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