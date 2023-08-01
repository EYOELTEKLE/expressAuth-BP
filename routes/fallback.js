const router = require("express").Router();


router.get("/", (req,res) => {
    res.send("API Server")
}   
)

module.exports = router;