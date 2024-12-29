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

export const getCase = async (req, res) => {
  const id = req.params.id;

  try {
    const getCase = await Case.findById(id);
    if (!getCase) {
      return res.status(500).send({
        message: "Case is not found",
      });
    }

    return res.status(200).send(getCase);
  } catch (error) {
    console.log(error.message);

    return res.status({
      message: "Error happened",
    });
  }
};

export const updateCase = async (req, res) => {
  const id = req.params.id;

  try {
    if (!id) {
      return res.status(400).send({
        messgae: "Please provide an id",
      });
    }

    const {
      title,
      description,
      assignedInvestigator,
      status,
      caseImages,
      visibility,
      tags,
    } = req.body;

    const updated = await Case.findByIdAndUpdate(
      id,
      {
        title,
        description,
        assignedInvestigator,
        status,
        caseImages,
        visibility,
        tags,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    return res.status(201).send({
      message: "Case updated successfully",
      updated,
    });
  } catch (error) {
    console.log(error.message);

    return res.status({
      message: "Error happened",
    });
  }
};

export const deleteCase = async (req, res) => {
  const id = req.params.id;

  try {
    if (!id) {
      return res.status(400).send({
        message: "ID is required",
      });
    }

    const deleted = await Case.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    return res.status(201).send({
      message: "Case deleted successfully",
      deleted,
    });
  } catch (error) {
    console.log(error.message);

    return res.status({
      message: "Error happened",
    });
  }
};
