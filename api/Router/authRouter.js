import express from  'express';
const router = express.Router();    

import { userSignup } from '../controller/authController.js';

router.post("/signup",userSignup)


export default router 