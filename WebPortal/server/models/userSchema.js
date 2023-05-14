import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email_id: {
        type: String,
        required: true
    },  
    name : {
        type: String,
        required : true
    },
    cnic:{
        type: String
    },
    designation:{
        type:String
    },
    contact: {
        type: String
    },
    join_date:{
        type: Date
    },
    birth_date:{
        type: Date
    },
    address:{
        type: String
    },
    shareables:{
        type: Number
    },
    password:{
        type: String
    },
    attested_docs: [{
        doc_id:{type: String}, // none..
        doc_name:{type: String}, // filename
        doc_status:{type: String},// verified/ non verified
        doc_format:{type: String}, 
        doc_hash: {type: String}, // document hash from ipfs
        block_hash:{type:String},// transaction hash from multichain
        doc_url:{type:String}
    }],
    requests: [{
        type:{type: String}, // company credentials or user uploaded
        status: {type: String}, // resolved or waiting
        content: {type: String}, // doc data if useruploaded
        date: {type: Date} 

    }]
});
// 
const users= new mongoose.model('employee',userSchema);



export default users; 