import bcrypt from "bcrypt";
import User from "../models/user_model.js";


export const updatedUser = async (req, res) => {
    console.log(req.params.id ,   req.user.id);
    
  if (req.user.id !== req.params.id) {
    return res.status(401).json("you can only Update only your Account");
  }
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
      console.log(2);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePhoto: req.body.profilePhoto,
        },
      },
      { new: true }
    );
    console.log(3);
    const {password,...rest} = updatedUser._doc
     res.status(200).json(rest)
    console.log(4);
    // res.status(200).json(...rest);
  } catch (error) {
    console.log(6);
    res.status(500).json("Server error");
  }
};
