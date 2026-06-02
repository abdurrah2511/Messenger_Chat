import API from "./axios";

export const accessChat = (userId) =>
  API.post("/chats", { userId });

export const createChat = (userId) =>
  API.post("/chats", { userId });

export const fetchChats = () =>
  API.get("/chats");

export const fetchMessages = (chatId) =>
  API.get(`/messages/${chatId}`);

export const sendMessage = (data) =>
  API.post("/messages", data);

export const createGroup = (data) =>
  API.post("/chats/group", data);

export const renameGroup = (data) =>
  API.put("/chats/rename", data);

export const addToGroup = (data) =>
  API.put("/chats/group/add", data);

export const removeFromGroup = (data) =>
  API.put("/chats/group/remove", data);

export const leaveGroup = (id) =>
  API.put(`/chats/leave/${id}`);

export const resetUnread = (id) =>
  API.put(`/chats/reset-unread/${id}`);