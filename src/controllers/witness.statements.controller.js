import Case from "../models/case.model.js";

import mongoose from "mongoose";

export const addWitnessStatement = async (req, res) => {
  const { caseId, witnessId } = req.params;
  if (!caseId || !witnessId) {
    return res.status(400).send({
      message: "Missing case id or witness id",
    });
  }
  if (caseId && !mongoose.Types.ObjectId.isValid(caseId)) {
    return res.status(400).send({
      message: "Invalid caseId format.",
    });
  }
  if (witnessId && !mongoose.Types.ObjectId.isValid(witnessId)) {
    return res.status(400).send({
      message: "Invalid witnessId format.",
    });
  }
  const {
    date,
    statement,
    locationOfIncident,
    approximatedAge,
    description,
    additionalFeatures,
    photo,
  } = req.body;

  if (
    !date ||
    !statement ||
    !locationOfIncident ||
    !approximatedAge ||
    !additionalFeatures
  ) {
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

    const witnessIndex = caseData.witnesses.findIndex(
      (w) => w._id.toString() === witnessId
    );
    if (witnessIndex === -1) {
      console.log("Witness not found");
    }

    const witness = caseData.witnesses[witnessIndex];

    const newStatement = {
      date: parsedDate,
      statement,
      locationOfIncident,
      suspectDetails: {
        approximatedAge,
        description,
        additionalFeatures,
        photo,
      },
      createdAt: new Date(),
    };

    const statements = witness.statements;

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

export const updateWitnessStatement = async (req, res) => {
  const { caseId, witnessId, statementId } = req.params;
  const {
    date,
    statement,
    locationOfIncident,
    approximatedAge,
    description,
    additionalFeatures,
    photo,
  } = req.body;

  if (
    !date ||
    !statement ||
    !locationOfIncident ||
    !approximatedAge ||
    !additionalFeatures
  ) {
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

    const witness = caseData.witnesses.find(
      (w) => w._id.toString() === witnessId
    );
    if (!witness) {
      return res.status(404).send({
        message: "Witness not found",
      });
    }

    const statementIndex = witness.statements.findIndex(
      (s) => s._id.toString() === statementId
    );
    if (statementIndex === -1) {
      return res.status(404).send({
        message: "Statement not found",
      });
    }

    const updatedStatement = {
      ...witness.statements[statementIndex],
      _id: statementId,
      date: parsedDate,
      statement,
      locationOfIncident,
      suspectDetails: {
        approximatedAge,
        description,
        additionalFeatures,
        photo,
      },
      updatedAt: new Date(),
    };

    witness.statements[statementIndex] = updatedStatement;

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

export const deleteWitnessStatement = async (req, res) => {
  const { caseId, witnessId, statementId } = req.params;

  try {
    if (!caseId || !witnessId || !statementId) {
      return res.status(400).send({
        message: "Missing caseId, witnessId, or statementId",
      });
    }

    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const witness = caseData.witnesses.find(
      (w) => w._id.toString() === witnessId
    );
    if (!witness) {
      return res.status(404).send({
        message: "Witness not found",
      });
    }

    const statementIndex = witness.statements.findIndex(
      (s) => s._id.toString() === statementId
    );
    if (statementIndex === -1) {
      return res.status(404).send({
        message: "Statement not found",
      });
    }

    const [deletedStatement] = witness.statements.splice(statementIndex, 1);
    await caseData.save();

    return res.status(200).send({
      message: "Deleted statement successfully",
      deletedStatement,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const getWitnessStatements = async (req, res) => {
  const { caseId, witnessId } = req.params;

  if (!caseId || !witnessId) {
    return res.status(400).send({
      message: "Missing required parameters",
    });
  }

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const witness = caseData.witnesses.find(
      (witness) => witness._id.toString() === witnessId
    );

    if (!witness) {
      return res.status(404).send({
        message: "Witness not found",
      });
    }

    if (witness.statements.length === 0) {
      return res.status(404).send({
        message: "No statements found for this witness",
      });
    }

    return res.status(200).send({
      message: "Witness statements retrieved successfully",
      statements: witness.statements,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const getWitnessStatement = async (req, res) => {
  const { caseId, witnessId, statementId } = req.params;
  if (!caseId || !witnessId || !statementId) {
    return res.status(404).send({
      message: "Missing required parameters",
    });
  }
  if (caseId && !mongoose.Types.ObjectId.isValid(caseId)) {
    return res.status(400).send({
      message: "Invalid caseId format.",
    });
  }
  if (witnessId && !mongoose.Types.ObjectId.isValid(witnessId)) {
    return res.status(400).send({
      message: "Invalid witnessId format.",
    });
  }
  if (statementId && !mongoose.Types.ObjectId.isValid(statementId)) {
    return res.status(400).send({
      message: "Invalid statementId format.",
    });
  }

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const witnesses = caseData.witnesses;
    if (witnesses.length == 0) {
      return res.status(400).send({
        message: "No witnesses",
      });
    }
    const witnessIndex = caseData.witnesses.findIndex(
      (witness) => witness._id.toString() === witnessId
    );

    if (witnessIndex === -1) {
      return res.status(404).send({
        message: "Witness not found",
      });
    }
    const witness = witnesses[witnessIndex];

    if (witness.statements.length === 0) {
      return res.status(404).send({
        message: "No statements found for this witness",
      });
    }

    const statementIndex = witness.statements.findIndex(
      (s) => s._id.toString() === statementId
    );

    if (statementIndex === -1) {
      return res.status(404).send({
        message: "Statement not found",
      });
    }

    const statement = witness.statements[statementIndex];

    return res.status(200).send({
      message: "Witness statement retrieved successfully",
      statement,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
