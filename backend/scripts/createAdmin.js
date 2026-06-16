const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
const { initializeDatabase } = require("../src/model");
require("dotenv").config();

const adminData = {
  name: "System Administrator",
  email: "admin@store.com",
  password: "Admin@123",
  address: "Admin Office, Main Street, City",
  role: "admin",
};

const run = async () => {
  let connection;

  try {
    await initializeDatabase();

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("Connected to database.");

    const [existing] = await connection.query(
      "SELECT id FROM users WHERE email = ?",
      [adminData.email]
    );

    if (existing.length > 0) {
      console.log("Admin already exists:", adminData.email);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    const [result] = await connection.query(
      "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
      [adminData.name, adminData.email, hashedPassword, adminData.address, adminData.role]
    );

    console.log("Admin created. ID:", result.insertId);
    console.log("Email:", adminData.email);
    console.log("Password:", adminData.password);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit();
  }
};

run();
