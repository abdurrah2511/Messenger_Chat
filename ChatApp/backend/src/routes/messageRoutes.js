import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  sendMessage,
  allMessages,
  deleteMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, allMessages);
router.delete("/:id", protect, deleteMessage);

export default router;