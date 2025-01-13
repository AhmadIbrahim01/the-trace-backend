import { Router } from "express";
import {
  generateTextSketch,
  saveSketch,
} from "../controllers/ai.sketches.controller.js";

const sketchRouter = new Router();

sketchRouter.post("/save/:caseId?", saveSketch);
sketchRouter.post("/:caseId?", generateTextSketch);

export default sketchRouter;
