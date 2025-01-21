import { Router } from "express";

import { analyzeStatement } from "../controllers/ai.statement.controller.js";

const aiStatementRouter = new Router();

aiStatementRouter.post("/", analyzeStatement);

export default aiStatementRouter;
