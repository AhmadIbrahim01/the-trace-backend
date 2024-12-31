import { Router } from "express";
import {
  updateUser,
  deleteUser,
  toggleBanUser,
} from "../controllers/admin.controller.js";

const adminRouter = new Router();

adminRouter.put("/:userId?", updateUser);
adminRouter.delete("/:userId?", deleteUser);
adminRouter.post("/ban/:userId?", toggleBanUser);

export default adminRouter;
