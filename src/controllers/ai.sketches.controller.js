import mongoose from "mongoose";

import Case from "../models/case.model.js";

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
