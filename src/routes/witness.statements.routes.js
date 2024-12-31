import { Router } from "express";
import {
  addWitnessStatement,
  updateWitnessStatement,
  deleteWitnessStatement,
  getWitnessStatements,
  getWitnessStatement,
} from "../controllers/witness.statements.controller.js";

const witnessStatementsRouter = new Router();

witnessStatementsRouter.post("/:caseId/:witnessId?", addWitnessStatement);
witnessStatementsRouter.put(
  "/:caseId/:witnessId/:statementId?",
  updateWitnessStatement
);
witnessStatementsRouter.delete(
  "/:caseId/:witnessId/:statementId?",
  deleteWitnessStatement
);
witnessStatementsRouter.get("/:caseId/:witnessId?", getWitnessStatements);
witnessStatementsRouter.get(
  "/:caseId/:witnessId/:statementId?",
  getWitnessStatement
);

export default witnessStatementsRouter;
