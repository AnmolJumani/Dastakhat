import React from 'react'
import Navbar from './navbar'
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


const ViewEmployee = () => {
  const {id} = useParams("");
  const navigate = useNavigate();

  const [getuserdata, setUserdata] = useState({
    name: "",
    email: "",
    cnic: "",
    designation: "",
    contact: "",
    join_date: "",
    birth_date: "",
    address: "",
    shareables: "",
    attested_docs: [],
  });
  
  // console.log(getuserdata);
  
  let len;
  let docs=[];
  let doc_name;
  let doc_status;
  let doc_hash;

  const getData = async(e)=>{
    
    const res = await fetch(`/getdata/${id}`,{
      method: "GET",
      headers:{
        "Content-Type": 'application/json',
      },
    })
    const data = await res.json();
    console.log('data',data);

    if (res.status === 404 || !data || res.status === 422){
      alert(res.status);
      console.log('error!');
    }else{
      setUserdata(data);
      console.log('UserData',getuserdata.name);
      len = data.attested_docs.length;
      docs = data.attested_docs;
      doc_name = data.attested_docs[0].doc_name;
      doc_status = data.attested_docs[0].doc_status;
      doc_hash = data.attested_docs[0].doc_hash;
      console.log('docs',docs);
    }
  }
  useEffect(()=>{
    getData();
  },[]);

  const deleteUser = async(id)=>{
    const res2 = await fetch(`/deleteuser/${id}`,{
       method: "DELETE",
       headers:{
         "Content-Type":"application/json"
       }
    })
    const deletedata = await res2.json();
    console.log(deletedata);

    if(res2.status === 422 || !deletedata){
     console.log("error");
    }else{
       console.log("user deleted");
       navigate('/employee');
       ;  
    }

 }

 const fetchDoc = async(doc_hash)=>{
  console.log('docHash', doc_hash);
  const res3 = await fetch(`/viewdocument/${doc_hash}`,{
    method: "GET",
    headers:{
      "Content-Type": "application/json"
    }
  })
  const filedata= await res3.json();

  if(res3.status ===422 || res3.status===404){
    console.log('error');
  }else{
    console.log('doc fetched');
  }
 }

  return (

    <div>
        <div className = "main_container"> 
        <Navbar/>
        <div className="employees_table part_two ">
          <p className="welcome_text">Employee Detail</p>
          <button onClick={() => { deleteUser(id) }} className="delete_employee_button">Delete &nbsp; <i className="fa-solid fa-trash"></i> </button>
          <div class="employee-details-container">
            <div class="employee_detail">
              <span class="label">Name:</span>
              <span class="detail_value">{getuserdata.name}</span>
            </div>

            <div class="employee_detail">
              <span class="label">Email:</span>
              <span class="detail_value">{getuserdata.email_id}</span>
            </div>

            <div class="employee_detail">
              <span class="label">CNIC:</span>
              <span class="detail_value">{getuserdata.cnic}</span>
            </div>

            <div class="employee_detail">
              <span class="label">Designation:</span>
              <span class="detail_value">{getuserdata.designation}</span>
            </div>

            <div class="employee_detail">
              <span class="label">Contact:</span>
              <span class="detail_value">{getuserdata.contact}</span>
            </div>

            <div class="employee_detail">
              <span class="label">Join Date:</span>
              <span class="detail_value">{getuserdata.join_date}</span>
            </div>

            <div class="employee_detail">
              <span class="label">Birth Date:</span>
              <span class="detail_value">{getuserdata.birth_date}</span>
            </div>

            <div class="employee_detail">
              <span class="label">Address:</span>
              <span class="detail_value">{getuserdata.address}</span>
            </div>
            {/* <div class="uploaded_docs">
              <span class="label">Uploaded Documents:</span>
              {len!=0? <NavLink to={`/showDocument`} ><p>{doc_name}<i   className="custom_eye fa-solid fa-eye" onClick={fetchDoc}></i> </p></NavLink>: <p> No documents</p>}
              

            </div> */}

       
            <table className="employee_table_main">
          <tr>
            <th>#</th>
            <th>Document</th>
            <th>status</th>
            {/* <th>Contact</th>
            <th>CNIC</th> */}
            {/* <th>Shareables</th> */}
            <th>Actions</th>
          </tr>

          {getuserdata.attested_docs.map((element, id) => {
          return (
            <tr key={id}>
              <td>{id+1}</td>
              <td>{element.doc_name}</td>
              <td>{element.doc_status}</td>
              {/* <td>{element.contact}</td>
              <td>{element.cnic}</td> */}
              {/* <td>{element.shareables}</td> */}
              <td>
                <NavLink to ={`/showDoc`} ><button onClick={fetchDoc(element.doc_hash)}>view</button></NavLink> &nbsp;
                {/* <NavLink to = {`/EditEmployee/${element._id}`}><i className="fa-solid fa-pencil"></i></NavLink> &nbsp;
                <i className="fa-solid fa-trash" onClick={()=>deleteUser(element._id )}></i> &nbsp; */}
              </td>
              {/* <td>{val.details}</td> */}
            </tr>
          )
        })}

        </table>

          </div>
          {/* <NavLink to ="/showDocument"><button> View </button></NavLink> */}
        </div>
      </div>
  
      
  
    // </div>
    )
}

export default ViewEmployee
