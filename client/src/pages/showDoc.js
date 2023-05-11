import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "../App.css";
import Navbar from './navbar';


function ShowDoc() {

  return (
    <div className="main_container" style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
       <Navbar  />
       <iframe
        width="700"
        height="600"
        src="https://firebasestorage.googleapis.com/v0/b/dastakhat-86ccb.appspot.com/o/maya%40gmail.com%2FHabib%20University%2Fdummy.pdf?alt=media&token=01cbe009-1548-4272-899f-269edf6bd3f0"
        // title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

        <div className="pdf-status ">
          <h1>Document Status:</h1>
          <p>Here goes the status of the document</p>
          {/* {showVerificationMessage && <p style={{ color: 'green' }}>Document Verified</p>}
          {showDeclineMessage && <p style={{ color: 'red' }}>Verification Declined</p>} */}
        </div>
    </div>
  );
}

export default ShowDoc;



  


