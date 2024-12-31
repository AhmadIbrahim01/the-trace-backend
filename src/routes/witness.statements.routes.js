import { Router } from "express";
import {
  addWitnessStatement,
  updateWitnessStatement,
} from "../controllers/witness.statements.controller.js";

const witnessStatementsRouter = new Router();

witnessStatementsRouter.post("/:caseId/:witnessId?", addWitnessStatement);
witnessStatementsRouter.put(
  "/:caseId/:witnessId/:statementId?",
  updateWitnessStatement
);

export default witnessStatementsRouter;
