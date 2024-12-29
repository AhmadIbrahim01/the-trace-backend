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

  try {
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
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const getCases = async (req, res) => {
  try {
    const cases = await Case.find({});

    if (cases == "") {
      return res.status(500).send({
        message: "No cases",
      });
    }

    return res.status(200).send({
      cases,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
