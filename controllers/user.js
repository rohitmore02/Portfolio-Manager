const Role = require("../models/Role");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    let { email, password, role } = req.body;
  
    role = await Role.findOne({ name: "User" });
  
    try {
      const newUser = await User.create({ email, password, role });
      res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
      res.status(400).json({ message: "Error registering user", error: err });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email }).populate("role");
      
      if (!user) return res.status(404).json({ message: "User not found" });
      
      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      console.log(token);
  
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: "Login failed", error: err });
    }
};

const getUser = async (req, res) => {

  const { id } = req.params;  
  
  try {
    const user = await User.findById(id).populate("role");
    
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const role = await Role.findById(user.role._id).populate("permissions");

    const userDetails = { ...user.toObject(), role: role };
    
    res.status(200).json(userDetails);
  } catch (err) {
    res.status(500).json({ message: "Unable to get user", error: err });
  }
};

module.exports = { signUp, signIn, getUser };