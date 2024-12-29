import Case from "../models/case.model.js";

export const createCase = async (req, res) => {
  const {
    title,
    description,
    assignedInvestigator,
    status,
    caseImages,
    visibility,
    tags,
  } = req.body;

  if (!title || !description || !assignedInvestigator || !caseImages) {
    return res.status(500).send({
      message: "Incompete data",
    });
  }

  const newCase = await Case.create({
    title,
    description,
    assignedInvestigator,
    status,
    caseImages,
    visibility,
    tags,
  });

  return res.status(201).send({
    newCase,
  });
};
