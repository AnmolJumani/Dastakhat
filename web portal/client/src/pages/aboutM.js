import React from 'react';
import Navbar from './navbar';

const AboutM = () => {
  return (
    <div>
      <Navbar />
      <div className="main_container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className='content' >
          <h1 style={{ textAlign: "center", fontSize: "25px" }}>Welcome to Dastakhat. Here is a small introduction to our platform!</h1>
          <p style={{ textAlign: "center", maxWidth: "800px", margin: "auto" }}>Our platform offers three distinct modules for issuers, authenticators, and users. With our application,
            issuers can securely upload and store data, issue verifiable credentials, and authorize third-party
            entities to authenticate documents or credentials. Users can store their verifiable credentials in
            a secure e-wallet and share them with authorized third parties with ease, while the visibility of 
            the credentials can be customized according to the user's preferences.</p>
        </div>
        <iframe
          width="800"
          height="400"
          src="https://www.youtube.com/embed/yxXU9_sFAeg"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default AboutM;
