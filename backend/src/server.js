import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import connectDB from "./config/db.js";
import { initSocket } from "./config/socket.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

// ----------------------
// APP + SERVER
// ----------------------
const app = express();
const server = http.createServer(app);

// ----------------------
// SOCKET INIT
// ----------------------
initSocket(server);

// ----------------------
// MIDDLEWARE
// ----------------------
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// ----------------------
// ROUTES
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);      // 🔥 FIXES YOUR 404 SEARCH ERROR
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// ----------------------
// ROOT TEST ROUTE
// ----------------------
app.get("/", (req, res) => {
  res.send("Chat API Running...");
});

// ----------------------
// ERROR HANDLER (LAST)
// ----------------------
app.use(errorMiddleware);

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});