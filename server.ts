import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(
  cors({
    origin: "https://peachpuff-cheetah-825750.hostingersite.com",
  })
);
  const PORT = 3000;

  app.use(express.json());

  // Database Connection Pool with error handling
  let pool: mysql.Pool;
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "test",
      port: parseInt(process.env.DB_PORT || "3306"),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log("Database pool initialized (checking connection lazily)");
  } catch (err) {
    console.error("Failed to initialize database pool:", err);
    // Continue starting server even if DB fails, to show the UI
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  app.get("/api/db-test", async (req, res) => {
    if (!pool) return res.status(500).json({ error: "DB Pool not initialized" });
    try {
      const [rows] = await pool.query("SELECT 1 + 1 AS solution");
      res.json({ status: "connected", result: rows });
    } catch (error) {
      console.error("Database connection error:", error);
      res.status(500).json({ status: "error", message: "Failed to connect to database. Check your Credentials." });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    if (!pool) return res.status(500).json({ error: "DB Pool not initialized" });
    try {
      const [rows] = await pool.query("SELECT * FROM contacts ORDER BY id DESC");
      res.json(rows);
    } catch (error) {
      console.error("Fetch error:", error);
      res.status(500).json({ success: false, message: "Erro ao buscar dados." });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    if (!pool) return res.status(500).json({ error: "DB Pool not initialized" });
    const { name, email, phone, address, message } = req.body;
    
    try {
      console.log("Attempting to save contact form data to DB...");
      const [result] = await pool.execute(
        "INSERT INTO contacts (name, email, phone, address, message) VALUES (?, ?, ?, ?, ?)",
        [name, email, phone, address, message]
      );
      
      res.json({ success: true, message: "Mensagem recebida com sucesso!", id: (result as any).insertId });
    } catch (error) {
      console.error("Save error:", error);
      res.status(500).json({ success: false, message: "Erro ao salvar dados." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
