import { Router } from "express";
import {
  addEvidence,
  updateEvidence,
  getEvidences,
} from "../controllers/evidence.controller.js";

const evidenceRouter = new Router();

evidenceRouter.post("/:caseId?", addEvidence);
evidenceRouter.put("/:caseId/:evidenceId?", updateEvidence);
evidenceRouter.get("/:caseId", getEvidences);

export default evidenceRouter;
