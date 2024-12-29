import { Router } from "express";

import { addWitness } from "../controllers/witness.controller.js";

const witnessRouter = new Router();

witnessRouter.post("/:id?", addWitness);

export default witnessRouter;
