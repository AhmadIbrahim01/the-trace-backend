import { Router } from "express";

import {
  addWitness,
  updateWitness,
  getWitnesses,
  getWitness,
  deleteWitness,
} from "../controllers/witness.controller.js";

const witnessRouter = new Router();

witnessRouter.post("/:id?", addWitness);
witnessRouter.put("/:caseId/witnesses/:witnessId?", updateWitness);
witnessRouter.get("/:caseId?", getWitnesses);
witnessRouter.get("/:caseId/:witnessId?", getWitness);
witnessRouter.delete("/:caseId/:witnessId?", deleteWitness);

export default witnessRouter;
