const User = require("../Models/User");
const checkPermissions = require("../utils/checkPermissions");
const jwt = require("../utils/jwt");
const bcrypt = require("bcryptjs");

// get all users
const getAllUsers = async (req, res) => {
  try {
    // select all the users without password
    const user = await User.find({ role: "user" }).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
// get single user
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "please enter user id" });
  }

  try {
    const user = await User.findOne({ _id: id }).select("-password");
    checkPermissions(req.user, user._id);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// show current user
const showCurrentUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// update user
const updateUser = async (req, res) => {
  // update name and email only
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ msg: "name and email are required" });
  }

  try {
    // update user using id
    const user = await User.findById(req.user.userId);
    user.name = name;
    user.email = email;

    await user.save();
    // Create JWT token for the user
    const token = jwt.createJWT({
      payload: { userId: user._id, name: user.name, role: user.role },
    });

    // Attach token to cookies
    jwt.attachCookiesToResponse({
      res,
      user: { userId: user._id, name: user.name, role: user.role },
    });

    res.status(200).json({ msg: "update user", user, token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// update user password
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ msg: "Please provide both values" });
  }

  try {
    // find user id
    const user = await User.findById(req.user.userId);

    // compare user old password
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Incorrect old password" });
    }
    // Hash the new password before updating
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(newPassword, salt); // Hash the new password

    //update password
    user.password = hashedPassword;
    // save new password to database
    await user.save();
    res.status(200).json({ msg: "password updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
