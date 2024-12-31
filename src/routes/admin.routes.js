import { Router } from "express";
import {
  updateUser,
  deleteUser,
  toggleBanUser,
  getUsers,
  getUser,
} from "../controllers/admin.controller.js";

const adminRouter = new Router();

adminRouter.get("/", getUsers);
adminRouter.get("/:userId?", getUser);
adminRouter.put("/:userId?", updateUser);
adminRouter.delete("/:userId?", deleteUser);
adminRouter.post("/ban/:userId?", toggleBanUser);

export default adminRouter;
