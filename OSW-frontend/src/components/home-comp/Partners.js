import React, { useState } from "react";
import './Partners.css';
import PartnersCard from "./PartnersCard";
import ImageCarousel from "./ImageCarousel";
import image1 from "../../img/logo.JPG"

const Partners = () => {
    // const imageUrl = 'partner1.jpg';
    const images = [
        image1,
        image1,
        image1,
        image1,
        image1,
        // Add more image URLs here
      ];
    
    return (
        <div className="partners-con">
            <div className="partners-content">
            <b><p className="partners-head">OSW <span style={{ color: '#0E8388' }}>Family</span></p></b>
            <p>A very big thank you to all our partners for their continued partnership.</p>
            <p>If you’re interested in being showcased throughout , contact opensourceweekend@gmail.com to discuss sponsorship opportunities.</p>
            <p className="general-partners">Teams</p>
            <div className="display-partners">
                {/* <PartnersCard/> */}
                <ImageCarousel images={images}/>
            </div>
            <p className="general-partners">Speakers</p>
            <div className="display-partners">
                {/* <PartnersCard/> */}
                <ImageCarousel images={images}/>
            </div>
            </div>
        </div>
    )
};

export default Partners;