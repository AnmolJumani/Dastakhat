import  express  from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import conn from './db/conn.js'
import users from './models/userSchema.js'
import cors from 'cors'
import router from './routes/router.js'


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(router);

const port = 8003;


app.listen(port,()=>{
    console.log(`server is starting at port number ${port}`);
});

