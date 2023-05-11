import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import users from '../models/userSchema.js'
import {createStream, liststreams, publish_to_stream, subscribe_to_stream } from "../models/multichain.js";
import { AddFile, getfile } from "../models/ipfs.js";
import  _ from 'lodash'

const remove_dash=(cnic)=>{
  let r = ""
  for (let i=0; i<cnic.length; i++){
    // console.log(cnic[i])
    if (cnic[i]!="-"){
      r+=cnic[i];
    }
  }
  return r
}
export const registerUser = async (req, res, next)=>{
  
  
  const {  email,  name,  cnic,  designation,  contact,  join_date,  birth_date,  address,  shareables,  attested_docs,  fileContent  } = req.body;
  const password = 'User123';
  const hashedPass = await bcrypt.hash(password, 10);
  if (!name || !email || !cnic) {
    console.log(cnic, email, name)
    res.status(422).json("please fill the required filds");
    console.log("please fill te required fields..");
    return;
  }

  const preuser = await users.findOne({ email_id: email });
  if (preuser) {
    console.log("this user already exists");
    res.status(422).json("this user already exists");
    return;
  } else {
    // await liststreams().then((data)=>{console.log(data)})
    const cnic_ = remove_dash(String(cnic))
    // create new stream
    await createStream(String(cnic_))
      .then(function(data) {
        console.log("stream created");
      })
      .catch(function(data) {
        console.log("couldnt create steam");
        console.log(data);
        //  return with error
      });
    if (attested_docs.length>0){
        //  uploading to ipfs
      const fileHash = await AddFile(attested_docs[0].doc_name, fileContent)
      .then(function(data) {
        console.log("doc uploaded on ipfs successfully with hash : ", data);
        attested_docs[0].doc_hash = data;
      })
      .catch(function(e) {
        console.log("couldnt upload on ipfs");
        console.log(e);
      });
    
    // publish new file data to stream
    const transactionID = await publish_to_stream(  String(cnic_),  attested_docs[0].doc_name,  { doc_hash: fileHash })
      .then(function(data) {
        console.log("document pushed on chain successfully tx Id: ", data);
        
      })
      .catch(function(e) {
        console.log("document not pushed on chain");
        console.log(e);
      });
    attested_docs[0].block_hash = transactionID;

    attested_docs[0].doc_status = 'verified';
    console.log('idhar : ',attested_docs);
    }
    
    try {
      const adduser = await new users({
        email_id:email,
        name: name,
        cnic: cnic,
        designation: designation,
        contact: contact,
        join_date: join_date,
        birth_date: birth_date,
        address: address,
        password: hashedPass,
        shareables: shareables,
        attested_docs: attested_docs,
      });
      await adduser.save();

      res.status(201).json(adduser);
      console.log(adduser);

      
      return;
    } catch (err) {
      // res.status(422).json(err);
      console.log("error in adding user");
      console.log(err);
    }

    
  }
};

export const UpdateUser = async (req, res, next)=>{
  const {  email_id,  name,  cnic,  designation,  contact,  join_date,  birth_date,  address,  shareables, inp_doc,  fileContent  } = req.body;
  console.log('update req body:');
  console.log(email_id,  name,  cnic,  designation,  contact,  join_date,  birth_date,  address,  shareables, inp_doc,  fileContent);
  try {
    const { id } = req.params
    const fileHash = await AddFile(inp_doc.doc_name, fileContent)
    .then(function(data) {
      console.log("doc uploaded on ipfs successfully with hash : ", data);
      inp_doc.doc_hash = data;
    })
    .catch(function(e) {
      console.log("couldnt upload on ipfs");
      console.log(e);
    });
    console.log('doc Hash', fileHash);
    const cnic_ = remove_dash(String(cnic))
    //  publish new file data to stream
    const transactionID = await publish_to_stream(  cnic_,  inp_doc.doc_name,  { doc_hash: fileHash })
      .then(function(data) {
        console.log("document pushed on chain successfully tx Id: ", data);
        
      })
      .catch(function(e) {
        console.log("document not pushed on chain");
        console.log(e);
      });
    inp_doc.block_hash = transactionID;


  //  }
    
    inp_doc.doc_status = 'verified';
    console.log('inp_doc', inp_doc);
    
    
    const updateuser = await users.findByIdAndUpdate(id, {
      email_id:email_id,
      name: name,
      cnic: cnic,
      designation: designation,
      contact: contact,
      join_date: join_date,
      birth_date: birth_date,
      address: address,
      shareables: shareables,
      $push:{"attested_docs":inp_doc}}, {
      new: true
    });
    console.log('updated user',updateuser);
    res.status(201).json(updateuser);
  } catch (error) {
    console.log('error in updating user : ', error);
    res.status(422).json(error);
  }
}

export const userData = async(req, res, next)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata);
        console.log(userdata);
      } catch (error) {
        res.status(422).json(error);
        console.log("i cant get data :(");
      }
};

export const indivisualUserData = async(req, res, next)=>{
    try {
        const { id } = req.params;
        const indivisualUser = await users.findById({ _id: id });
        console.log(indivisualUser);
        res.status(201).json(indivisualUser);
      } catch (error) {
        res.status(422).json(error);
      }
}

export const deleteUser = async(req, res, next)=>{
    try {
        const { id } = req.params;
        const deleteuser = await users.findByIdAndDelete({ _id: id });
        console.log(deleteuser);
        res.status(201).json(deleteuser);
      } catch (error) {
        res.status(422).json(error);
      }
}