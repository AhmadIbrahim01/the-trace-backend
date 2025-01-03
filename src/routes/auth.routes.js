import { Router } from "express";
import { register, login, getUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = new Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/:userId?", getUser);

export default authRouter;
