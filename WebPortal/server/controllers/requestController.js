import users from "../models/userSchema.js";
import  _ from 'lodash'

// export const reqContent= async(req, res, next)=>{
//   const{_id, req_id}= 
//   try{
//     const preuser = await users.findOne({_id:_id, req_id:req_id});
//   }catch(e){

//   }

// }

export const declineRequest = async(req, res, next)=>{
  try{

    const id = req.body.user_id;
    const req_to_del = req.body.req_id
    const updateduser = await users.update(
      {user_id : id , "requests._id":req_to_del} ,
      {$set: {"requests.$.status": 'declined'}},
      {new: true}).then((d)=>{console.log(d)});
    console.log('updated user',updateduser);
    res.status(201).json('updated');
  } catch (error) {
    console.log('error in updating user : ', error);
    res.status(422).json(error);
  }
}

export const acceptReq = async(req, res, next)=>{
  try{

    const id = req.body.user_id;
    const req_to_del = req.body.req_id
    const updateduser = await users.update(
      {user_id : id , "requests._id":req_to_del} ,
      {$set: {"requests.$.status": 'accepted'}},
      {new: true}).then((d)=>{console.log(d)});
    console.log('updated user',updateduser);
    res.status(201).json('updated');
  } catch (error) {
    console.log('error in updating user : ', error);
    res.status(422).json(error);
  }
}
export const requestCompanyCredentals = async(req, res, next)=>{
    const  email_id= req.body.email_id;
    console.log('line 45 ', email_id)
    try{
      const preuser = await users.findOne({ email_id: email_id });
      const cred_requsts = {type:"company credentials",
                            status: "waiting", // resolved, waiting, declined
                            content: ""}
      console.log('line 51 ',preuser)
      var myreq= preuser.requests ;
      if (myreq.length>0){
        for (let i=0; i< myreq.length; i++){
          console.log(myreq[i]['type']=== cred_requsts['type'])
          if (_.isEqual(myreq[i]['type'], cred_requsts['type']) & _.isEqual(myreq[i]['status'], "waiting")){
            console.log('request already in process')
            res.status(201).json(preuser);
            return;
          }
        }
      }
      
      await preuser.requests.addToSet(cred_requsts);
      await preuser.save();
      console.log('preuser',preuser);
      res.status(201).json(preuser);
  
    }catch(e){
      console.log(e);
      console.log('error in updating user : ', e);
      res.status(422).json(e);
    }
  }

  export const requestUserUploadedDocs = async(req, res, next)=>{
    const  email_id= req.body.email_id; 
    const url = req.body.url;
    const content = ""
    // change req status add doc to doclist
    try{
      const preuser = await users.findOne({ email_id: email_id });
      const cred_requsts = {type:"user uploaded",
                            status: "waiting", // resolved, waiting, declined
                            content: url}
  
      var myreq= preuser.requests ;
      if (myreq.length>0){
        for (let i=0; i< myreq.length; i++){
          console.log(myreq[i]['type']=== cred_requsts['type'])
          if (_.isEqual(myreq[i]['type'], cred_requsts['type']) & _.isEqual(myreq[i]['status'], "waiting")){
            console.log('request already in process')
            res.status(201).json(preuser);
            return;
          }
        }
      }
      
      await preuser.requests.addToSet(cred_requsts);
      await preuser.save();
      console.log('preuser',preuser);
      res.status(201).json(preuser);
  
    }catch(e){
      console.log(e);
      console.log('error in updating user : ', e);
      res.status(422).json(e);
    }
  }
