import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./routes";

// filesystem paths
// const uploadDir = process.env.UPLOADS || path.join(__dirname, "./uploads");
// const templateDir = process.env.TEMPLATES || path.join(__dirname, "./templates");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

async function bootstrap() {
	const dbUrl = process.env.DB_URL;
	const port = Number(process.env.PORT ?? 3001);

	if (!dbUrl) {
		throw new Error("DB_URL is missing in .env");
	}

	await mongoose.connect(dbUrl);
	console.log("✅ MongoDB connected");

	app.listen(port, () => {
		console.log(`✅ Server running on http://localhost:${port}`);
	});
}

bootstrap().catch((err) => {
	console.error("❌ Failed to start server:", err);
	process.exit(1);
});
