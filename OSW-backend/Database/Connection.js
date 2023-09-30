require("dotenv").config({ path: "./.env" });
const URL = process.env.DBURL;
const mongoose = require("mongoose");

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected To Database...");
  })
  .catch((error) => {
    console.log(error);
  });
