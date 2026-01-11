import { configDotenv } from "dotenv";
import app from "./app.js";
import connect from "./connectDB/connect.js";

configDotenv();

const PORT = process.env.PORT || 5000;

// Fail fast on missing critical config (better than silently running broken).
if (!process.env.MONGODB_URL) {
  console.error("Missing MONGODB_URL in environment.");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET in environment.");
  process.exit(1);
}

await connect(process.env.MONGODB_URL);

app.listen(PORT, () => {
  console.log(`Server is successfully running on Port:${PORT}`);
});