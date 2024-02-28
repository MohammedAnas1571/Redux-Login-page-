
import bcrypt from 'bcrypt'
import User from '../models/user_model.js'



export const userSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
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
    res.status(500).json({ message: error.message });
  }
};
