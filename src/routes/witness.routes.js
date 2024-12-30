import { Router } from "express";

import {
  addWitness,
  updateWitness,
  getWitnesses,
  getWitness,
} from "../controllers/witness.controller.js";

const witnessRouter = new Router();

witnessRouter.post("/:id?", addWitness);
witnessRouter.put("/:caseId/witnesses/:witnessId?", updateWitness);
witnessRouter.get("/:caseId?", getWitnesses);
witnessRouter.get("/:caseId/:witnessId?", getWitness);

export default witnessRouter;
