import { Router } from "express";
import {
  addSuspect,
  updateSuspect,
} from "../controllers/suspect.controller.js";
const suspectRouter = new Router();

suspectRouter.post("/:caseId?", addSuspect);
suspectRouter.put("/:caseId/:suspectId?", updateSuspect);

export default suspectRouter;
