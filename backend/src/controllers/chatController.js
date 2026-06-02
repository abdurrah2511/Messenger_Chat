import User from "../models/User.js";
import Chat from "../models/Chat.js";
import asyncHandler from "../middleware/asyncHandler.js";

// ACCESS OR CREATE ONE-TO-ONE CHAT
export const accessChat = asyncHandler(async (req, res) => {

  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("UserId not provided");
  }

  let chat = await Chat.findOne({
    isGroupChat: false,
    users: {
      $all: [req.user._id, userId],
    },
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (chat) {
    return res.status(200).json(chat);
  }

  const createdChat = await Chat.create({
    chatName: "sender",
    isGroupChat: false,
    users: [req.user._id, userId],
  });

  const fullChat = await Chat.findById(createdChat._id)
    .populate("users", "-password");

  res.status(201).json(fullChat);

});

// FETCH USER CHATS
export const fetchChats = asyncHandler(async (req, res) => {

  const chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  res.status(200).json(chats);

});

// CREATE GROUP CHAT
export const createGroup = asyncHandler(async (req, res) => {

  const { name, users } = req.body;

  if (!name || !users) {
    res.status(400);
    throw new Error("Missing fields");
  }

  const groupUsers = JSON.parse(users);

  if (groupUsers.length < 2) {
    res.status(400);
    throw new Error("Need at least 2 users");
  }

  groupUsers.push(req.user._id);

  const groupChat = await Chat.create({
    chatName: name,
    users: groupUsers,
    isGroupChat: true,
    groupAdmin: req.user._id,
  });

  const fullGroup = await Chat.findById(groupChat._id)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(201).json(fullGroup);

});

// RENAME GROUP
export const renameGroup = asyncHandler(async (req, res) => {

  const { chatId, chatName } = req.body;

  const updated = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.json(updated);

});

// REMOVE USER FROM GROUP
export const removeFromGroup = asyncHandler(async (req, res) => {

  const { chatId, userId } = req.body;

  const updated = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.json(updated);

});

// ADD USER TO GROUP
export const addToGroup = asyncHandler(async (req, res) => {

  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    res.status(400);
    throw new Error("chatId and userId are required");
  }

  const chat = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Group not found");
  }

  if (!chat.isGroupChat) {
    res.status(400);
    throw new Error("This is not a group chat");
  }

  // prevent duplicates
  if (chat.users.includes(userId)) {
    res.status(400);
    throw new Error("User already in group");
  }

  const updated = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.json(updated);
});

// LEAVE GROUP
export const leaveGroup = asyncHandler(async (req, res) => {

  const chatId = req.params.id;

  const updated = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: req.user._id } },
    { new: true }
  );

  res.json(updated);

});

// 🔥 RESET UNREAD COUNT
export const resetUnread = asyncHandler(async (req, res) => {

  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Chat not found");
  }

  chat.unreadCount.set(req.user._id.toString(), 0);

  await chat.save();

  res.json(chat);

});