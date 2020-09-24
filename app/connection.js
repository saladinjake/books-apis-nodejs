import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//mongoDB connection string
const url = process.env.DB_URL;

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(()=>{
  console.log('database connected!');})
.catch(err => console.log(err));