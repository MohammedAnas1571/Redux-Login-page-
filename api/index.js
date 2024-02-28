import express from 'express'
import mongoose from 'mongoose'
import dotenv from  'dotenv'
dotenv.config()
const app = express();
import  userRoutes from './Router/userRouter.js'
import authRouter from './Router/authRouter.js'
mongoose.connect(process.env.MONGO).then(()=>console.log(" mongo db connected")).catch(error=>console.log(error.message))

app.use(express.json())
app.use("/",userRoutes)
app.use("/auth",authRouter)

const PORT =3000
app.listen(PORT,()=>{
  console.log(`port running at ${PORT}`)
})

