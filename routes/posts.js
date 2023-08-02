const router = require("express").Router();
const check = require("../middleware/check-auth")

const posts = require("../data/posts-data");
router.get("/", check,(req,res) => {
    res.json(posts);
}   
)

module.exports = router;