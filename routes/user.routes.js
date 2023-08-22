
const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRouter = Router();
require("dotenv").config();

UserRouter.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(200).json({ msg: "User already exist, please login" });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new UserModel({
          email,
          confirmPassword,
          password: hash,
        });
        await user.save();
        res.status(200).send({ msg: "Registration successfull" });
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login successfull",
            token: jwt.sign({ userID: user._id }, "masai"
            ),
          });
        }
      });
    } else {
      res.status(400).send("Wrong credential");
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { UserRouter };