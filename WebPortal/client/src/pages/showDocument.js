import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { NavLink, useParams, useHistory } from "react-router-dom";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { storage } from '../firebase/firebase';
import { Link } from "react-router-dom";
import "../App.css";
import Navbar from './navbar';


function ShowDocument() {
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [showDeclineMessage, setShowDeclineMessage] = useState(false);
  const { id, req_id } = useParams("");
  console.log(id)
  console.log(req_id);
  let reqs=[]
  let myUrl=''
  let myEmail=''
  const handleAccept = async() => {
    try{
      const res2 = await fetch('/requestaccepted',{
        method: "PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
           "user_id": id,
           "req_id" : req_id
        })
     })
     const updated = await res2.json();
     console.log(updated);
 
     if(res2.status === 422 || res2.status===404){
      console.log("error");
     }else{
        console.log("request accepted!");
        // alert("request accepted")
        
        
     }
    }catch(e){console.log()}
    
    console.log(id, req_id);
    setShowVerificationMessage(true);
    setTimeout(() => {
      setShowVerificationMessage(false);
    }, 2000);
  };

  const handleDecline = async() => {

    try{
      const res2 = await fetch('/declinerequest',{
        method: "PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
           "user_id": id,
           "req_id" : req_id
        })
     })
     const updated = await res2.json();
     console.log(updated);
 
     if(res2.status === 422 || res2.status===404){
      console.log("error");
     }else{
        console.log("request declined!");
        // alert("request declined")
        // getUpdate();
        
     }
    }catch(e){console.log()}
    

    setShowDeclineMessage(true);
    setTimeout(() => {
      setShowDeclineMessage(false);
    }, 2000);
  };

  const getData = async(e)=>{
    
    const res = await fetch(`/getdata/${id}`,{
      method: "GET",
      headers:{
        "Content-Type": 'application/json',
      },
    })
    const data = await res.json();
    

    if (res.status === 404 || !data || res.status === 422){
      alert(res.status);
      console.log('error!');
    }else{
      console.log('data',data);
      myEmail= data.email_id;
      reqs= data.requests;
      console.log('reqs',reqs);
      for (let i=0; i< reqs.length; i++){
        if(reqs[i]._id === req_id){
          myUrl= reqs[i].content
          
        }
      }
      document.getElementById('myIframe').src = myUrl;
      console.log('myurl', myUrl)
      console.log('email', myEmail)

      
        
        // const fileName = 'UserUploadedFile'
      
        // const res = await fetch(myUrl, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/pdf',
        //   },
        // })
        //   .then(response => response.blob())
        //   .then(blob => {
        //     const url = window.URL.createObjectURL(new Blob([blob]));
        //     console.log('making of blob',url)
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.download = fileName;
    
        //     document.body.appendChild(link);
    
        //     link.click();
    
        //     link.parentNode.removeChild(link);
        //   });
      
    
      
      
    }
  }

  function mergeTypedArrays(fileArray, value) {
    // Create a new typed array with the combined length
    const mergedArray = new fileArray.constructor(fileArray.length + value.length);
  
    // Copy elements from the first array
    mergedArray.set(fileArray, 0);
  
    // Copy elements from the second array
    mergedArray.set(value, fileArray.length);
  
    return mergedArray;
  }
  

  function moveFirebaseFile(currentPath, destinationPath) {
    let oldRef = storage.ref().child(currentPath)

    oldRef.getDownloadURL().then(url => {
        fetch(url).then(htmlReturn => {
            let fileArray = new Uint8Array()
            const reader = htmlReturn.body.getReader()

            //get the reader that reads the readable stream of data
            reader
                .read()
                .then(function appendStreamChunk({ done, value }) {
                    //If the reader doesn't return "done = true" append the chunk that was returned to us
                    // rinse and repeat until it is done.
                    if (value) {
                        fileArray = mergeTypedArrays(fileArray, value)
                    }
                    if (done) {
                        console.log(fileArray)
                        return fileArray
                    } else {
                        // "Readout not complete, reading next chunk"
                        return reader.read().then(appendStreamChunk)
                    }
                })
                .then(file => {
                    //Write the file to the new storage place
                    let status = storage
                        .ref()
                        .child(destinationPath)
                        .put(file)
                    //Remove the old reference
                    oldRef.delete()

                    return status
                })
        })
    })
}



  useEffect(()=>{
    getData();
  },[]);

  const declineRequest = async(id, req_id)=>{
    console.log(id, req_id)
    try{
      const res2 = await fetch('/declinerequest',{
        method: "PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
           "user_id": id,
           "req_id" : req_id
        })
     })
     const updated = await res2.json();
     console.log(updated);
 
     if(res2.status === 422 || res2.status===404){
      console.log("error");
     }else{
        console.log("request declined!");
        // alert("request declined")
        // getUpdate();
        
     }
    }catch(e){console.log()}
    

 }

  return (
    <div className="main_container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Navbar />
      <iframe
        id='myIframe'
        width="700"
        height="600"
        src=''
        // src= "https://firebasestorage.googleapis.com/v0/b/dastakhat-86ccb.appspot.com/o/mr06187%40st.habib.edu.pk%2FHabib%20University%2FUser%20Credentials_example.pdf?alt=media&token=1fd11985-c37a-4948-8dbf-02eeec856a43"
        // src="https://firebasestorage.googleapis.com/v0/b/dastakhat-86ccb.appspot.com/o/maya%40gmail.com%2FHabib%20University%2Fdummy.pdf?alt=media&token=01cbe009-1548-4272-899f-269edf6bd3f0"
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
          {/* <a id='a1' download="myCopyOfPrint.pdf">
            Download a pdf file
          </a> */}
          <p>Not verified</p>
          {showVerificationMessage && <p style={{ color: 'green' }}>Document Verified</p>}
          {showDeclineMessage && <p style={{ color: 'red' }}>Verification Declined</p>}
        </div>
      </div>
  );
  
}

export default ShowDocument;
