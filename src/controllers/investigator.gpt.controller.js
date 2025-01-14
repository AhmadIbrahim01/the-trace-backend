import mongoose from "mongoose";
import { User } from "../models/user.model.js";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_AI_KEY,
  dangerouslyAllowBrowser: true,
});

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

export const getChat = async (req, res) => {
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

    const chat = chats[chatIndex];

    return res.status(200).send({
      message: "Chat retreived successfully",
      chat,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const getChats = async (req, res) => {
  const { userId } = req.params;
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
      return res.status(404).send({
        message: "Usere not found",
      });
    }

    const chats = user.chats;

    return res.status(200).send({
      message: "Chats retreived successfully",
      chats,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const sendMessage = async (req, res) => {
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

  const { role, content } = req.body;

  if (!role || !content) {
    return res.status(400).send({
      message: "Missing data",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({
        messsage: "User not found",
      });
    }

    const chats = user.chats;

    const chatIndex = chats.findIndex((chat) => chat._id.toString() === chatId);

    if (chatIndex === -1) {
      return res.status(400).send({
        message: "Chat not found",
      });
    }

    const chat = chats[chatIndex];

    const newMessage = {
      role,
      content,
    };

    let messages = chat.messages;
    messages.push(newMessage);

    if (messages.length > 5) {
      messages = messages.slice(messages.length - 5);
    }

    const lastMessages = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    const aiMessages = [
      {
        role: "system",
        content: `when I send you hi you should say hi mr`,
      },
      ...lastMessages,
    ];

    // console.log("ai messages ", aiMessages);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: aiMessages,
    });

    // console.log("res", response);
    // console.log("res.chat", response.choices[0].message);

    chat.messages.push(response.choices[0].message);
    await user.save();

    return res.status(201).send({
      message: "Message added successfully",
      newMessage,
      aiResponse: response.choices[0].message,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};
