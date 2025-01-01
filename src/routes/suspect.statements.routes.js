import { Router } from "express";
import {
  addSuspectStatement,
  updateSuspectStatement,
  getSuspectStatements,
  getSuspectStatement,
} from "../controllers/suspect.statements.controller.js";

const suspectStatementsRouter = new Router();

suspectStatementsRouter.post("/:caseId/:suspectId?", addSuspectStatement);
suspectStatementsRouter.put(
  "/:caseId/:suspectId/:statementId?",
  updateSuspectStatement
);
suspectStatementsRouter.get("/:caseId/:suspectId?", getSuspectStatements);
suspectStatementsRouter.get(
  "/:caseId/:suspectId/:statementId?",
  getSuspectStatement
);

export default suspectStatementsRouter;
