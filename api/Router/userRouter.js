import express from "express"
import { verifyToken } from "../util/verifyUser.js";
import { updatedUser } from "../controller/userController.js";
const router = express.Router();


  router.post("/update/:id",verifyToken,updatedUser)

export default  router;