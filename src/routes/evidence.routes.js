import { Router } from "express";
import {
  addEvidence,
  updateEvidence,
} from "../controllers/evidence.controller.js";

const evidenceRouter = new Router();

evidenceRouter.post("/:caseId?", addEvidence);
evidenceRouter.put("/:caseId/:evidenceId?", updateEvidence);

export default evidenceRouter;
