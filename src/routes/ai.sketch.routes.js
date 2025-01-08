import { Router } from "express";
import {
  addSketch,
  generateSketch,
} from "../controllers/ai.sketches.controller.js";

const sketchRouter = new Router();

sketchRouter.post("/:caseId?", addSketch);
sketchRouter.post("/:caseId/:sketchId?", generateSketch);

export default sketchRouter;
