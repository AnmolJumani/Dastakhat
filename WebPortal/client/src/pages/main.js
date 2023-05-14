import React, { useEffect, useState } from "react"
import "../App.css";
import logo from "../assets/logo.png";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";



const Index = () => {

	
  return (
	<>
	  <Navbar isMain={true} openSidebar={true} />
	<div  onClick={()=>{
        document.getElementById('sidebar_dashboard').style.left = '-100%'
        }}   className="main_container">
		 
		<div className="dashboard_view">
			<div className="dashboard_part_one">
				<img src={logo} />
			</div>
			<div className="dashboard_part_two">
				{/* <div className="dashboard_all_items"> */}
				<Link to="/employee">
					<div className="dashboard_option">
						<i className="fa-solid fa-users"></i>
						<p>Employees</p>
					</div>
				</Link>

				<Link to="/addEmployee">
					<div className="dashboard_option">
						<i className="fa-solid fa-users-medical"></i>
						<p>Add Employee</p>
					</div>
				</Link>
				<Link to="/manage">
					<div className="dashboard_option">
						<i className="fa-light fa-clipboard-list-check"></i>
						<p>Manage</p>
					</div>
				</Link>
				<Link to="/request">
					<div className="dashboard_option">
						<i className="fa-solid fa-bell"></i>
						<p>Requests</p>
					</div>
				</Link>
					
				{/* </div> */}
			</div>
		</div>
	</div>
	</>
	
  )
}

export default Index