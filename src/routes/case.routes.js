import { Router } from "express";
import {
  createCase,
  getCases,
  getCase,
  updateCase,
  deleteCase,
} from "../controllers/case.controller.js";

const caseRouter = new Router();

caseRouter.post("/", createCase);
caseRouter.get("/", getCases);
caseRouter.get("/:id?", getCase);
caseRouter.put("/:id?", updateCase);
caseRouter.delete("/:id?", deleteCase);

export default caseRouter;
