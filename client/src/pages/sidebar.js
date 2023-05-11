import React from 'react'
import organization_logo from "../assets/habib_logo.png";
import organization from "../assets/organization.png"
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
    <div id='sidebar_dashboard' className="sidebar_dashboard">
      <div className="organization_logo">
      <img src= {organization} width="100px" height="auto"/>
        <p>Organization Name</p>
      </div>
      <div className="sidebar_links">
        <Link to="/adminProfile" >
        <i className="fa-solid fa-user"></i> Profile
        </Link>
        <Link to="/settings" >
        <i className="fa-solid fa-gear"></i> Settings
        </Link>
        <Link to="/login" >
        <i className="fa-solid fa-right-from-bracket"></i>  Logout
        </Link>
        {/* <Link  onClick={()=>{
        document.getElementById('sidebar_dashboard').style.left = '-100%'
        }} to="" id='close_sidebar_button' >
          <i className="fa-solid fa-xmark-large"></i>
        </Link> */}
      </div>
    </div>
    </>
    
  )
}

export default Sidebar