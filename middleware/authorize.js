const Role = require("../models/Role");
const Permission = require("../models/Permission")

const authorize = (requiredPermission) => async (req, res, next) => {
  try {
    let userRole = "";
    
    await Role.findById(req.user.role).populate("permissions")
    .then((role) => userRole=role)
    .catch((err) => console.error("Error :", err));
    
    if (requiredPermission.some((role) => role==userRole.name)) {
    } else {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authorize;
