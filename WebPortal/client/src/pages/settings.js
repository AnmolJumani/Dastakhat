import React from 'react'
import Navbar from './navbar'

const Settings = () => {
  return (
    <div className="main_container">
          <Navbar />
          <div className="loginpage_flex">

          <div className="part_two">
            <p className="welcome_text">Update Profile</p>
            <div className="username_input">
              <p>Username:</p>
              <input type="text" placeholder="Enter your username" />
            </div>
            <div className="username_input">
              <p>Email:</p>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="username_input">
              <p>Phone Number:</p>
              <input type="tel" placeholder="Enter your phone" />
            </div>
            <div className="password_input">
              <p>Password:</p>
              <input type="password" placeholder="Enter your password" />
            </div>
            <button>Update</button>

          </div>
          </div>
    </div>

  )
}

export default Settings
