import React from 'react'
import Navbar from './navbar'

const data = [
  { Label: "UserName", Information: "Habib" },
  { Label: "Email", Information: "habib.edu.pk"},
  { Label: "Phone Number", Information: "03363842521"},

]

const AdminProfile = () => {
  return (

    <div>
        <div className = "main_container"> 
        <Navbar />
  
        <div className="employees_table part_two ">
          <p className="welcome_text">Admin Profile</p>
          <div className="employee_table_scroll">
          <table className="employee_table_main">
            <tr>
              <th>Label</th>
              <th>Information</th>
            </tr>
  
            {data.map((val) => {
            return (
              <tr >
                <td>{val.Label}</td>
                <td>{val.Information}</td>
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

export default AdminProfile
