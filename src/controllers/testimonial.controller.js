import { Testimonial } from "../models/testimonial.model.js";
export const addTestimonial = async (req, res) => {
  const { firstName, testimonial, profilePhoto = "empty" } = req.body;

  try {
    if (!firstName || !testimonial) {
      return res.status(500).send({
        message: "Missing testimonial",
      });
    }

    const check = await Testimonial.findOne({ firstName });
    console.log(check);

    if (check) {
      return res.status(500).send({
        message: "User already added testimonial from before",
      });
    }

    const newTestimonial = await Testimonial.create({
      firstName,
      testimonial,
      profilePhoto,
    });
    return res.status(201).send({
      message: "Successfully added",
      newTestimonial,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find({}).limit(2);

  if (testimonials == "") {
    return res.status(500).send({
      message: "No testimonial",
    });
  }
  return res.status(200).send({
    testimonials,
  });
};
