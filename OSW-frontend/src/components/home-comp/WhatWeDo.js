import React from "react";
import './WhatWeDo.css';
// import {Tooltip} from 'react-tooltip';
import angular_img from '../../img/angular.png';
import cloud_img from '../../img/cloud.png';
import android_img from '../../img/android.png';
import assistant_img from '../../img/assistant.png';
import firebase_img from '../../img/firebase.png';
import tensorflow_img from '../../img/tensorflow.png';

const WhatWeDo = () => {

    return (
    <div className='outer-div'>
      <div className="first">
        <p className="title">What we do?</p>
        <p className="intro-text">Promote open-source technologies and their benefits to the community.</p>
        {/* <p className="intro-text-1">About different Google technologies</p> 
        <div className="tech-img"> 
            <a className='a-link' href="https://angular.io/">
            <img className="images1" src={angular_img} alt="" />
            </a>
            <a className='a-link' href="https://cloud.google.com/">
              <img className="images2" src={cloud_img} alt="" />
            </a>
            <a className='a-link' href="https://www.android.com/">
              <img className="images3" src={android_img} alt="" />
            </a>
            <a className='a-link' href="https://developers.google.com/assistant/">
              <img className="images4" src={assistant_img} alt="" />
            </a>
            <a className='a-link' href="https://firebase.google.com/">
              <img className="images5" src={firebase_img} alt="" />
            </a>
            <a className='a-link' href="https://www.tensorflow.org/">
              <img className="images6" src={tensorflow_img} alt="" />
            </a>
        </div>  */}
      </div>
      <div className="pairs">
      <div className="pair-1">
      <div className="second">
        <div className="fontaw"><i className="fa-solid fa-message" style={{color: '#6d6d6f', fontSize: '40px'}}></i></div>
        <p className="what-text">Talks</p>
        <p className="what-text-2">Get updated with the latest news and announcements</p>
       </div>
       <div className="third">
       <div className="fontaw"><i className="fa-sharp fa-solid fa-code" style={{color: '#6d6d6f', fontSize: '40px'}}></i></div>
       <p className="what-text">Codelabs</p>
       <p className="what-text-2">Get hands-on experience and guidance from the community members</p>
       </div>
       </div>
       <div className="pair-2">
       <div className="fourth">
        <div className="fontaw"><i className="fa-solid fa-graduation-cap" style={{color: '#6d6d6f', fontSize: '40px'}}></i></div>
        <p className="what-text">Campus Roadshows</p>
        <p className="what-text-2">Share knowledge in different Companies, colleges and universities</p>
       </div>
       <div className="fifth">
        <div className="fontaw"><i className="fa-solid fa-eye" style={{color: '#6d6d6f', fontSize: '40px'}}></i></div>
        <p className="what-text">Live Viewing Parties</p>
        <p className="what-text-2">Share knowledge in different Companies, colleges and universities</p>
       </div>
       </div>
       </div>
    </div>
    )
}

export default WhatWeDo;