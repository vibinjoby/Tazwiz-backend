const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
//routes
const register = require("./routes/register");
const signin = require("./routes/login");
const addPost = require("./routes/addPost");

//Enabling cors
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use("/register", register);
app.use("/login", signin);
app.use("/addPost", addPost);

app.listen(process.env.PORT || 5000);
