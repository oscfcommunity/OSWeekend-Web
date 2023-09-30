import React, { useEffect, useState } from "react";
import "./home.css";
import Intro from "./home-comp/Intro";
import WhatWeDo from "./home-comp/WhatWeDo";
import ColouredSection from "./home-comp/ColouredSection";
import Meetup from "./home-comp/Meetup";
import Partners from "./home-comp/Partners";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SecFooter from "./SecFooter";
import ModalForm from "./ModalForm";

const Home = () => {
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
            console.log(payload);
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
  return (
    <div className="max-div">
      <Navbar />
      <Intro />
      <WhatWeDo />
      <ColouredSection />
      <Meetup />
      <Partners />
      <Footer />
      <SecFooter />
    </div>
  );
};

export default Home;
