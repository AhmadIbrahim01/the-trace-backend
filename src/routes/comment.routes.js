import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
  getComment,
} from "../controllers/comment.controller.js";

const commentRouter = new Router();

commentRouter.post("/:caseId?", createComment);
commentRouter.delete("/:caseId/:commentId?", deleteComment);
commentRouter.get("/:caseId?", getComments);
commentRouter.get("/:caseId/:commentId?", getComment);

export default commentRouter;
