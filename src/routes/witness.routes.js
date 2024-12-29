import { Router } from "express";

import {
  addWitness,
  updateWitness,
} from "../controllers/witness.controller.js";

const witnessRouter = new Router();

witnessRouter.post("/:id?", addWitness);
witnessRouter.put("/case/:caseId/witnesses/:witnessId?", updateWitness);

export default witnessRouter;
