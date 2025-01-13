import mongoose, { model } from "mongoose";
import Case from "../models/case.model.js";
import dotenv from "dotenv";

import OpenAI from "openai";
dotenv.config();

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

    const imageResponse = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      size: "256x256",
    });

    if (!imageResponse.data || !imageResponse.data[0]?.url) {
      return res.status(500).send({
        message: "Failed to generate image",
      });
    }
    const inputs = {
      name,
      age,
      description,
      additional,
    };
    return res.status(201).send({
      message: "Sketch was generated succesfully",
      image: imageResponse.data[0].url,
      inputs,
      prompt,
    });
  } catch (error) {
    console.error("Error generating sketch:", error);
    return res.status(500).send({
      message: "An error occurred while generating the sketch.",
    });
  }
};

export const saveSketch = async (req, res) => {
  const caseId = req.params.caseId;
  if (!caseId) {
    return res.status(404).send({
      message: "Case Id is missing",
    });
  }
  if (caseId && !mongoose.Types.ObjectId.isValid(caseId)) {
    return res.status(404).send({
      message: "Case Id is of invalid format",
    });
  }

  const { name, age, description, additional, image, prompt } = req.body;

  if (!name || !age || !description || !image || !prompt) {
    return res.status(400).send({
      message: "Incomplete data",
    });
  }

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case is not found",
      });
    }
    const sketch = {
      name,
      age,
      description,
      additional,
      image,
      prompt,
    };
    caseData.suspectSketches.push(sketch);
    caseData.save();

    return res.status(201).send({
      message: "Sketch has been added successfully",
      sketch,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
