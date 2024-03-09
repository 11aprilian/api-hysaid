require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const fs = require("fs");
const upload = require("../middlewares/upload.middleware");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({}, "-__v -password");
      res.json({
        message: "success get data user",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  getUserByID: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId, "-__v -password");

      if (user) {
        res.json({
          message: "success get user by ID",
          data: user,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  searchUser: async (req, res) => {
    try {
      const searchQuery = req.query.s; 
      // if (!searchQuery || searchQuery.length < 3) {
      //   return res.status(400).json({ message: "Invalid search query" });
      // }
      const users = await User.find({
        $or: [
          { username: { $regex: searchQuery, $options: "i" } },
        ],
      }).select("-__v -password");
      res.json(users);
    } catch (error) {
      console.error("Error searching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createUser: async (req, res) => {
    try {
      const data = req.body;

      const saltRounds = 10;
      const hash = bcrypt.hashSync(data.password, saltRounds);
      data.password = hash;

      const user = new User(data);
      await user.save();

      res.json({
        message: "User has been created!",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  deleteUserByID: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByIdAndDelete(userId);

      if (user) {
        res.json({
          message: "User has been deleted",
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  updateUserByID: async (req, res) => {
    try {
      const userId = req.params.id;
      const data = req.body;
  
      const saltRounds = 10;
      if (data.password) {
        const hash = bcrypt.hashSync(data.password, saltRounds);
        data.password = hash;
      }
  
      const user = await User.findByIdAndUpdate(userId, data, { new: true });
  
      if (user) {
        res.json({
          message: 'User has been updated',
          data: user,
        });
      } else {
        res.status(404).json({
          message: 'User not found',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
  

  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).send({ message: "user not found" });

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) return res.status(400).send({ message: "wrong password!" });

    const id = user._id;
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.cookie("token", token, { httpOnly: true });
    res.send({
      message: "success Login!",
      token,
      id,
    });
  },
};
