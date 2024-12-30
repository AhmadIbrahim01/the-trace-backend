import { Router } from "express";

import { addTip, updateTip } from "../controllers/tip.controller.js";

const tipRouter = new Router();

tipRouter.post("/:caseId?", addTip);
tipRouter.put("/:caseId/:tipId?", updateTip);

export default tipRouter;
