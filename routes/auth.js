const router = require("express").Router();
const {check,validationResult} = require("express-validator");
const db = require("../fake DB/data-db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
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
        let hashpassword = await bcrypt.hash(password,10);
        const token = await jwt.send()
       flag == true ? res.status(400).send("aldready registered") :(res.send("successfully signed In"))
    }
}   
)

module.exports = router;