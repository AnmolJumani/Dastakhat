import React from "react";
import back2 from "../assets/back2.png"
import main from "../assets/main.png"

const About = () => {
  return (
    <div className="about-section-container">
        <div className="about-background-image-container">
        <img src={back2} alt="" />
        <div className="about-section-image-container">
        <img src={main} alt="" />
      </div>
        </div>
      
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
            Transforming data security and authenticity with our innovative Decentralized Application
        </h1>
        
        <p className="primary-text">
            Our innovative Decentralized Application (dApp) is designed to revolutionize data security and
            authenticity in Identity Management Systems. Our solution utilizes Multichain, a fork of Bitcoin,
            to establish a secure, managed blockchain over which our application is developed.
        </p>
        
        {/* <p className="primary-text">
            Our dApp offers three distinct modules for issuers, authenticators, and users. With our application,
            issuers can securely upload and store data, issue verifiable credentials, and authorize third-party
            entities to authenticate documents or credentials. Users can store their verifiable credentials in
            a secure e-wallet and share them with authorized third parties with ease, while the visibility of 
            the credentials can be customized according to the user's preferences.
        </p> */}
        <div className="about-buttons-container">
        <a className="secondary-button" href="/about">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default About;
