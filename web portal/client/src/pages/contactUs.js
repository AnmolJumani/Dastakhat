import React from 'react';
import "../App.css";
import Navbar from './navbar';
import logo from "../assets/logo.png";

const ContactUs = () => {
  return (
    <div>
      <div className="main_container">
        <Navbar/>
        <div className="contactUs part_two">
          <p className="welcome_text">Contact Us</p>
          <div className="form_container">
            <div className="username_input">
              <p>Company Name:</p>
              <input      
                type="text"
                placeholder="Enter your Company Name"
                id="CompanyName"
                name="CompanyName"
                className="input-field mt-5"
              />
            </div>
            <div className="username_input">
              <p>Employee Name:</p>
              <input
                type="text"
                placeholder="Enter your name"
                id="name"
                name="name"
                className="input-field mt-5"
              />
            </div>
            <div className="username_input">
              <p>Subject:</p>
              <input
                placeholder="Subject"
                id="subject"
                name="subject"
                className="input-field mt-5"
              />
            </div> 
            <div className="username_input">
              <p>Message:</p>
              <textarea
                placeholder="Type your Message"
                id="message"
                name="message"
                className="input-field mt-5"
                rows="8"
                cols="50"
              />
            </div>
            <button className="button mt-5" >Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
