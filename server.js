const PORT = process.env.PORT || 5000;
var io = require("socket.io")(PORT);
var express = require("express");
var app = express();
var mongoose = require("mongoose");
const Login = require("./loginSchema");
var cors = require("cors");
require("dotenv/config");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", socket => {
  // Login
  socket.on("login", async data => {
    const logged = await Login.find({ user: data.user, pass: data.pass });
    let answer;
    logged.length !== 0 ? (answer = "Correct") : (answer = "Incorrect");
    io.emit("loginres", answer);
  });

  // Register
  socket.on("register", async data => {
    const accexist = await Login.find({ user: data.user });
    let answer;
    accexist.length === 0 ? (answer = "ok") : (answer = "not-ok");
    const creditilians = new Login({
      user: data.user,
      pass: data.pass
    });
    if (answer === "ok") {
      creditilians.save();
      socket.emit("registerres", "ok");
    } else if (answer === "not-ok") {
      socket.emit("registerres", "not-ok");
    }
  });
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to database!");
});
