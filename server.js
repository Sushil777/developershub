const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//importing routes
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const users = require("./routes/api/users");

//initializing express
const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongooDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//home route
app.get("/", (req, res) => res.send("Hello World"));

//Use Routes
app.use("/api/posts", posts);
app.use("/api/profile", profile);
app.use("/api/users", users);

//port configurations
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at port ${port}`));
