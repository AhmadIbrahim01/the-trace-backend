import { Router } from "express";
import { generateTextSketch } from "../controllers/ai.sketches.controller.js";

const sketchRouter = new Router();

sketchRouter.post("/:caseId?", generateTextSketch);

export default sketchRouter;
