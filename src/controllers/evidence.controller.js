import Case from "../models/case.model.js";

export const addEvidence = async (req, res) => {
  const { type, description, location, collectedAt, photo } = req.body;
  const caseId = req.params.caseId;

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const newEvidence = {
      type,
      description,
      location,
      collectedAt,
      photo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    caseData.evidence.push(newEvidence);
    await caseData.save();
    return res.status(201).send({
      message: "Evidence added successfully",
      newEvidence,
    });
  } catch (error) {
    console.error("Error adding evidence:", error.message);
    return res.status(500).send({
      message: "An error occurred. Please try again later.",
    });
  }
};

export const updateEvidence = async (req, res) => {};
export const getEvidences = async (req, res) => {};
export const getEvidence = async (req, res) => {};
export const deleteEvidence = async (req, res) => {};
