import mongoose, { model } from "mongoose";
import Case from "../models/case.model.js";
import dotenv from "dotenv";
import fs from "fs";

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

  const { gender, age, description, additional } = req.body;
  if (!gender || !age || !description) {
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

    const prompt = `Generate a realistic portrait-style image of a suspect with the following characteristics:

    Physical Description:
    - Gender: ${gender}
    - Age Range: ${age}
    - Primary Features: ${description}
    ${additional ? `- Additional Characteristics: ${additional}` : ""}
    
    Image Specifications:
    1. Composition
       - Head and shoulders portrait format
       - Face centered and clearly visible
       - Subject facing slightly to the left at approximately 15 degrees
       - Neutral facial expression
       - Eye level perspective
    
    2. Technical Details
       - High contrast, evenly distributed lighting
       - Natural skin tones and textures
       - Sharp focus on facial features
       - Professional portrait style
       - Resolution suitable for identification purposes
    
    3. Background
       - Solid neutral gray backdrop (#E5E5E5)
       - No distracting elements or patterns
       - Subtle gradient lighting from left to right
    
    4. Essential Feature Focus
       - Clear depiction of eye shape and color
       - Detailed rendering of nose and mouth structure
       - Accurate representation of hair style, color, and texture
       - Precise rendering of any unique identifying features
       - Natural shadowing to enhance facial structure
    
    Generate the image maintaining photorealistic quality while ensuring all specified characteristics are accurately represented. The final result should be suitable for identification purposes while avoiding any artistic embellishments that could mislead.`;

    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
    });

    if (!imageResponse.data || !imageResponse.data[0]?.url) {
      return res.status(500).send({
        message: "Failed to generate image",
      });
    }
    const inputs = {
      gender,
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

export const generateImageSketch = async (req, res) => {
  const caseId = req.params.caseId;
  if (!caseId) {
    return res.status(400).send({
      message: "Case ID is missing",
    });
  }

  if (caseId && !mongoose.Types.ObjectId.isValid(caseId)) {
    return res.status(404).send({
      message: "Case ID is of invalid format",
    });
  }

  const image = req.file;

  if (!image) {
    return res.status(400).send({
      message: "Image is missing",
    });
  }

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const responseImage = await openai.images.edit({
      model: "dall-e-2",
      image: fs.createReadStream(image.path),
      mask: fs.createReadStream("./uploads/transparent.png"),
      prompt: "Transform this into a photorealistic image of a person",
      size: "256x256",
    });

    if (!responseImage.data || !responseImage.data[0]?.url) {
      return res.status(500).send({
        message: "Failed to generate image",
      });
    }

    const editedImageUrl = responseImage.data[0].url;
    console.log("Edited Image URL:", editedImageUrl);

    return res.status(201).send({
      editedImageUrl,
      message: "Image added successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
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

  const { gender, age, description, additional, image, prompt } = req.body;

  if (!gender || !age || !description || !image || !prompt) {
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
      gender,
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

export const getSketches = async (req, res) => {
  const caseId = req.params.caseId;

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const sketches = caseData.suspectSketches;

    if (sketches.length == 0) {
      return res.status(400).send({
        message: "No sketches",
      });
    }

    return res.status(200).send({
      sketches,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};
