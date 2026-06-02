
import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  addToGroup,
  removeFromGroup,
  leaveGroup,
  resetUnread,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", protect, accessChat);

router.get("/", protect, fetchChats);

router.post("/group", protect, createGroup);

router.put("/rename", protect, renameGroup);

router.put("/group/add", protect, addToGroup);

router.put("/group/remove", protect, removeFromGroup);

router.put("/leave/:id", protect, leaveGroup);

router.put("/reset-unread/:id", protect, resetUnread);

export default router;

