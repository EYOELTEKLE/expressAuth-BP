const jwt = require("jsonwebtoken");
require('dotenv').config();
module.exports = async (req,res,next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(400).send({
            error:[
                "Not Authenticated"
            ]
        })
    }
    try
    {
        let user = jwt.verify(token,process.env.secretKey);
        req.user = user.email;
        next();
    }
    catch
    {
        res.send("Invalid Token still unauthorized!!")
    }
   
}