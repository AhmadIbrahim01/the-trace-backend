import { Router } from "express";
import { addSuspect } from "../controllers/suspect.controller.js";
const suspectRouter = new Router();

suspectRouter.post("/:caseId?", addSuspect);

export default suspectRouter;
