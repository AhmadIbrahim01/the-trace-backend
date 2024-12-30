import { Router } from "express";

import {
  addTip,
  updateTip,
  getTips,
  getTip,
} from "../controllers/tip.controller.js";

const tipRouter = new Router();

tipRouter.post("/:caseId?", addTip);
tipRouter.put("/:caseId/:tipId?", updateTip);
tipRouter.get("/:caseId?", getTips);
tipRouter.get("/:caseId/:tipId?", getTip);

export default tipRouter;
