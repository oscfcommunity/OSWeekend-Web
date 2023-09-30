import React from "react";
import './PartnersCard.css';
import partner1 from '../../img/partner1.jpg'


const PartnersCard = (props) => {
    const {imageUrl} = props
    return (
        <div className="partners-card-con">
            <img className="partner-img" src={partner1} alt="" />
        </div>
    )
}

export default PartnersCard;