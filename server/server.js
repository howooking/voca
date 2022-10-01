//.env
require("dotenv").config();

//express app
const express = require("express");
const app = express();

//port
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`server is on at port ${port}`);
});
