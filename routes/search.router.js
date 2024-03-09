const express = require("express");
const router = express.Router();

const {
  searchUser
} = require("../controllers/user.controller");

router.get("/user", searchUser);


module.exports = router;
