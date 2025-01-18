import { Router } from "express";
import {
  generateTextSketch,
  saveSketch,
  generateImageSketch,
  getSketches,
} from "../controllers/ai.sketches.controller.js";

import multer from "multer";

const sketchRouter = new Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

sketchRouter.get("/:caseId?", getSketches);
sketchRouter.post("/save/:caseId?", saveSketch);
sketchRouter.post("/:caseId?", generateTextSketch);
sketchRouter.post(
  "/image/:caseId?",
  upload.single("image"),
  generateImageSketch
);

export default sketchRouter;
