import { Router } from "express";
import {
  register,
  login,
  getUser,
  updateUser,
  updateProfileImage,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = new Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/:userId?", getUser);
authRouter.put("/:userId?", updateUser);
authRouter.put("/profilepicture/:userId?", updateProfileImage);

export default authRouter;
