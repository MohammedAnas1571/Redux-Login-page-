import bcrypt from "bcrypt";
import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import { log } from "console";

export const userSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (username == "" || email == "" || password == "") {
      res, status(500).json("all fields are required");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    await newUser.save();
    res.status(200).json({ message: "User registered" });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("Invalid Credentials");
    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(404).json("password is wrong");
    }
    console.log(process.env.TOKEN);
    const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
      expiresIn: "7d",
    });
    const { password: hashedPassword, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

export const googleAuth = async (req, res) => {
  const { email, name, photo } = req.body;
  console.log(email, name);
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
        expiresIn: "7d",
      });
      const { password: hashedPassword, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ ...rest, message: "jfowpfh" });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      console.log(1);
      const hashedPassword = await bcrypt.hash(generatePassword, 10); // await bcrypt.hash
      console.log(2);

      const newUser = new User({
        email,
        username:
          name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 1000).toString(),
        profilePhoto: photo,
        password: hashedPassword,
      });
      await newUser.save(); // Un-comment to save the new user

      const token = jwt.sign({ id: newUser._id }, process.env.TOKEN, {
        expiresIn: "7d",
      });

      const { password: hashedPassword2, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ ...rest, message: "Created a new account!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("internal error");
  }
};
