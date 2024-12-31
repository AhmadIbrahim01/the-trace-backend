import { Router } from "express";
import { updateUser, deleteUser } from "../controllers/admin.controller.js";

const adminRouter = new Router();

adminRouter.put("/:userId?", updateUser);
adminRouter.delete("/:userId?", deleteUser);

export default adminRouter;
