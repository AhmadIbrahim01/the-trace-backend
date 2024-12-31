import { Router } from "express";
import {
  updateUser,
  deleteUser,
  toggleBanUser,
  getUsers,
} from "../controllers/admin.controller.js";

const adminRouter = new Router();

adminRouter.get("/", getUsers);
adminRouter.put("/:userId?", updateUser);
adminRouter.delete("/:userId?", deleteUser);
adminRouter.post("/ban/:userId?", toggleBanUser);

export default adminRouter;
