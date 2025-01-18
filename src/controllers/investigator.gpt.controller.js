import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import Case from "../models/case.model.js";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_AI_KEY,
  dangerouslyAllowBrowser: true,
});

export const addChat = async (req, res) => {
  const { userId, caseId } = req.params;
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
  if (!caseId) {
    return res.status(400).send({
      message: "Case ID is missing",
    });
  }
  if (caseId && !mongoose.Types.ObjectId.isValid(caseId)) {
    return res.status(400).send({
      message: "Case ID is of invalid format",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const caseData = await Case.findById(caseId);

    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const newChat = {
      title: "New Chat",
      messages: [],
      caseId,
      caseTitle: caseData.title,
      caseDescription: caseData.description,
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

    console.log("chats", chats);
    console.log("chats case id", chats.caseId.toString());
    console.log("chats case id populate", chats.caseId.populate());

    return res.status(200).send({
      chats,
      caseId: chats.caseId.toString(),
      case: chats.caseId.populate(),
    });

    // const chatIndex = chats.findIndex((chat) => chat._id.toString() === chatId);

    // if (chatIndex === -1) {
    //   return res.status(400).send({
    //     message: "Chat not found",
    //   });
    // }

    // const chat = chats[chatIndex];

    // const newMessage = {
    //   role,
    //   content,
    // };

    // let messages = chat.messages;
    // messages.push(newMessage);

    // if (messages.length > 5) {
    //   messages = messages.slice(messages.length - 5);
    // }

    // const lastMessages = messages.map((msg) => ({
    //   role: msg.role === "user" ? "user" : "assistant",
    //   content: msg.content,
    // }));

    // const aiMessages = [
    //   {
    //     role: "system",
    //     content: `You are InvestigatorGPT, an advanced AI investigator specializing in solving complex cases. Your role is to assist the lead investigator by analyzing evidence, offering insights, brainstorming hypotheses, and suggesting strategies to uncover the truth. You are methodical, logical, and observant, always focusing on the smallest details to connect the dots.

    //       In each case, your job is to:

    //         1. Analyze available evidence and identify key patterns.
    //         2. Ask probing questions that help clarify the situation.
    //         3. Offer suggestions on next steps, such as possible lines of inquiry or investigative techniques.
    //         4. Consider all angles and think critically about potential outcomes.

    //       Stay focused on solving the case by using your reasoning, problem-solving abilities, and knowledge of investigative methods.`,
    //   },
    //   ...lastMessages,
    // ];

    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: aiMessages,
    // });

    // chat.messages.push(response.choices[0].message);
    // await user.save();

    // return res.status(201).send({
    //   message: "Message added successfully",
    //   newMessage,
    //   aiResponse: response.choices[0].message,
    // });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};
