const router = require("express").Router();
const {check,validationResult} = require("express-validator");
const db = require("../fake DB/data-db")
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
router.post("/signup", [
    check("username","please provide a valid email").isEmail(),
    check("password", "please provide a valid password which is strong that has 4 minimum characters, 4 minimum uppercase characters, 2 minimum symbols, 4 minimum numbers").isLength({
        min:6
    }).isStrongPassword({
        minLowercase:4,
        minUppercase:4,
        minSymbols:2,
        minNumbers:4
    })
], async (req,res) => {

    const {username,password} = req.body;
    const error = validationResult(req);

    if(!(error.isEmpty()))
    {
        res.status(400).json({
            error:error.array()
        })
    }
    else{
        let flag = false;
        for (let item of db)
        {
          
            if(username == item.email)flag = !flag; 
        }
        let hashpassword = await bcrypt.hash(password,10);//save it on the db
        const token = await jwt.sign({username},process.env.secretKey,{expiresIn:'1h'})
       flag == true ? res.status(400).send("aldready registered") :(res.send(token))
    }
}   
)
router.post("/login",async (req,res) => {
    const {username,password} = req.body;

    let user = db.find((item) => item.email == username);

    if(user)
    {
    
        const stat = await bcrypt.compare(password, user.password);
        if(!stat) return res.status(400).send("bad credentials!!!")
        const token = await jwt.sign({username},process.env.secretKey,{expiresIn:120})
        return res.json({token})
    }
    else{
        return res.status(400).send("Not Registered")
    }
   
})

module.exports = router;