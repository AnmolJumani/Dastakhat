// import React from 'react'
// import logo from "../assets/logo.png";
// import Sidebar from './sidebar';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';

// const  Navbar = ({openSidebar, isMain, fromWhere}) => {
//   return (

//     <div className="dashboard_navbar" >
      
//       {isMain ? <i onClick={()=>{
//         document.getElementById('sidebar_dashboard').style.left = '0'
//       }}  className="fa-solid fa-bars"></i> : <Link to={"/"+fromWhere}>
//         <i className="fa-solid fa-left-long"></i>
//       </Link>} {openSidebar ? <Sidebar /> : <></>}


//       <img src= {logo} />

//       {/* </Link>} */}
    
//       <div id="nav_search">
//         <input
//           className="nav_search"
//           type="search"
//           placeholder="Search"
//           aria-label="Search"

//         />
//         <button type="submit">
//             Search
//         </button>

//       </div>
      
//     </div>

//     // <div className="nav-bar">
//     //     <div className = "choose" onClick={openSidebar}>
// 		// 	    <img src= {choose} width="40px" height="auto"/>
// 		//     </div>

//     // </div>
//   )
// }

// export default Navbar


import React from 'react'
import logo from "../assets/logo.png";
import Sidebar from './sidebar';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({openSidebar, isMain}) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard_navbar" >
      {isMain ? <i onClick={()=>{
        document.getElementById('sidebar_dashboard').style.left = '0'
      }} className="fa-solid fa-bars"></i> : <Link to="#" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-left-long"></i>
      </Link>}
      {openSidebar ? <Sidebar /> : <></>}

      <img src={logo} />

      <div id="nav_search">
        <input
          className="nav_search"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button type="submit">
            Search
        </button>
      </div>
    </div>
  )
}

export default Navbar
