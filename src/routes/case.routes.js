import { Router } from "express";
import {
  createCase,
  getCases,
  getCase,
} from "../controllers/case.controller.js";

const caseRouter = new Router();

caseRouter.post("/", createCase);
caseRouter.get("/", getCases);
caseRouter.get("/:id?", getCase);

export default caseRouter;
