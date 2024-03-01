import express from  'express';
const router = express.Router();    

import { userSignup,userLogin,googleAuth } from '../controller/authController.js';

router.post("/signup",userSignup)
router.post("/login",userLogin)
router.post("/googleAuth",googleAuth)


export default router 