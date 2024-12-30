import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
  getComment,
  likeComment,
} from "../controllers/comment.controller.js";

const commentRouter = new Router();

commentRouter.post("/:caseId?", createComment);
commentRouter.delete("/:caseId/:commentId?", deleteComment);
commentRouter.get("/:caseId?", getComments);
commentRouter.get("/:caseId/:commentId?", getComment);
commentRouter.post("/:caseId/:commentId?", likeComment);

export default commentRouter;
