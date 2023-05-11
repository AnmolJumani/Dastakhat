// import React, { useState } from "react";
// import logo from "../assets/logo.png";
// import "../App.css";
// import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

// const SignUp = () => {
//   const [data, setData] = useState({
//     username: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({
//     username: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Check if there are any errors in the form
//     const formHasErrors = Object.values(errors).some((error) => error !== "");
//     if (!formHasErrors) {
//       // Submit the form if there are no errors
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
//         case "phone":
//           const phoneRegex = /^([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}$/;
//           if (!phoneRegex.test(value)) {
//             error = "Invalid phone number";
//           }
//           break;
//         case "password":
//           const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
//           if (!passwordRegex.test(value)) {
//             error =
//               "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number";
//           }
//           break;
//         default:
//           break;
//       }
//     }

//     if (validation.confirmPassword && value.trim() !== "") {
//       if (value !== data.password) {
//         error = "Passwords do not match";
//       }
//     }

//     setErrors({ ...errors, [property]: error });
//     setData({ ...data, [property]: value });
//   };
  
//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//       <div className="main_container">


//           <div className="loginpage_flex">

//           <div className="part_one">
//             <img src={logo} />
//           </div>

//           <div className="part_two_log">
//             <p className="welcome_text">Create Account</p>
//             <div className="username_input">
//               <p>Username:</p>
//               <input
//               value={data.username}
//               onChange={(e) => handleChange(e, "username", { required: true })}
//               type="text"
//               placeholder="Enter your Username"
//               id="Username"
//               name="Username"
//               className="input-field mt-5"
//               />
//             </div>
//             {errors.username && <p className="error">{errors.username}</p>}
//             <div className="username_input">
//               <p>Email:</p>
//               <input
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
//             </div>
//             {errors.email && <p className="error">{errors.email}</p>}
//             <div className="username_input">
//               <p>Phone Number:</p>
//               <input
//               value={data.phoneNumber}
//               onChange={(e) =>
//                 handleChange(e, "phoneNumber", { type: "phone", required: true })
//               }
//               placeholder="Phone Number "
//               id="phoneNumber"
//               name="phoneNumber"
//               className="input-field mt-5"
//               />
//             </div>
//             {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>} 
//             <div className="password_input">
//               <p>Password:</p>
//               <input
//               value={data.password}
//               onChange={(e) =>
//                 handleChange(e, "password", { type: "password", required: true })
//               }
//               placeholder="Enter your password "
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               className="input-field mt-5"
//               />
//             </div>
//             {errors.password && <p className="error">{errors.password}</p>} 
//             <div className="password_input">
//               <p>Confirm Password:</p>
//               <input
//               value={data.confirmPassword}
//               onChange={(e) =>
//                 handleChange(e, "confirmPassword", { type: "password", required: true })
//               }
//               placeholder="Enter your password again"
//               id="confirm password"
//               name="confirm password"
//               type={showPassword ? "text" : "password"}
//               className="input-field mt-5"
//               />
//             </div>
//             {errors.confirmPassword && <p className="error">{errors.ConfirmPassword}</p>}  
//             <button className="button mt-5" onClick={handleSubmit}>Signup</button>
//             <p><Link to="/login">Already have an account? Login now!</Link></p>

//           </div>
//           </div>


//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../App.css";

import { Link } from "react-router-dom";
import LogsignNav from "./logsignNav";

const SignUp = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if there are any errors in the form
    const formHasErrors = Object.values(errors).some((error) => error !== "");
    if (!formHasErrors) {
      // Submit the form if there are no errors
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
        case "phone":
          const phoneRegex = /^([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}$/;
          if (!phoneRegex.test(value)) {
            error = "Invalid phone number";
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

    if (validation.confirmPassword && value.trim() !== "") {
      if (value !== data.password) {
        error = "Passwords do not match";
      }
    }

    setErrors({ ...errors, [property]: error });
    setData({ ...data, [property]: value });
  };
  
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    
      <div className="main_container"> 
      <LogsignNav/>
          <div className="loginpage_flex">
          <div className="part_one">
            <img src={logo} />
          </div>

          <div className="part_two_log">
            <p className="welcome_text">Create Account</p>
            <div className="username_input">
              <p>Username:</p>
              <input
              value={data.username}
              onChange={(e) => handleChange(e, "username", { required: true })}
              type="text"
              placeholder="Enter your Username"
              id="Username"
              name="Username"
              className="input-field mt-5"
              />
            </div>
            {errors.username && <p className="error">{errors.username}</p>}
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
            <div className="username_input">
              <p>Phone Number:</p>
              <input
              value={data.phoneNumber}
              onChange={(e) =>
                handleChange(e, "phoneNumber", { type: "phone", required: true })
              }
              placeholder="Phone Number "
              id="phoneNumber"
              name="phoneNumber"
              className="input-field mt-5"
              />
            </div>
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>} 
            <div className="password_input">
              <p>Password:</p>
              <input
              value={data.password}
              onChange={(e) =>
                handleChange(e, "password", { type: "password", required: true })
              }
              placeholder="Enter your password "
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="input-field mt-5"
              />
            </div>
            {errors.password && <p className="error">{errors.password}</p>} 
            <div className="password_input">
              <p>Confirm Password:</p>
              <input
              value={data.confirmPassword}
              onChange={(e) =>
                handleChange(e, "confirmPassword", { type: "password", required: true })
              }
              placeholder="Enter your password again"
              id="confirm password"
              name="confirm password"
              type={showPassword ? "text" : "password"}
              className="input-field mt-5"
              />
            </div>
            {errors.confirmPassword && <p className="error">{errors.ConfirmPassword}</p>}  
            <button className="button mt-5" onClick={handleSubmit}>Signup</button>
            <p><Link to="/login">Already have an account? Login now!</Link></p>

          </div>
          </div>


    </div>
  );
};

export default SignUp;

