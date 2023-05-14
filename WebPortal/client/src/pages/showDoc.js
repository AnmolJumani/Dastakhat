import React, { useEffect,useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "../App.css";
import Navbar from './navbar';
import { useParams } from 'react-router-dom';


function ShowDoc() {
  const {Doc_id, _id} = useParams();
  console.log(Doc_id)
  console.log(_id)

  
  let docs=[]
  let myUrl=''

  const getData = async(e)=>{
    
    const res = await fetch(`/getdata/${_id}`,{
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
      docs= data.attested_docs;
      console.log('docs',docs);
      for (let i=0; i< docs.length; i++){
        if(docs[i]._id === Doc_id){
          myUrl= docs[i].doc_url
          
        }
      }
      document.getElementById('myIframe').src = myUrl;
      console.log('myurl', myUrl)
      
    }
  }
  useEffect(()=>{
    getData();
  },[]);

  return (
    <div className="main_container" style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
       <Navbar  />
       <iframe
       id='myIframe'
        width="700"
        height="600"
        src= ""
        // src= "https://firebasestorage.googleapis.com/v0/b/dastakhat-86ccb.appspot.com/o/wasiq%40gmail.com%2FHabib%20University%2FCompany%20Credentials_example.pdf?alt=media&token=e7c847f2-f98d-4e3c-971e-4eb59b623091"
        // src="https://firebasestorage.googleapis.com/v0/b/dastakhat-86ccb.appspot.com/o/maya%40gmail.com%2FHabib%20University%2Fdummy.pdf?alt=media&token=01cbe009-1548-4272-899f-269edf6bd3f0"
        // title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

        <div className="pdf-status ">
          <h1>Document Status:</h1>
          <p>Verified by Habib University</p>
          {/* {showVerificationMessage && <p style={{ color: 'green' }}>Document Verified</p>}
          {showDeclineMessage && <p style={{ color: 'red' }}>Verification Declined</p>} */}
        </div>
    </div>
  );
}

export default ShowDoc;



  


