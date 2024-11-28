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
    const updatedData = req.body;
    
    try {
        const user = await User.updateOne(updatedData.id, {
            $set: updatedData
        });
        
        res.status(200).json({ message: "User successfully updated" });
    } catch (err) {
        res.status(400).json({ message: "Error getting user", error: err });
    }

}

const deleteUser =  async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await User.findByIdAndDelete(id);
        
        res.status(200).json({ message: "User successfully deleted" });
    } catch (err) {
        res.status(400).json({ message: "Error getting user", error: err });
    }

}

module.exports = { getUsers, updateUser, deleteUser }