import React from "react";
import { useNavigate } from "react-router-dom";
import './ColouredSection.css';
import { Button } from 'react-bootstrap';

const ColouredSection = () => {

const handleClickMore = () => {
    navigate("/about")
}

const navigate = useNavigate();

    return (
        <div className="containercss">
            <div className="about-text">
                <p className="about-title">About Open Source Weekend</p>
                <p>OSW brings together developers, enthusiasts, and open-source advocates to engage in discussions, workshops, and presentations focused on different open-source technologies. We believe in the power of open-source software to drive innovation, foster collaboration, and build a stronger tech community.</p>
                <Button  className="colored-button" onClick={handleClickMore}>
                    See More
                </Button>
                
            </div>
        </div>
    )
};

export default ColouredSection;