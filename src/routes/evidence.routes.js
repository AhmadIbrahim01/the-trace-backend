import { Router } from "express";
import {
  addEvidence,
  updateEvidence,
  getEvidences,
  getEvidence,
} from "../controllers/evidence.controller.js";

const evidenceRouter = new Router();

evidenceRouter.post("/:caseId?", addEvidence);
evidenceRouter.put("/:caseId/:evidenceId?", updateEvidence);
evidenceRouter.get("/:caseId?", getEvidences);
evidenceRouter.get("/:caseId/:evidenceId?", getEvidence);

export default evidenceRouter;
