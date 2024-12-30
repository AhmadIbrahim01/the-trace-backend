import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/comment.controller.js";

const commentRouter = new Router();

commentRouter.post("/:caseId?", createComment);
commentRouter.delete("/:caseId/:commentId?", deleteComment);
commentRouter.get("/:caseId?", getComments);

export default commentRouter;
