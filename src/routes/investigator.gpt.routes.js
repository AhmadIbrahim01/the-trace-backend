import { Router } from "express";
import {
  addChat,
  updateChatName,
} from "../controllers/investigator.gpt.controller.js";

const investigatorGptRouter = new Router();

investigatorGptRouter.post("/:userId?", addChat);
investigatorGptRouter.put("/:userId/:chatId?", updateChatName);

export default investigatorGptRouter;
