import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import { storage } from '../firebase/firebase';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";

export const EditEmployee_forDocs = () => {

  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileContent, setFileContent] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
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
  
  const updateMyuser = async (e) => {
    
    e.preventDefault();
    console.log('submit was clicked');
    if (isFilePicked){
      console.log('selectedfile',selectedFile);
      const storageRef = ref(storage, `${inpval.email_id}/Habib University/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(progress);
        },
        (error) => {
          alert(error);
        },
    );}
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
      doc_url:""
    };
    // const new_attested_docs=[];
    // new_attested_docs.push(inp_doc);
    const doc_url = await getUrl(inpval.email_id);
      console.log('here ',doc_url)
      inp_doc.doc_url = doc_url;
    // inpval.shareables +=  1;

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
            type="date"
            name="join_date"
            onChange={setdata}
            value={inpval.join_date}
            className="form-control"
            id="exampleInputPassword1"
          />
          <label>Birth Date</label>
          <input
            type="date"
            name="birth_date"
            onChange={setdata}
            value={inpval.birth_date}
            className="form-control"
            id="exampleInputPassword1"
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
            
            <table className="employee_table_main">
          <tr>
            <th>#</th>
            <th>Document</th>
            <th>status</th>
            {/* <th>Contact</th>
            <th>CNIC</th> */}
            {/* <th>Shareables</th> */}
            {/* <th>Actions</th> */}
          </tr>

          {inpval.attested_docs.map((element, id) => {
          return (
            <tr key={id}>
              <td>{id+1}</td>
              <td>{element.doc_name}</td>
              <td>{element.doc_status}</td>
              {/* <td>{element.contact}</td>
              <td>{element.cnic}</td> */}
              {/* <td>{element.shareables}</td> */}
              
              {/* <td>{val.details}</td> */}
            </tr>
          )
        })}

        </table>

          <button onMouseDown={updateMyuser} class="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee_forDocs;


