const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserByID,
  searchUser,
  createUser,
  deleteUserByID,
  updateUserByID,
  login,
} = require("../controllers/user.controller");
const upload = require("../middlewares/upload.middleware"); 

router.get("/", getAllUser);
router.get("/:id", getUserByID);
router.post("/register", createUser);
router.delete("/:id", deleteUserByID);
router.put("/:id", updateUserByID);
// router.put("/:id", upload.single("profilePicture"), updateUserByID);
router.post("/login", login);
router.get("/", searchUser)

module.exports = router;
