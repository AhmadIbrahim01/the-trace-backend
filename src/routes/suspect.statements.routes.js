import { Router } from "express";
import {
  addSuspectStatement,
  updateSuspectStatement,
} from "../controllers/suspect.statements.controller.js";

const suspectStatementsRouter = new Router();

suspectStatementsRouter.post("/:caseId/:suspectId?", addSuspectStatement);
suspectStatementsRouter.put(
  "/:caseId/:suspectId/:statementId?",
  updateSuspectStatement
);

export default suspectStatementsRouter;
