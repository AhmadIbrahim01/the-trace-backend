import { Router } from "express";
import {
  updateUser,
  deleteUser,
  toggleBanUser,
  getUsers,
  getUser,
  getInvestigators,
  toggleInvestigator,
  getStats,
  getAdmins,
  getAdmin,
} from "../controllers/admin.controller.js";

const adminRouter = new Router();

adminRouter.get("/stats", getStats);
adminRouter.get("/investigators", getInvestigators);
adminRouter.get("/admins", getAdmins);
adminRouter.get("/admins/:adminId?", getAdmin);
adminRouter.get("/", getUsers);
adminRouter.get("/:userId?", getUser);
adminRouter.put("/:userId?", updateUser);
adminRouter.put("/investigator/:userId?", toggleInvestigator);
adminRouter.delete("/:userId?", deleteUser);
adminRouter.post("/ban/:userId?", toggleBanUser);

export default adminRouter;
