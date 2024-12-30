import { Router } from "express";

import { addTip } from "../controllers/tip.controller.js";

const tipRouter = new Router();

tipRouter.post("/:caseId?", addTip);

export default tipRouter;
