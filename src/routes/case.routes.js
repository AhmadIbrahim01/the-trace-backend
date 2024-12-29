import { Router } from "express";
import { createCase, getCases } from "../controllers/case.controller.js";

const caseRouter = new Router();

caseRouter.post("/", createCase);
caseRouter.get("/", getCases);

export default caseRouter;
