import React from "react";
import User from "../assets/user.png";
import Issuer from "../assets/issuer.png";
import Verifier from "../assets/verifier.png";

const Work = () => {
  const workInfoData = [
    {
      image: Issuer,
      title: "Issuer",
      text: "Issuers can upload and securely store data, issue verifiable credentials, and authorize third-party entities to authenticate documents or credentials.",
    },
    {
      image: User,
      title: "User",
      text: "Users can store their verifiable credentials in an e-wallet and share them with authorized third parties, while the visibility of the credentials can be customized according to the user's preferences.",
    },
    {
      image: Verifier,
      title: "Verifier",
      text: "Verifiers can confirm the credentials and their authenticity with respect to the issuer who has issued/authorized said document or credentials.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        The application leverages the immutable nature of blockchain, ensuring that the shared 
        information is secure, tamper-proof, and resistant to forgery.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
