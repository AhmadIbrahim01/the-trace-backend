import mongoose from "mongoose";
import Case from "../models/case.model.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const addSketch = async (req, res) => {
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

    const sketch = {
      name,
      age,
      description,
      additional,
    };
    caseData.suspectSketches.push(sketch);

    await caseData.save();

    return res.status(201).send({
      message: "Sketch data was added successfully",
      sketch,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const generateSketch = async (req, res) => {
  const { caseId, sketchId } = req.params;
  if (!caseId) {
    return res.status(404).send({
      message: "Case Id is not found",
    });
  }
  if (caseId && !mongoose.Types.ObjectId.isValid(caseId)) {
    return res.status(500).send({
      message: "Case Id is not in a valid format",
    });
  }
  if (!sketchId) {
    return res.status(404).send({
      message: "Sketch Id is not found",
    });
  }
  if (sketchId && !mongoose.Types.ObjectId.isValid(sketchId)) {
    return res.status(500).send({
      message: "Sketch Id is not in a valid format",
    });
  }
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(404).send({
      message: "Prompt is missing",
    });
  }

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case has not been found",
      });
    }

    const sketchIndex = caseData.suspectSketches.findIndex(
      (sketch) => sketch._id.toString() === sketchId
    );
    if (sketchIndex === -1) {
      return res.status(404).send({
        message: "Sketch not found",
      });
    }

    const image = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      size: "256x256",
    });

    caseData.suspectSketches[sketchIndex] = image.data;
    await caseData.save();

    return res.status(201).send({
      message: "API request successful",
      url: image.data,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
