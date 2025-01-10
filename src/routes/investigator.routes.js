import { Router } from "express";
import { getInvestigatorStats } from "../controllers/investigator.controller.js";
const investigatorRouter = new Router();

investigatorRouter.get("/stats/:investigatorId?", getInvestigatorStats);

export default investigatorRouter;
