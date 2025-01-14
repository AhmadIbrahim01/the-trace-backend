import mongoose from "mongoose";
import { User } from "../models/user.model.js";

export const addChat = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send({
      message: "User ID is missing",
    });
  }
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({
      message: "User ID is of invalid format",
    });
  }
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const newChat = {
      title: "New Chat",
      messages: [],
    };

    const chats = user.chats;
    chats.push(newChat);
    await user.save();

    return res.status(200).send({
      newChat,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateChatName = async (req, res) => {
  const { userId, chatId } = req.params;
  if (!userId) {
    return res.status(400).send({
      message: "User ID is missing",
    });
  }
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({
      message: "User ID is of invalid format",
    });
  }
  if (!chatId) {
    return res.status(400).send({
      message: "Chat ID is missing",
    });
  }
  if (chatId && !mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(400).send({
      message: "Chat ID is of invalid format",
    });
  }

  const { updatedChatName } = req.body;
  if (!updatedChatName) {
    return res.status(404).send({
      message: "Missing updated chat name",
    });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const chats = user.chats;
    const chatIndex = chats.findIndex((chat) => chat._id.toString() === chatId);
    if (chatIndex === -1) {
      return res.status(404).send({
        message: "Chat not found",
      });
    }

    chats[chatIndex].title = updatedChatName;
    await user.save();
    return res.status(200).send({
      message: "Chat name updated successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteChat = async (req, res) => {
  const { userId, chatId } = req.params;
  if (!userId) {
    return res.status(400).send({
      message: "User ID is missing",
    });
  }
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({
      message: "User ID is of invalid format",
    });
  }
  if (!chatId) {
    return res.status(400).send({
      message: "Chat ID is missing",
    });
  }
  if (chatId && !mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(400).send({
      message: "Chat ID is of invalid format",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "Usere not found",
      });
    }

    const chats = user.chats;
    const chatIndex = chats.findIndex((chat) => chat._id.toString() === chatId);
    if (chatIndex === -1) {
      return res.status(404).send({
        message: "Chat not found",
      });
    }

    const deletedChat = chats[chatIndex];

    const updatedChats = chats.filter((chat) => chat._id.toString() !== chatId);

    user.chats = updatedChats;
    await user.save();

    return res.status(200).send({
      message: "Chat deleted successfully",
      deletedChat,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const getChat = (req, res) => {};

export const getChats = (req, res) => {};

export const sendMessage = (req, res) => {};
