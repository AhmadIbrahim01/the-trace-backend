import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = new Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
