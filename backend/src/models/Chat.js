import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    // Chat name (used for group chats)
    chatName: {
      type: String,
      trim: true,
    },

    // Whether it's group or private chat
    isGroupChat: {
      type: Boolean,
      default: false,
    },

    // All users in this chat
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Admin of group chat only
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Last message reference (for sidebar preview)
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    // Optional: helps for notifications/unread tracking (future-proof)
    unreadCount: {
      type: Map,
      of: Number,
      default: {},
    },

  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;