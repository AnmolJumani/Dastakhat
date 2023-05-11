import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  
    username: {type:String},
    email_id: {type: String},
    phone_no: {type: String},
    password: {type: String}
})

const Admin = new mongoose.model('admin', adminSchema);

export default Admin;