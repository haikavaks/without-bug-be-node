const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 80;

app.get('/login',(req,res)=>{
  res.end('<h1>home4</h1>')
})

app.post('/login',(req,res)=>{
  console.log(req.body)
  const userName = req.body.userName
  const user = {name : userName}
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json ({accessToken})
})

app.listen(PORT, ()=>{
  console.log('here');
})
