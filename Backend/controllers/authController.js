const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

// register
const Register = async (req, res) => {
  const { name, email, password, confirmPassword, gender, role } =
    req.body;

  // Check for missing fields
  if (!name || !email || !password || !confirmPassword || !gender || !role) {
    return res.status(400).json({ msg: "please enter all the fields" });
  }
  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ msg: "password and confirmPassword should be equal" });
  }

  try {
    // Check if email already exists
    const emailAlreadyExists = await User.findOne({ email });

    if (emailAlreadyExists) {
      return res.status(400).json("Email already exists");
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User({
      name,
      email,
      password: hashedPassword,
      gender,
      role,
    });

    await user.save();

    // Create a JWT token for the user
    const token = jwt.createJWT({
      payload: { userId: user._id, name:user.name, role: user.role },
    });
    // Attach the token as a cookie
    jwt.attachCookiesToResponse({
      res,
      user: { userId: user._id,name:user.name, role: user.role },
    });

    res.status(200).json({ msg: "User registered successfully", user, token });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ msg: "Internal Server Error", error: err.message });
  }
};

// login
const Login = async (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all the fields" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user does not exist
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create JWT token for the user
    const token = jwt.createJWT({ payload: { userId: user._id, name: user.name, role: user.role } });

    // Attach token to cookies
    jwt.attachCookiesToResponse({ res, user: { userId: user._id, name: user.name, role: user.role } });

    res.status(201).json({ msg: "User logged in", user, token});
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ msg: "Internal Server Error", error: err.message });
  }
};

// logout
const Logout = async (req, res) => {
  try {
   // Clear the token cookie on logout
   res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

   res.status(200).json({ msg: "User logged out successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ mes: err.message });
  }
};

module.exports = {
  Register,
  Login,
  Logout,
};
