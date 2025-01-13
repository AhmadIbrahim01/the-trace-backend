import { Router } from "express";
import {
  generateTextSketch,
  saveSketch,
  generateImageSketch,
} from "../controllers/ai.sketches.controller.js";

const sketchRouter = new Router();

sketchRouter.post("/save/:caseId?", saveSketch);
sketchRouter.post("/:caseId?", generateTextSketch);
sketchRouter.post("/image/:caseId?", generateImageSketch);

export default sketchRouter;
