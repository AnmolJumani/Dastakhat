import React from "react";
import logo from "../assets/logo.png";


const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={logo} />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Know More</span>
          <span>Help</span>
          <span>Share</span>
          <span>Testimonials</span>
          <span>Work</span>
        </div>
        <div className="footer-section-columns">
          <span>244-5383-7783</span>
          <span>hello@dastakhat.com</span>
          <span>press@dastakhat.com</span>
          <span>contact@dastakhat.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
