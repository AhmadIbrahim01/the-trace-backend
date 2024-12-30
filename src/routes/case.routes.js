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
  countInProgressCases,
  countSolvedCases,
  casesStats,
} from "../controllers/case.controller.js";

const caseRouter = new Router();

caseRouter.get("/count", countCases);
caseRouter.get("/count/open", countOpenCases);
caseRouter.get("/count/closed", countClosedCases);
caseRouter.get("/count/progress", countInProgressCases);
caseRouter.get("/count/solved", countSolvedCases);
caseRouter.get("/cases/stats", casesStats);
caseRouter.post("/", createCase);
caseRouter.get("/", getCases);
caseRouter.get("/:id?", getCase);
caseRouter.put("/:id?", updateCase);
caseRouter.delete("/:id?", deleteCase);

export default caseRouter;
