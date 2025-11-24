const User = require("../Model/UserModel");

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a new user
const addUsers = async (req, res, next) => {
  const { name, email, contactNo, address, username, password } = req.body;

  try {
    const user = new User({
      name,
      email,
      contactNo,
      address,
      username,
      password,
    });
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error adding user" });
  }
};

// Get user by ID
const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update User Details
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, contactNo, address, username, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, contactNo, address, username, password },
      { new: true } // Ensures the updated document is returned
    );

    if (!user) {
      return res.status(404).json({ message: "Unable to Update User" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete User Details
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
