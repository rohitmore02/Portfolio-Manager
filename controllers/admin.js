const User = require("../models/User");


const getUsers =  async (req, res) => {
    
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ success: false, message: "Error getting user", error: err });
    }
    
};


const updateUser =  async (req, res) => {

}

const deleteUser =  async (req, res) => {

}

module.exports = { getUsers, updateUser, deleteUser }