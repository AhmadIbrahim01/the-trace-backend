import { Router } from "express";
import {
  createComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const commentRouter = new Router();

commentRouter.post("/:caseId?", createComment);
commentRouter.delete("/:caseId/:commentId?", deleteComment);

export default commentRouter;
