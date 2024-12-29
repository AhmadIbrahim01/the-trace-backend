import { Router } from "express";
import { addTestimonial } from "../controllers/testimonial.controller.js";

const testimonialRouter = new Router();

testimonialRouter.post("/add", addTestimonial);

export default testimonialRouter;
