const express = require("express");
const router = express.Router();

const {
  registerUser,
  authAllUser,
  allusers,
} = require("../Controllers/AllUserController");

const { protect } = require("../Middlewares/authMiddleware");

router.route("/").post(registerUser).get(protect, allusers);
router.post("/login", authAllUser);

module.exports = router;
