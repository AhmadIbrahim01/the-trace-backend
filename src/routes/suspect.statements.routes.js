import { Router } from "express";
import {
  addSuspectStatement,
  updateSuspectStatement,
  getSuspectStatements,
} from "../controllers/suspect.statements.controller.js";

const suspectStatementsRouter = new Router();

suspectStatementsRouter.post("/:caseId/:suspectId?", addSuspectStatement);
suspectStatementsRouter.put(
  "/:caseId/:suspectId/:statementId?",
  updateSuspectStatement
);
suspectStatementsRouter.get("/:caseId/:suspectId?", getSuspectStatements);

export default suspectStatementsRouter;
