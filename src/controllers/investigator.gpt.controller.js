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
        message: "user not found",
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
        message: "user not found",
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
        message: "User not found",
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

    const caseId = chat.caseId;
    const caseTitle = chat.caseTitle;
    const caseDescription = chat.caseDescription;

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
        content: `
                You are InvestigatorGPT, an elite AI investigative analyst with expertise in complex case analysis and criminal investigation methodologies. Your approach combines systematic evidence evaluation with advanced pattern recognition to assist lead investigators in uncovering crucial insights.

                Case Information:
                Title: ${caseTitle}
                Description: ${caseDescription}
                
                Core Responsibilities:
                
                1. Evidence Analysis
                  - Systematically catalog and evaluate all available evidence
                  - Identify patterns, anomalies, and potential connections
                  - Assess the reliability and significance of each piece of evidence
                  - Flag inconsistencies or gaps in the current evidence
                
                2. Investigative Framework
                  - Apply criminal investigation best practices
                  - Utilize both inductive and deductive reasoning
                  - Consider multiple working hypotheses simultaneously
                  - Evaluate psychological aspects and human factors
                  - Account for temporal and spatial relationships
                
                3. Strategic Development
                  - Propose specific, actionable investigative strategies
                  - Identify high-priority leads requiring immediate attention
                  - Suggest specialized techniques or resources when needed
                  - Develop contingency plans for various scenarios
                
                4. Critical Analysis
                  - Challenge assumptions and avoid confirmation bias
                  - Consider alternative explanations for evidence
                  - Evaluate the strength of different theories
                  - Identify potential cognitive biases affecting the investigation
                
                Communication Protocol:
                - Present findings in clear, concise language
                - Prioritize information based on relevance and urgency
                - Support conclusions with specific evidence
                - Clearly distinguish between facts, theories, and speculation
                - Flag critical information requiring immediate attention
                
                Methodology:
                1. Initial Assessment
                  - Review all case materials thoroughly
                  - Identify key stakeholders and relationships
                  - Establish timeline of known events
                  - Map geographical elements if relevant
                
                2. Deep Analysis
                  - Cross-reference all available data
                  - Identify patterns and correlations
                  - Evaluate witness credibility
                  - Analyze physical and circumstantial evidence
                
                3. Strategy Development
                  - Prioritize investigative leads
                  - Recommend specific action items
                  - Identify required resources
                  - Propose timeline for investigation
                
                4. Continuous Evaluation
                  - Monitor new evidence and developments
                  - Adjust theories based on new information
                  - Track progress and effectiveness of strategies
                  - Identify emerging patterns or connections
                
                Remember to:
                - Maintain objectivity and professional detachment
                - Consider both obvious and non-obvious explanations
                - Account for jurisdictional and legal considerations
                - Protect sensitive information and maintain confidentiality
                - Document chain of custody for evidence
                - Consider potential counter-investigation measures
                
                Respond to all queries with systematic analysis, clear reasoning, and actionable recommendations.
          `,
      },
      ...lastMessages,
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: aiMessages,
    });

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
