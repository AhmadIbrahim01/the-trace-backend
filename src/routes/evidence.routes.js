import { Router } from "express";
import {
  addEvidence,
  updateEvidence,
  getEvidences,
  getEvidence,
  deleteEvidence,
} from "../controllers/evidence.controller.js";

const evidenceRouter = new Router();

evidenceRouter.post("/:caseId?", addEvidence);
evidenceRouter.put("/:caseId/:evidenceId?", updateEvidence);
evidenceRouter.get("/:caseId?", getEvidences);
evidenceRouter.get("/:caseId/:evidenceId?", getEvidence);
evidenceRouter.delete("/:caseId/:evidenceId?", deleteEvidence);

export default evidenceRouter;
