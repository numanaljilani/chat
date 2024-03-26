const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDB = require("./db/connect");
const User = require("./model/userModel");
const Message = require("./model/message");
var bodyParser = require("body-parser");
const path = require("path");

const app = express();
const _dirname = path.dirname("")
const buildPath = path.join(_dirname,'../client/.next/static')
const nextStaticPath = path.join(__dirname, '.next');
app.use(express.static(nextStaticPath))
app.use(cors({ origin: "*", credentials: false }));
app.use(express.json());
app.options("*", cors());
app.use(bodyParser.json());
// app.use(function(request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers",
//                     "Origin, X-Rquested-With, Content-Type, Accept");
//     next();
// });

connectDB();

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = await jwt.sign({ userId: user._id }, "secret");
    return res.send({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/message", async (req, res) => {
  try {
    const { message, token } = req.body;

    const { userId } = await jwt.verify(req.body.token, "secret");
    const user = await User.findById(userId);
    const res_message = await Message.create({ sender: user.name, message });
    res.json({ success: true, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/message", async (req, res) => {
  try {
    const token = req.headers.authorization
    console.log(token)
    const { userId } = await jwt.verify(token, "secret");
    if (!userId) return;
    const message = await Message.find().limit(20);
    res.json({ success: true, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.listen(4000, () => {
  console.log("server is liting to port 3000");
});
