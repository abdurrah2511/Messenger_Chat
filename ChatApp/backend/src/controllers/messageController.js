import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import asyncHandler from "../middleware/asyncHandler.js";


// ===============================
// SEND MESSAGE
// ===============================
export const sendMessage = asyncHandler(async (req, res) => {

  const { content, chatId } = req.body;

  let message = await Message.create({
    sender: req.user._id,
    content,
    chat: chatId,
  });

  message = await message.populate("sender", "name pic");

  message = await message.populate("chat");

  message = await Message.populate(message, {
    path: "chat.users",
    select: "name email",
  });

  await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message._id,
  });

  // 🔥 UNREAD COUNT UPDATE
  const chat = await Chat.findById(chatId);

  chat.users.forEach((userId) => {
    if (userId.toString() !== req.user._id.toString()) {

      const current =
        chat.unreadCount?.get(userId.toString()) || 0;

      chat.unreadCount.set(
        userId.toString(),
        current + 1
      );
    }
  });

  await chat.save();

  res.json(message);

});


// ===============================
// FETCH ALL MESSAGES
// ===============================
export const allMessages = asyncHandler(async (req, res) => {

  const messages = await Message.find({
    chat: req.params.chatId,
  })
    .populate("sender", "name email")
    .populate("chat");

  res.status(200).json(messages);

});


// ===============================
// DELETE MESSAGE
// ===============================
export const deleteMessage = asyncHandler(async (req, res) => {

  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }

  // only sender can delete
  if (message.sender.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not allowed to delete this message");
  }

  await Message.findByIdAndDelete(req.params.id);

  res.json({ success: true });

});