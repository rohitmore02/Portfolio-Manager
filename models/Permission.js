const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  resource: { type: String, required: true }, // e.g., "user", "dashboard"
  actions: [{ type: String }], // e.g., ["create", "read", "update", "delete"]
});

module.exports = mongoose.model("Permission", PermissionSchema);
