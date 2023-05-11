import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Link } from "react-router-dom";
import "../App.css";
import Navbar from './navbar';


function ShowDocument() {
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [showDeclineMessage, setShowDeclineMessage] = useState(false);

  const handleAccept = () => {
    setShowVerificationMessage(true);
    setTimeout(() => {
      setShowVerificationMessage(false);
    }, 2000);
  };

  const handleDecline = () => {
    setShowDeclineMessage(true);
    setTimeout(() => {
      setShowDeclineMessage(false);
    }, 2000);
  };

  return (
    <div className="main_container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Navbar />
      <iframe
        width="700"
        height="600"
        src="https://firebasestorage.googleapis.com/v0/b/dastakhat-86ccb.appspot.com/o/maya%40gmail.com%2FHabib%20University%2Fdummy.pdf?alt=media&token=01cbe009-1548-4272-899f-269edf6bd3f0"
        // title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
        <div className="pdf-page-buttons">
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="#">
              <button onClick={handleAccept}>Accept</button>
            </Link>
            <Link to="#">
              <button onClick={handleDecline}>Decline</button>
            </Link>
          </div>
        </div>
        {showVerificationMessage && (
          <div className="verification-message">
            <p>Document Verified</p>
          </div>
        )}
        {showDeclineMessage && (
          <div className="verification-message">
            <p>Verification Declined</p>
          </div>
        )}
        <div className="pdf-status ">
          <h1>Document Status:</h1>
          <p>Here goes the status of the document</p>
          {/* {showVerificationMessage && <p style={{ color: 'green' }}>Document Verified</p>}
          {showDeclineMessage && <p style={{ color: 'red' }}>Verification Declined</p>} */}
        </div>
      </div>
  );
  
}

export default ShowDocument;
