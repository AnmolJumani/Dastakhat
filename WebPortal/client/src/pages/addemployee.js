import React, { useState } from "react";
import "../App.css";
import Navbar from "./navbar";
import { storage } from '../firebase/firebase';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";


const AddEmployee = () => {

  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileContent, setFileContent] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    console.log(setSelectedFile);
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      setFileContent(e.target.result);
    };
  };
  const [inpval, setINP] = useState({
    name: "",
    email: "",
    cnic: "",
    designation: "",
    contact: "",
    join_date: "",
    birth_date: "",
    address: "",
    shareables: "",
    attested_docs: null,
    image: null
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    cnic: "",
    designation: "",
    contact: "",
    join_date: "",
    birth_date: "",
    address: "",
    shareables: "",
    attested_docs: "",
    image: ""
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  
  const getUrl = (email_id)=>{
    return new Promise(function(res,rej){
      console.log('selectedfile',selectedFile);
    const storageRef = ref(storage, `${email_id}/Habib University/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress);
        getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
          // console.log({ downloadURL })
          const doc_url = await downloadURL;
          res(downloadURL)
          console.log('saved url', doc_url)
          return doc_url
        })
      },
      (error) => {
        console.log("errot in getting firebase url", error);
        // return error
        rej(error);
      },
      );

    })
    
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if there are any errors in the form
    const formHasErrors = Object.values(errors).some((error) => error !== "");
    if (!formHasErrors) {
      
      // Submit the form if there are no errors
      console.log('no errorr heree!')
      //   const addInpData = async (e) => {
      e.preventDefault();
      console.log(inpval);
      
      const {
        email,
        name,
        cnic,
        designation,
        contact,
        join_date,
        birth_date,
        address,
      } = inpval;
      // const contact = inpval.phone;

      let doc_url ="";
      if (isFilePicked){
        doc_url= await getUrl(inpval.email_id);
      }
// ------------------------------------------------------
      const inp_doc = {
        doc_id: "",
        doc_name: String(selectedFile.name),
        doc_status: "not verified",
        doc_format: String(selectedFile.type),
        doc_hash: "",
        block_hash: "",
        doc_url : doc_url
      };

      const attested_docs=[]
      if(isFilePicked){
        attested_docs.push(inp_doc);
      }
      

      const shareables = attested_docs.length;
      console.log('inpval', email,
      name,
      cnic,
      designation,
      contact,
      join_date,
      birth_date,
      address);
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          cnic,
          designation,
          contact,
          join_date,
          birth_date,
          address,
          shareables,
          attested_docs,
          fileContent,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (res.status === 404 || !data || res.status === 422) {
        alert(res.status);
        alert("error!");
      } else {
        alert(res.status);
        alert("data added");
        // docUpload();
      }
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
          case "Email":
            const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
            if (!emailRegex.test(value)) {
              error = "Invalid email address";
            }
            break;
          case "Cnic":
            const cnicRegex = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
            if (!cnicRegex.test(value)) {
              error = "Invalid CNIC number";
            }
            break;
          case "contact":
            const contactRegex = /^(\+92|0)?(3\d{2}|5\d{2}|7\d{1}|8\d{2})\d{7}$/;
            if (!value.trim() || !contactRegex.test(value)) {
              error = "Invalid contact number";
            }
          break;            
          case "Date":
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(value)) {
              error = "Invalid date format (YYYY-MM-DD)";
            }else {
              const date = new Date(value);
              const now = new Date();
            if (date > now) {
              error = `${property} cannot be a future date`;
            }
          }
          break;
                
        case "Number":
          const numberRegex = /^[0-9]+$/;
          if (!numberRegex.test(value)) {
            error = "Invalid number";
          }
          break;
        case "File":
          if (!value) {
            error = "File is required";
          }
          break;
        default:
          break;
      }
    }
    
    if (validation.age && value.trim() !== "") {
      const birth_date = new Date(value);
      const now = new Date();
      const ageInMilliseconds = now - birth_date;
      const ageInYears = ageInMilliseconds / 1000 / 60 / 60 / 24 / 365;
      if (ageInYears < 18) {
        error = "Person must be over 18 years old";
      }
    }

    setErrors({ ...errors, [property]: error });
    setINP({ ...inpval, [property]: value });
    setdata();
  };
  return (
    <div>
      <Navbar/>
      <div className="main_container">
        
      <div className="part_two add_employee">
        <p className="welcome_text">Add Employee</p>
        <label htmlFor="Upload your Image">Image</label>
        <input
        value = {inpval.image}
        onChange = {(e) => 
          handleChange(e, "image", {type: "file", required: true})
        }
            type="file"
            placeholder="Upload Image"
            name="image"
            id="image"
            accept="image/*"
            className="input-field mt-5"
          /> 
        <label htmlFor="Name">Name</label>
        <input
          value={inpval.name}
          onChange={(e) => handleChange(e, "name", { required: true })}
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          className="input-field mt-5"
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <label htmlFor="Email">Email</label>
        <input
          value={inpval.email}
          onChange={(e) =>
            handleChange(e, "email", { type: "Email", required: true })
          }
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
          className="input-field mt-5"
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <label htmlFor="CNIC">CNIC</label>
        <input
          value={inpval.cnic}
          onChange={(e) =>
            handleChange(e, "cnic", { type: "Cnic", required: true })
          }
          placeholder="CNIC"
          id="cnic"
          name="cnic"
          className="input-field mt-5"
        />
        {errors.cnic && <p className="error">{errors.cnic}</p>}
        <label htmlFor="Designation">Designation</label>
        <input
          value={inpval.designation}
          onChange={(e) => handleChange(e, "designation", { required: true })}
          type="text"
          placeholder="designation"
          id="designation"
          name="designation"
          className="input-field mt-5"
        />
        {errors.designation && <p className="error">{errors.designation}</p>}
        <label htmlFor="contact">Contact</label>
        <input
          value={inpval.contact}
          onChange={(e) =>
            handleChange(e, "contact", { type: "contact", required: true })
          }
          type="tel"
          placeholder="contact Number "
          id="contact"
          name="contact"
          className="input-field mt-5"
        />
        {errors.contact && <p className="error">{errors.contact}</p>}

        <label htmlFor="Join Date">Join Date</label>
        <input
          value={inpval.join_date}
          onChange={(e) =>
            handleChange(e, "join_date", { type: "date", required: true })
          }
          type="date"
          placeholder="joinDate"
          id="joinDate"
          name="joinDate"
          className="input-field mt-5" 
          onFocus={(e)=>e.target.type='date'}
          max={new Date().toISOString().slice(0, 10)}
        />
        {errors.join_date && <p className="error">{errors.join_date}</p>}
        <label htmlFor="Birth Date">Birth Date</label>
        <input
          value={inpval.birth_date}
          onChange={(e) =>
            handleChange(e, "birth_date", { type: "date", age: true, required: true })
          }
          type="date"
          placeholder="Birth date"
          id="birthDate"
          name="birthDate"
          className="input-field mt-5" 
          onFocus={(e)=>e.target.type='date'}
          max={new Date().toISOString().slice(0, 10)}
        />
        {errors.birth_date && <p className="error">{errors.birth_date}</p>}
        <label htmlFor="Address">Address</label>
        <input
          value={inpval.address}
          onChange={(e) => handleChange(e, "address", { required: true })}
          type="text"
          placeholder="Address"
          id="adresss"
          name="address"
          className="input-field mt-5"
        />
        {errors.address && <p className="error">{errors.address}</p>}
        {/* <label htmlFor="Shareables">Shareables</label>
        <input
          value={inpval.shareables}
          onChange={(e) =>
            handleChange(e, "shareables", { type: "number", required: true })
          }
          type="number"
          placeholder="Enter Num of shareables"
          id="shareable"
          name="shareable"
          className="input-field mt-5 "
        /> */}
        <label htmlFor="Attested Documents">Attested Documents</label>
        <input
          value = {inpval.attested_docs}
          // onChange = {(e) => 
          //   handleChange(e, "attested_docs", {type: "file", required: true})
          // }
          onChange={changeHandler}
          type="file"
          name="file"
          id = "attested_docs"
          className="input-field mt-5"
          />

        <button className="button mt-5" onClick={handleSubmit}>Submit</button>

      </div>



      </div>
    </div>
  );
};

export default AddEmployee;