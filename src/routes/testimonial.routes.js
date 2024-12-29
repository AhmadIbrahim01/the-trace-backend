import { Router } from "express";
import {
  addTestimonial,
  getTestimonials,
} from "../controllers/testimonial.controller.js";

const testimonialRouter = new Router();

testimonialRouter.post("/add", addTestimonial);
testimonialRouter.get("/get", getTestimonials);

export default testimonialRouter;
