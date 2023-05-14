import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from './navbar';
import { NavLink } from "react-router-dom";

const Employee = () => {
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
    console.log(data.name);

    if (res.status === 404 || !data || res.status === 422){
      alert(res.status);
      console.log('error!');
    }else{
      setUserdata(data);
      console.log(data);
    }
  }
  
  useEffect(()=>{
    getUpdate();
    document.getElementById('nav_search').style.display = 'initial'
},[])

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
     getUpdate();  
  }

}

  return (

  <div>
      <div className = "main_container"> 
      <Navbar/>

      <div className="employees_table part_two ">
        <p className="welcome_text">Employees ({getuserdata.length})</p>
        <button onClick={()=>{window.location.href = 'addEmployee'}}className='add_employee_button' >Add Employee &nbsp; <i className="fa-solid fa-user-plus"></i> </button>
        <div className="employee_table_scroll">
        <table className="employee_table_main">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>CNIC</th>
            {/* <th>Shareables</th> */}
            <th>Actions</th>
          </tr>

          {getuserdata.map((element, id) => {
          return (
            <tr key={id}>
              <td>{id+1}</td>
              <td>{element.name}</td>
              <td>{element.email_id}</td>
              <td>{element.contact}</td>
              <td>{element.cnic}</td>
              {/* <td>{element.shareables}</td> */}
              <td>
                <NavLink to ={`/viewEmployee/${element._id}`} ><i className="fa-solid fa-eye"></i></NavLink> &nbsp;
                <NavLink to = {`/EditEmployee/${element._id}`}><i className="fa-solid fa-pencil"></i></NavLink> &nbsp;
                <i className="fa-solid fa-trash" onClick={()=>deleteUser(element._id )}></i> &nbsp;
              </td>
              {/* <td>{val.details}</td> */}
            </tr>
          )
        })}

        </table>
        </div>
      </div>
    </div>

    

  </div>
  )
}



export default Employee
