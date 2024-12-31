import { Router } from "express";
import { addWitnessStatement } from "../controllers/witness.statements.controller.js";

const witnessStatementsRouter = new Router();

witnessStatementsRouter.post("/:caseId/:witnessId?", addWitnessStatement);

export default witnessStatementsRouter;
