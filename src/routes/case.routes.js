import { Router } from "express";
import {
  createCase,
  getCases,
  getCase,
  updateCase,
  deleteCase,
  countCases,
  countOpenCases,
  countClosedCases,
} from "../controllers/case.controller.js";

const caseRouter = new Router();

caseRouter.get("/count", countCases);
caseRouter.get("/count/open", countOpenCases);
caseRouter.get("/count/closed", countClosedCases);
caseRouter.post("/", createCase);
caseRouter.get("/", getCases);
caseRouter.get("/:id?", getCase);
caseRouter.put("/:id?", updateCase);
caseRouter.delete("/:id?", deleteCase);

export default caseRouter;
