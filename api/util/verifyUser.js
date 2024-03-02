import jwt from "jsonwebtoken"
export const verifyToken = (req,res,next) =>{
   
    const token = req.cookies.access_token
    console.log((token));
   
    if(!token) return  res.status(401).json("You need to login")
    jwt.verify(token,process.env.TOKEN,(err,user)=>{
if(err) return res.status(403).json("Token is not Valid")

req.user = user
next()
})
}