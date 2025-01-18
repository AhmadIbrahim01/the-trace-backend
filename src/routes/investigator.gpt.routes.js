import { Router } from "express";
import {
  addChat,
  updateChatName,
  deleteChat,
  getChat,
  getChats,
  sendMessage,
} from "../controllers/investigator.gpt.controller.js";

const investigatorGptRouter = new Router();

investigatorGptRouter.post("/message/:userId/:chatId?", sendMessage);
investigatorGptRouter.post("/:userId/:caseId?", addChat);
investigatorGptRouter.put("/:userId/:chatId?", updateChatName);
investigatorGptRouter.delete("/:userId/:chatId?", deleteChat);
investigatorGptRouter.get("/:userId?", getChats);
investigatorGptRouter.get("/:userId/:chatId?", getChat);

export default investigatorGptRouter;
