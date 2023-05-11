import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Navbar from "./navbar";
import { Link } from "react-router-dom";

export const EditEmployee = () => {

  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileContent, setFileContent] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    // setFileContent(event.target.files[0])
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      setFileContent(e.target.result);
    };

    
  };
  const { id } = useParams("");

  const [inpval, setINP] = useState({
    email_id: "",
    name: "",
    cnic: "",
    designation: "",
    contact: "",
    join_date: "",
    birth_date: "",
    address: "",
    shareables: "",
    attested_docs: [],
    image: null,
  });
  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const getData = async (e) => {
    const res = await fetch(`/getdata/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 404 || !data || res.status === 422) {
      alert(res.status);
      console.log("error!");
    } else {
      console.log('populating inpval as: ', data)
      setINP(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  
  const updateMyuser = async (e) => {
    
    e.preventDefault();
    console.log('submit was clicked');
    
    const {
      email_id,
      name,
      cnic,
      designation,
      contact,
      join_date,
      birth_date,
      address,
      shareables,
      attested_docs,
    } = inpval;
    const inp_doc = {
      doc_id: "",
      doc_name: String(selectedFile.name),
      doc_status: "not verified",
      doc_format: String(selectedFile.type),
      doc_hash: "",
      block_hash: "",
    };
    // const new_attested_docs=[];
    // new_attested_docs.push(inp_doc);
  
    inpval.shareables +=  1;

    const res2 = await fetch(`/userupdate/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email_id,
        name,
        cnic,
        designation,
        contact,
        join_date,
        birth_date,
        address,
        shareables,
        inp_doc,
        fileContent,
      }),
    });
    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      alert(res2.status);
      alert("user updated!");
    }
  };

  return (
    <div>

      <Navbar />
      <div className="main_container">
        <div className="part_two add_employee">
          <p className="welcome_text">Edit Employee</p>

          <label>Name</label>
          <input
            onChange={setdata}
            value={inpval.name}
            type="text"
            id="name"
            name="name"
            className="input-field mt-5"
          />

          <label>Email</label>
          <input
            onChange={setdata}
            value={inpval.email_id}
            type="email"
            id="email"
            name="email"
            className="input-field mt-5"
          />
          <label>CNIC #</label>
          <input
            onChange={setdata}
            value={inpval.cnic}
            type="text"
            placeholder="cnic"
            id="cnic"
            name="cnic"
            className="input-field mt-5"
          />
          <label>Designation</label>
          <input
            onChange={setdata}
            value={inpval.designation}
            type="text"
            placeholder="designation"
            id="designation"
            name="designation"
            className="input-field mt-5"
          />
          <label>Contact</label>
          <input
            onChange={setdata}
            value={inpval.contact}
            placeholder="Phone Number "
            id="contact"
            name="contact"
            className="input-field mt-5"
          />
           <label>Join Date</label>
          <input
            onChange={setdata}
            type="date"
            value={inpval.join_date}
            id="joinDate"
            name="joinDate"
            className="input-field mt-5"
          />
          <label>Birth Date</label>
          <input
            onChange={setdata}
            type="date"
            value={inpval.birth_date}
            id="birthDate"
            name="birthDate"
            className="input-field mt-5"
          />
          <label>Address</label>
          <input
            onChange={setdata}
            value={inpval.address}
            type="text"
            placeholder="Address"
            id="adresss"
            name="address"
            className="input-field mt-5"
          />
          {/* <label>Shareables</label>
          <input
            onChange={setdata}
            value={inpval.shareables}
            type="number"
            placeholder="Enter Num of shareables"
            id="shareable"
            name="shareable"
            className="input-field mt-5 "
          /> */}
          <label>Upload Company Credentials</label>
          <input
            defaultValue={''}
            // value={inpval.attested_docs[0]}
            onChange={changeHandler}
            type="file"
            name="file"
            id="attested_docs"
            className="input-field mt-5"
          />
            {/* <div className="uploaded_docs">
              <h3>Uploaded documents:</h3>
              <Link to="#" ><p> dummy<i className="custom_eye fa-solid fa-eye"></i> </p></Link>
            </div> */}
          <button onMouseDown={updateMyuser} class="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;


