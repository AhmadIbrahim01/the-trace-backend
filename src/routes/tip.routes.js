import { Router } from "express";

import {
  addTip,
  updateTip,
  getTips,
  getTip,
  deleteTip,
} from "../controllers/tip.controller.js";

const tipRouter = new Router();

tipRouter.post("/:caseId?", addTip);
tipRouter.put("/:caseId/:tipId?", updateTip);
tipRouter.get("/:caseId?", getTips);
tipRouter.get("/:caseId/:tipId?", getTip);
tipRouter.delete("/:caseId/:tipId?", deleteTip);

export default tipRouter;
