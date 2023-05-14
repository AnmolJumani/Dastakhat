import mongoose from "mongoose";


const dB_string =
  "mongodb+srv://admin:Admin123@cluster0.8c8dgib.mongodb.net/centralCompanyDB?retryWrites=true&w=majority";

 const conn= mongoose
  .connect(dB_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection start"))
  .catch((err) => console.log(err.message));

export default conn;
  