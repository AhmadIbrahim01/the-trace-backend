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
export const getChat = (req, res) => {};
export const updateChatName = (req, res) => {};
export const deleteChat = (req, res) => {};

export const getChats = (req, res) => {};

export const sendMessage = (req, res) => {};
