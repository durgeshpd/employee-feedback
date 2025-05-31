require("dotenv").config();
const connectDB = require("./src/config/database");
const Admin = require("./src/models/Admin");
const bcrypt = require("bcryptjs");

async function createAdmin() {
  try {
    await connectDB();

    const username = "admin";
    const password = "admin123";

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    console.log("Admin user created");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
