import { Router } from "express";
import { createComment } from "../controllers/comment.controller.js";

const commentRouter = new Router();

commentRouter.post("/:caseId?", createComment);

export default commentRouter;
