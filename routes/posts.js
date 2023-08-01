const router = require("express").Router();

const posts = require("../data/posts-data");
router.get("/", (req,res) => {
    res.json(posts);
}   
)

module.exports = router;