import "dotenv/config";
import app from "./app.js";
import { sequelize } from "./models/index.js";

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Sequelize connected");
    app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ Sequelize connection error:", err);
    process.exit(1);
  }
}

start();