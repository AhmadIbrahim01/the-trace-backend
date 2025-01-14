import { Router } from "express";
import { addChat } from "../controllers/investigator.gpt.controller.js";

const investigatorGptRouter = new Router();

investigatorGptRouter.post("/:userId?", addChat);

export default investigatorGptRouter;
