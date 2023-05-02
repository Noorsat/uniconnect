const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require('multer');
const cors = require("cors");
require("dotenv").config();
const PORT = 5000;

const authRoutes = require("./routes/users");
const userStoriesRoutes = require("./routes/userStoreies")
const clubsRoutes = require("./routes/clubs");
const eventsRoutes = require("./routes/events");
const spacesRoutes = require("./routes/spaces");
 
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
app.use("/stories", userStoriesRoutes);
app.use("/clubs", clubsRoutes)
app.use("/event", eventsRoutes)
app.use("/space", spacesRoutes)

app.use('/', express.static('uploads'))

app.listen(PORT, () => {
  console.log("Server lauching in port: " + PORT);
});
