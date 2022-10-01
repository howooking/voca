//routes
const vocaRoutes = require("./routes/vocaRoutes");

//express app
const express = require("express");
const app = express();

//port
const port = 4000;

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//vocabulary routes
app.use("/api/voca", vocaRoutes);

//mongoDB connection
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://howoo:1234@cluster0.sxaggeo.mongodb.net/voca?retryWrites=true&w=majority"
  )
  .then(() => {
    //listen for request
    app.listen(port, () => {
      console.log(`connected to DB and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
