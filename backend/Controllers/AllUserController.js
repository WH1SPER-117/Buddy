require("dotenv").config();
const asyncHandler = require("express-async-handler");
const AllUser = require("../Model/AllUserModel");
const generateToken = require("../Config/GenarateToken");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

console.log('CLOUDINARY env check:', {
  cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
  api_key: !!process.env.CLOUDINARY_API_KEY,
  api_secret: !!process.env.CLOUDINARY_API_SECRET,
});

if (!process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET) {
  console.error('Missing Cloudinary env variables. Check .env and working directory.');
  // throw new Error('Missing Cloudinary env variables'); // optional during dev
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "buddy_profiles", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// upload middleware (file field = pic)
const upload = multer({ storage }).single("pic");


// ----------------------- REGISTER USER -----------------------
const registerUser = asyncHandler(async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error("Profile picture upload error:", err);
      return res
        .status(400)
        .json({ success: false, message: "Profile picture upload failed" });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please enter all fields");
    }

    const userExists = await AllUser.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Uploaded image URL from Cloudinary (if file uploaded)
    const pic = req.file ? req.file.path : undefined; // Cloudinary URL

    const user = await AllUser.create({
      name,
      email,
      password,
      pic, // saved Cloudinary URL
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the user");
    }
  });
});


// ----------------------- LOGIN USER -----------------------
const authAllUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const user = await AllUser.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


// ----------------------- GET ALL USERS -----------------------
const allusers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await AllUser.find(keyword).find({
    _id: { $ne: req.user._id },
  });

  res.send(users);
});


module.exports = { registerUser, authAllUser, allusers };
