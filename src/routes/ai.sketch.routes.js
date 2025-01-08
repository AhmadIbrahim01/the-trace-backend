import { Router } from "express";
import { addSketch } from "../controllers/ai.sketches.controller.js";

const sketchRouter = new Router();

sketchRouter.post("/:caseId?", addSketch);

export default sketchRouter;
