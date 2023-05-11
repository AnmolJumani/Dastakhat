import { Router as expressRouter } from "express";
import { AddFile, getfile } from "../models/ipfs.js";
import {requestCompanyCredentals, declineRequest, requestUserUploadedDocs, acceptReq} from "../controllers/requestController.js"
import {register, login, authenticate, loginUser} from '../controllers/authController.js'
import { deleteUser, indivisualUserData, registerUser, UpdateUser, userData } from "../controllers/userController.js";

const router = expressRouter();


router.get("/", (req, res) => {
  console.log("connect");
});

// REGISTER ADMIN
router.post('/registeradmin', register);

// LOGIN ADMIN
router.post('/loginadmin', login);

// LOGIN USER
router.post('/loginuser', loginUser);

// REGISTER USER
router.post("/register", registerUser);

// GET ALL USER DATA
router.get("/getdata", userData);

// GET INDIVISUAL USER DATA
router.get("/getdata/:id", indivisualUserData);

// UPDATE USER DATA
router.patch("/userupdate/:id", UpdateUser);

// DELETE INDIVISUAL USER
router.delete("/deleteuser/:id", deleteUser);

//NEW REQUEST FOR COMPANY CREDENTIALS
router.patch("/requestcredentials", requestCompanyCredentals);

//DECLINE REQUEST
router.patch('/declinerequest', declineRequest)

// 
router.patch("/requestverification", requestUserUploadedDocs);

router.patch("/requestaccepted", acceptReq);
//  view Documentrs
router.get("/viewdocument/:val",async (req, res)=>{
    try{
      const hashval = req.params.val; 
      console.log(hashval);
      const filePath = 'C:\\Users\\User\\Desktop\\Dastakhat-web-new\\client1\\src\\files\\' + 'requestedFile.pdf';
      const fileContent = await getfile(hashval, filePath)
      .then(function(data) {
        console.log('docment fectched');
      }).catch(function(e){
          console.log(e)
      })
      res.status(201).json(fileContent);      
    }catch(e){
      res.status(422).json(e);
    }
    
});


export default router;
