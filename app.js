const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./Routes/userRoute");
const itemRoute = require("./Routes/itemRoute");
//const { authorize } = require("./Middlewares/authorization");
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("you are now connect with Database..");
    app.listen(process.env.PORT || 8000, () => {
      console.log("Ready To Listen To You :)");
    });
  })
  .catch((error) => {
    console.log("Error to connect the DB", error);
  });

//settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(express.static("public"));
//routes

app.use(express.urlencoded({ extended: true }));
app.use(userRoute);

app.use(itemRoute);

//not found page

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "notfound.html"));
});

// handle error

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || "Error With Server!" });
});
