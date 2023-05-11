import React from 'react'
import back1 from "../assets/back1.png"
import mobile from "../assets/mobile.png"

const Home = () => {
  return (
    <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={back1} alt="" />
        </div>
    <div className="home-text-section">
      <h1 className="primary-heading">
        We Care About Your Identity
      </h1>
      <p className="primary-text">
      "Revolutionize your data security and authenticity with our cutting-edge Decentralized Application
      - empowering you to issue and share verifiable credentials with ease and confidence."
      </p>
    </div>
    <div className="home-image-section">
      <img src={mobile} />
    </div>
  </div>
  )
}

export default Home
