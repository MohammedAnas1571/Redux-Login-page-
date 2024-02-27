import express from 'express'
import mongoose from 'mongoose'
import dotenv from  'dotenv'
dotenv.config()
const app = express();
mongoose.connect(process.env.MONGO).then(()=>console.log(" mongo db connected")).catch(error=>console.log(error.message))

const PORT =3000
app.listen(PORT,()=>{
  console.log(`port running at ${PORT}`)
})
