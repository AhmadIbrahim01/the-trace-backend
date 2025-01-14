import { Router } from "express";
import {
  addChat,
  updateChatName,
  deleteChat,
  getChat,
  getChats,
} from "../controllers/investigator.gpt.controller.js";

const investigatorGptRouter = new Router();

investigatorGptRouter.post("/:userId?", addChat);
investigatorGptRouter.put("/:userId/:chatId?", updateChatName);
investigatorGptRouter.delete("/:userId/:chatId?", deleteChat);
investigatorGptRouter.get("/:userId?", getChats);
investigatorGptRouter.get("/:userId/:chatId?", getChat);

export default investigatorGptRouter;
