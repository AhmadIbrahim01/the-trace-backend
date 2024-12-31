import { Router } from "express";
import { updateUser } from "../controllers/admin.controller.js";

const adminRouter = new Router();

adminRouter.put("/:userId?", updateUser);

export default adminRouter;
