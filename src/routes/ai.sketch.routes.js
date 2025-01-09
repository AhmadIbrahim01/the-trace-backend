import { Router } from "express";
import {
  generateTextSketch,
  saveSketch,
} from "../controllers/ai.sketches.controller.js";

const sketchRouter = new Router();

sketchRouter.post("/:caseId?", generateTextSketch);
sketchRouter.post("/save/:caseId?", saveSketch);

export default sketchRouter;
