
import bcrypt from 'bcrypt'
import User from '../models/user_model.js'



export const userSignup = async (req, res,next) => {
  const { username, email, password } = req.body;
  try {
    if(username == ""|| email == ""|| password==''){res,status(500).json("all fields are required")}
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    console.log(newUser);
    await newUser.save(); 
    res.status(200).json({ message: "User registered" });
  } catch (error) {
   next(error)
  }
};
