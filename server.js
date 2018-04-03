const https = require('https');
const express = require('express');
const fs = require('fs')
const app = express();

app.use(express.static('public'))

app.listen(8080, () =>{
  console.log("listening on 8080")
})

app.get("/", (req, res) => {
  console.log()
  res.sendFile(__dirname + "/mapApp.html");
})
