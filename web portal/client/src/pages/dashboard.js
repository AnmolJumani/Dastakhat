import React from 'react'
import "../App.css";
import DashNav from './dashNav';
import Home from './home';
import About from './about';
import Work from './Work';
import Contact from './Contact';
import Footer from './Footer';


const Dashboard = () => {
  return (
    <div>
      <DashNav/>
      <div className = "main_container">
        <Home/>
        <About/>
        <Work/>
        <Contact/>
        <Footer/>
      </div>
    </div>

  )
}

export default Dashboard