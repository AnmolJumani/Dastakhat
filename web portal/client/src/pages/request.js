import React, { useEffect} from "react";
import { useState } from "react";
import "../App.css";
import Navbar from './navbar';
import { NavLink } from "react-router-dom";


const Request = () => {

  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const getUpdate = async(e)=>{
    
    const res = await fetch("/getdata",{
      method: "GET",
      headers:{
        "Content-Type": 'application/json',
      },
    })
    const data = await res.json();
    // console.log(data.name);

    if (res.status === 404 || !data || res.status === 422){
      alert(res.status);
      console.log('error!');
    }else{
      let lst=[];
      
      for (let i=0; i<data.length; i++){
        if(data[i].requests.length>0){
          for (let j=0; j<data[i].requests.length; j++){
            console.log((data[i].requests[j].status))
            if (data[i].requests[j].status === "waiting"){
              console.log('hello')
              lst.push({'_id':data[i]._id, 'name':data[i].name, 'email_id': data[i].email_id, 'request_id': data[i].requests[j]._id,'request_type': data[i].requests[j].type, 'request_date': data[i].requests[j].date }); 
            }
            
          }
        }
      }
      setUserdata(lst);
      console.log(lst);
      // console.log(data);
    }
  }

  const acceptReq = async(id, req_id)=>{
    alert('request accepted!')
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
        alert("request declined")
        getUpdate();
        
     }
    }catch(e){console.log()}
    

  }
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
        alert("request declined")
        getUpdate();
        
     }
    }catch(e){console.log()}
    

 }
  
  useEffect(()=>{
    getUpdate();
    document.getElementById('nav_search').style.display = 'initial'
},[])


  return (
    <div>
      <Navbar/>
      <div className = "main_container">

      <div className="requests_data part_two">
        <p className="welcome_text">
          Requests ({getuserdata.length})
        </p>
        {getuserdata.map((value, index)=>{
            return <div className="single_notification" key={index}>
                <img src={"https://icons-for-free.com/iconfiles/png/512/avatar+human+people+profile+user+icon-1320168139431219590.png"}  width='40px' alt=""  />
                <div className='request_text'>
                <p>{value.name} requests for {value.request_type}</p>
                 <br />


                </div>
                
                <div className="request_buttons">
                <div style={{ display: 'flex', gap: '10px' }}> {value.request_type === 'company credentials' ?
                 (<>
                 <NavLink to ={`/uploadDocument/${value._id}`}><button>Upload</button></NavLink>
                 <button onClick={() => { declineRequest(value._id,value.request_id) }}>Decline</button></>) 
                 : (<></>)}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                {value.request_type === 'user uploaded' ? (<><NavLink to ="/showDocument"><button> View </button></NavLink>
                <button onClick={() => { declineRequest(value._id,value.request_id) }}>Decline</button>
                <button onClick={() => { acceptReq(value._id,value.request_id) }}>Accept</button>
                </>
                ) : (<></>)
                }
                </div>
                </div>

                </div>
        })}

      </div>




		
	</div>
	
    </div>
  )
}

export default Request

// onClick={() => { declineRequest(value._id,value.request_id) }}