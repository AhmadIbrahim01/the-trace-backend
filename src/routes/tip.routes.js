import { Router } from "express";

import { addTip, updateTip, getTips } from "../controllers/tip.controller.js";

const tipRouter = new Router();

tipRouter.post("/:caseId?", addTip);
tipRouter.put("/:caseId/:tipId?", updateTip);
tipRouter.get("/:caseId?", getTips);

export default tipRouter;
