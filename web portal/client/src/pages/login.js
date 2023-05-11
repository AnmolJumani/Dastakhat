// import React, { useState } from "react";
// import "../App.css";
// import logo from "../assets/logo.png";
// import { Link, NavLink, useNavigate } from "react-router-dom";

// const Login = () => {
//   const Navigate = useNavigate();
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
  
//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async(e) => {
//     console.log('handling submission');
//     e.preventDefault();
//     // Check if there are any errors in the form
//     const formHasErrors = Object.values(errors).some((error) => error !== "");
//     if (!formHasErrors) {
      
//       // Submit the form if there are no errors
//       const res = await fetch("/loginadmin",{
//         method: "POST",
//         headers:{"Content-Type": 'application/json'},
//         body: JSON.stringify(data),
//       })
//       const response = await res.json();
//       console.log('response : ',response);
//       if(res.status === 404 || res.status === 422){
//         // console.log(response.message)
//         alert('Invalid credentials');
//       }else{
//         // alert(res.status);
//         Navigate('/dashboard');
//       }
//       console.log(data);
//       // ...
//     } else {
//       console.log(errors);
//     }
//   };
  
//   const handleChange = (e, property, validation) => {
//     const { value } = e.target;
//     let error = "";
  
//     if (validation.required && value.trim() === "") {
//       error = `${property} is required`;
//     }
  
//     if (validation.type && value.trim() !== "") {
//       switch (validation.type) {
//         case "email":
//           const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
//           if (!emailRegex.test(value)) {
//             error = "Invalid email address";
//           }
//           break;
//           case "password":
//             const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
//             if (!passwordRegex.test(value)) {
//               error =
//                 "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number";
//             }
//             break;
//         default:
//           break;
//       }
//     }
  
//     setErrors({ ...errors, [property]: error });
//     setData({ ...data, [property]: value });
//   };
  
  
//   return (
//     <div className ="main_container">
//       <div className="loginpage_flex">

//       <div className="part_one">
//         <img src={logo} />
        
//       </div>
//       <div className="part_two_log">
//         <p className="welcome_text">Welcome back!</p>
//         <div className="username_input">
//           <p>Email:</p>
//           <input
//               value={data.email}
//               onChange={(e) =>
//                 handleChange(e, "email", { type: "email", required: true })
//               }
//               type="email"
//               placeholder="Enter your email"
//               id="email"
//               name="email"
//               className="input-field mt-5"
//               />
//         </div>
//         {errors.email && <p className="error">{errors.email}</p>}
//         <div className="password_input">
//           <p>Password:</p>
//           <input
//               value={data.password}
//               onChange={(e) =>
//                 handleChange(e, "password", { type: "password", required: true })
//               }
//               type="password"
//               placeholder="Enter your password "
//               id="password"
//               name="password"
//               className="input-field mt-5"
//               />
//         </div>
//         {errors.password && <p className="error">{errors.password}</p>} 
//         <button className="button mt-5" onMouseDown={handleSubmit}>Login</button>
//         <p><Link to="#">Forgot Password?</Link></p>
//         <p><Link to="/signup">Don't have an account? Signup now!</Link></p>

//       </div>
//       </div>
       
//       </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import "../App.css";
import logo from "../assets/logo.png";
import { Link,useNavigate } from "react-router-dom";
import LogsignNav from "./logsignNav";

const Login = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Check if there are any errors in the form
    const formHasErrors = Object.values(errors).some((error) => error !== "");
    if (!formHasErrors) {
      // Submit the form if there are no errors
      const res = await fetch("/loginadmin",{
        method: "POST",
        headers:{"Content-Type": 'application/json'},
        body: JSON.stringify(data),
      })
      const response = await res.json();
      console.log('response : ',response);
      if(res.status === 404 || res.status === 422){
        // console.log(response.message)
        alert('Invalid credentials');
      }else{
        // alert(res.status);
        Navigate('/dashboard');
      }
      console.log(data);
      
      // ...
    } else {
      console.log(errors);
    }
  };
  
  const handleChange = (e, property, validation) => {
    const { value } = e.target;
    let error = "";
  
    if (validation.required && value.trim() === "") {
      error = `${property} is required`;
    }
  
    if (validation.type && value.trim() !== "") {
      switch (validation.type) {
        case "email":
          const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
          if (!emailRegex.test(value)) {
            error = "Invalid email address";
          }
          break;
          case "password":
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            if (!passwordRegex.test(value)) {
              error =
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number";
            }
            break;
        default:
          break;
      }
    }
  
    setErrors({ ...errors, [property]: error });
    setData({ ...data, [property]: value });
  };
  
  
  return (
    <div className ="main_container">
      <div className="loginpage_flex">
      <LogsignNav/>
      <div className="part_one">
        <img src={logo} />
        
      </div>
      <div className="part_two_log">
        
        <p className="welcome_text">Welcome back!</p>
        <div className="username_input">
          <p>Email:</p>
          <input
              value={data.email}
              onChange={(e) =>
                handleChange(e, "email", { type: "email", required: true })
              }
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              className="input-field mt-5"
              />
        </div>
        {errors.email && <p className="error">{errors.email}</p>}
        <div className="password_input">
          <p>Password:</p>
          <input
              value={data.password}
              onChange={(e) =>
                handleChange(e, "password", { type: "password", required: true })
              }
              type="password"
              placeholder="Enter your password "
              id="password"
              name="password"
              className="input-field mt-5"
              />
        </div>
        {errors.password && <p className="error">{errors.password}</p>} 
        <button className="button mt-5" onClick={handleSubmit}>Login</button>
        <p><Link to="#">Forgot Password?</Link></p>
        <p><Link to="/signup">Don't have an account? Signup now!</Link></p>

      </div>
      </div>
       
      </div>
  );
};

export default Login;
