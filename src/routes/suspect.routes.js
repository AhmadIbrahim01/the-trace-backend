import { Router } from "express";
import {
  addSuspect,
  updateSuspect,
  getSuspects,
  getSuspect,
  deleteSuspect,
} from "../controllers/suspect.controller.js";
const suspectRouter = new Router();

suspectRouter.post("/:caseId?", addSuspect);
suspectRouter.put("/:caseId/:suspectId?", updateSuspect);
suspectRouter.get("/:caseId?", getSuspects);
suspectRouter.get("/:caseId/:suspectId?", getSuspect);
suspectRouter.delete("/:caseId/:suspectId?", deleteSuspect);

export default suspectRouter;
