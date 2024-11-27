const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Role = require("./models/Role");
const Permission = require("./models/Permission");
const User = require("./models/User");

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://rohitmore386:rohit123@userdb.cbwue.mongodb.net/?retryWrites=true&w=majority&appName=userDB')
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log("Database connection failed:", err))

    // Clear existing data
    await Role.deleteMany();
    await Permission.deleteMany();
    await User.deleteMany();

    // Create Permissions
    const userPermissions = await Permission.create({
      resource: "user",
      actions: ["read", "update"],
    });
    const adminPermissions = await Permission.create({
      resource: "admin",
      actions: ["create", "read", "update", "delete"],
    });
    const moderatorPermissions = await Permission.create({
      resource: "moderator",
      actions: ["read", "update"],
    });

    console.log("Permissions added!");

    // Create Roles
    const adminRole = await Role.create({
      name: "Admin",
      permissions: adminPermissions._id,
    });

    const userRole = await Role.create({
      name: "User",
      permissions: userPermissions._id,
    });

    const moderatorRole = await Role.create({
      name: "Moderator",
      permissions: moderatorPermissions._id,
    });

    console.log("Roles added!");

    // Create Users
    await User.create({
      email: "admin@example.com",
      password: "admin123",
      role: adminRole._id,
    });

    await User.create({
      email: "user@example.com",
      password: "user123",
      role: userRole._id,
    });

    await User.create({
      email: "moderator@example.com",
      password: "moderator123",
      role: moderatorRole._id,
    });

    console.log("Users added!");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedDatabase();
