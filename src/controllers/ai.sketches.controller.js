import mongoose, { model } from "mongoose";
import Case from "../models/case.model.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateTextSketch = async (req, res) => {
  const caseId = req.params.caseId;

  if (!caseId) {
    return res.status(404).send({
      message: "Case Id is missing",
    });
  }

  if (caseId && !mongoose.Types.ObjectId.isValid(caseId)) {
    return res.status(400).send({
      message: "Case id is not valid format",
    });
  }

  const { name, age, description, additional } = req.body;
  if (!name || !age || !description) {
    return res.status(404).send({
      message: "Missing info",
    });
  }

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const prompt = `Create an image of a suspect named ${name}. The suspect has ${description} He is approximately in the age range ${age}. ${
      additional ? "The suspect has " + additional + "." : ""
    } Ensure that the face is centered in the image, with the suspect's head and shoulders visible in the foreground. The lighting should be clear, with a neutral background that doesn't distract from the suspect's face.`;

    const image = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      size: "256x256",
    });

    const inputs = {
      name,
      age,
      description,
      additional,
    };
    return res.status(201).send({
      message: "Sketch was generated succesfully",
      image: image.data[0].url,
      inputs,
      prompt,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
