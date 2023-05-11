import React from 'react'
import logo from "../assets/logo.png";


const DashNav = () => {
  return (
    <nav>
    <div className="dash_navbar" >
      <div className="dash_img">
      <img src={logo} />
      </div>
      <div className="navbar-links-container">
        <a href="/about">About</a>
        <a href="/contactUs">Contact</a>
        <a href="/login">Log In</a>
        <a href="">Blog</a>
      </div>
    </div>
    </nav>
  )
}

export default DashNav


