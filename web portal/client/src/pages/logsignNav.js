import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"

const LogsignNav = () => {
    const navigate = useNavigate();
  return (
    <nav>
    <div className = "Logsign_navbar">
    <Link to="#" onClick={() => navigate(-1)}><i className="fa-solid fa-left-long"></i> </Link>
    <img src={logo} />
    </div>
    </nav>
  )
}

export default LogsignNav





