import { Router } from "express";
import { addSuspectStatement } from "../controllers/suspect.statements.controller.js";

const suspectStatementsRouter = new Router();

suspectStatementsRouter.post("/:caseId/:suspectId?", addSuspectStatement);

export default suspectStatementsRouter;
