import { Router } from "express";
import { register } from "../controllers/auth.controller.js";

const authRouter = new Router();

authRouter.post("/", register);

export default authRouter;
