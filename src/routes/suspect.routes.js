import { Router } from "express";
import {
  addSuspect,
  updateSuspect,
  getSuspects,
} from "../controllers/suspect.controller.js";
const suspectRouter = new Router();

suspectRouter.post("/:caseId?", addSuspect);
suspectRouter.put("/:caseId/:suspectId?", updateSuspect);
suspectRouter.get("/:caseId?", getSuspects);

export default suspectRouter;
