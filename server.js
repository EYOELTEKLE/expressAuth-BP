const express = require('express')
const app = express();

app.use(express.json())
const jwt = require('jsonwebtoken')
const auth = require("./routes/auth");
const hello = require("./routes/fallback");
const posts = require("./routes/posts");
const invalid = require("./routes/invalid");
//parses the body req to a json

app.use("/", hello);
app.use("/auth",auth);
app.use("/posts",posts)
app.use('*',invalid)


app.listen(3000);