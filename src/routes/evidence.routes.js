import { Router } from "express";
import { addEvidence } from "../controllers/evidence.controller.js";

const evidenceRouter = new Router();

evidenceRouter.post("/:caseId?", addEvidence);

export default evidenceRouter;
