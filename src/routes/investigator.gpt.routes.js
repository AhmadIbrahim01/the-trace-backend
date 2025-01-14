import { Router } from "express";
import {
  addChat,
  updateChatName,
  deleteChat,
} from "../controllers/investigator.gpt.controller.js";

const investigatorGptRouter = new Router();

investigatorGptRouter.post("/:userId?", addChat);
investigatorGptRouter.put("/:userId/:chatId?", updateChatName);
investigatorGptRouter.delete("/:userId/:chatId?", deleteChat);

export default investigatorGptRouter;
