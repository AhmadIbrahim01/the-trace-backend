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
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const updateEvidence = async (req, res) => {
  const { caseId, evidenceId } = req.params;
  const { type, description, location, collectedAt, photo } = req.body;

  try {
    if (!type || !description || !location || !collectedAt) {
      return res.status(400).send({
        message: "Incomplete data",
      });
    }

    const caseData = await Case.findById(caseId);

    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const evidenceIndex = caseData.evidence.findIndex(
      (evidence) => evidence._id.toString() === evidenceId
    );

    if (evidenceIndex === -1) {
      return res.status(404).send({
        message: "Evidence not found",
      });
    }

    const existingEvidence = caseData.evidence[evidenceIndex];

    caseData.evidence[evidenceIndex] = {
      ...existingEvidence,
      _id: evidenceId,
      type,
      description,
      location,
      collectedAt,
      photo,
      updatedAt: new Date(),
    };

    await caseData.save();

    return res.status(201).send({
      message: "Evidence updated successfully",
      case: caseData,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const getEvidences = async (req, res) => {
  const caseId = req.params.caseId;

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }
    const evidences = caseData.evidence;
    if (evidences.length == 0) {
      return res.status(400).send({
        message: "No evidences",
      });
    }
    return res.status(200).send({
      evidences,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
export const getEvidence = async (req, res) => {};
export const deleteEvidence = async (req, res) => {};
