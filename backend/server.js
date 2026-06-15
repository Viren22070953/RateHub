const app = require("./src/app");
const { initializeDatabase } = require("./src/model");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to initialize database schema:", err.message);
    process.exit(1);
  }
};

startServer();
