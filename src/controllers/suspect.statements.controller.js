import mongoose from "mongoose";
import Case from "../models/case.model.js";

export const addSuspectStatement = async (req, res) => {
  const { caseId, suspectId } = req.params;

  if (!caseId || !suspectId) {
    return res.status(404).send({
      message: "Missing case id or suspect id",
    });
  }

  if (caseId && !mongoose.Types.ObjectId.isValid(caseId)) {
    return res.status(400).send({
      message: "Invalid case id format",
    });
  }
  if (suspectId && !mongoose.Types.ObjectId.isValid(suspectId)) {
    return res.status(400).send({
      message: "Invalid suspect id format",
    });
  }

  const { date, statement, photo, locationOfIncident } = req.body;

  if (!date || !statement) {
    return res.status(400).send({
      message: "Incomplete data",
    });
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return res.status(400).send({
      message: "Invalid date format",
    });
  }

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const suspectIndex = caseData.suspects.findIndex(
      (s) => s._id.toString() === suspectId
    );
    if (suspectIndex === -1) {
      console.log("Suspect not found");
    }

    const suspect = caseData.suspects[suspectIndex];

    const newStatement = {
      date: parsedDate,
      statement,
      photo,
      locationOfIncident,
      createdAt: new Date(),
    };
    const statements = suspect.statements;
    statements.push(newStatement);

    await caseData.save();

    return res.status(201).send({
      message: "Statement added successfully",
      newStatement,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const updateSuspectStatement = async (req, res) => {
  const { caseId, suspectId, statementId } = req.params;
  if (!caseId || !suspectId || !statementId) {
    return res.status(404).send({
      message: "Missing case id, suspect id or statement id",
    });
  }

  if (caseId && !mongoose.Types.ObjectId.isValid(caseId)) {
    return res.status(400).send({
      message: "Invalid case id format",
    });
  }
  if (suspectId && !mongoose.Types.ObjectId.isValid(suspectId)) {
    return res.status(400).send({
      message: "Invalid suspect id format",
    });
  }
  if (statementId && !mongoose.Types.ObjectId.isValid(statementId)) {
    return res.status(400).send({
      message: "Invalid statement id format",
    });
  }

  const { date, statement, locationOfIncident, photo } = req.body;

  if (!date || !statement || !locationOfIncident) {
    return res.status(400).send({
      message: "Missing required fields",
    });
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return res.status(400).send({
      message: "Invalid date format",
    });
  }

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const suspect = caseData.suspects.find(
      (s) => s._id.toString() === suspectId
    );
    if (!suspect) {
      return res.status(404).send({
        message: "Suspect not found",
      });
    }

    const statementIndex = suspect.statements.findIndex(
      (s) => s._id.toString() === statementId
    );
    if (statementIndex === -1) {
      return res.status(404).send({
        message: "Statement not found",
      });
    }

    const updatedStatement = {
      ...suspect.statements[statementIndex],
      _id: statementId,
      date: parsedDate,
      statement,
      locationOfIncident,
      photo,
      updatedAt: new Date(),
    };
    suspect.statements[statementIndex] = updatedStatement;

    await caseData.save();

    return res.status(200).send({
      message: "Statement updated successfully",
      updatedStatement,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
