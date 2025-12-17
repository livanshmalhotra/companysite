import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();
const __dirname = path.resolve();

/* ---------------- CORS ---------------- */
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

/* ---------------- Inngest ---------------- */
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
    signingKey: ENV.INNGEST_SIGNING_KEY,
  })
);

/* ---------------- Middleware ---------------- */
app.use(express.json());

if (ENV.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
}

/* ---------------- Frontend (prod) ---------------- */
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

/* ---------------- API test ---------------- */
app.get("/api/test", (req, res) => {
  res.json({ message: "backend is working!" });
});

app.post("/api/inngest", (req, res) => {
  res.status(200).json({ ok: true });
});
/* ---------------- Start Server ---------------- */
const startServer = async () => {
  try {
    await connectDB();
    const PORT = ENV.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

startServer();
