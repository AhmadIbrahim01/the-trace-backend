import { Router } from "express";

import {
  addWitness,
  updateWitness,
  getWitnesses,
} from "../controllers/witness.controller.js";

const witnessRouter = new Router();

witnessRouter.post("/:id?", addWitness);
witnessRouter.put("/case/:caseId/witnesses/:witnessId?", updateWitness);
witnessRouter.get("/:id?", getWitnesses);

export default witnessRouter;
