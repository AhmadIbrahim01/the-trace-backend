import { Schema, model } from "mongoose";

const testimonialSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    testimonial: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Testimonial = model("Testimonial", testimonialSchema);
