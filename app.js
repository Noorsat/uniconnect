const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = 5000;

const authRoutes = require("./routes/users");

mongoose
  .connect('mongodb+srv://user:qwerty123@cluster0.tup4ivx.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Ok")
  })

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use("/users", authRoutes);

app.listen(PORT, () => {
  console.log("Server lauching in port: " + PORT);
});
