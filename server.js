const express = require("express");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(express.json());

app.get("/login", (req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  // const expire = req.body.expires
  let user = { name: username, title: title };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  console.log(accessToken, "token");
  res.cookie("key", accessToken, {
    expires: new Date(Date.now() + 600000),
    httpOnly: true,
    secure: true,
  });
  res.json({ accessToken: accessToken });
  const veirfyToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  console.log(veirfyToken);
});

app.listen(5000, () => {
  console.log("Server is runing!");
});

/////////////////////////////////////////////////////////

// const jwt = require('jsonwebtoken')

// const generatToken = (data) => {
//     const token = jwt.sign(data, 'praveen')
//     return token

// }
// const accessToken = (req,res,next) => {
//     const token=req.headers.cookie.split("=")[1]
//     // const token=req.headers.cookie.split("=")[0]
//     const decoded = jwt.verify(token,'praveen')
//     req.data=decoded
//     next()

// }
// module.exports ={generatToken,accessToken}
