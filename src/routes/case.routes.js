import { Router } from "express";
import { createCase } from "../controllers/case.controller.js";

const caseRouter = new Router();

caseRouter.post("/", createCase);

export default caseRouter;
