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

export const countCases = async (req, res) => {
  try {
    const caseCount = await Case.countDocuments();

    return res.status(200).send({
      message: "Total number of cases retrieved successfully.",
      totalCases: caseCount,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const countOpenCases = async (req, res) => {
  try {
    const openCasesCount = await Case.countDocuments({ status: "open" });

    return res.status(200).send({
      message: "Count of open cases retrieved successfully",
      count: openCasesCount,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const countClosedCases = async (req, res) => {
  try {
    const closedCasesCount = await Case.countDocuments({ status: "closed" });

    return res.status(200).send({
      message: "Count of closed cases retrieved successfully",
      count: closedCasesCount,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const countInProgressCases = async (req, res) => {
  try {
    const inProgressCasesCount = await Case.countDocuments({
      status: "in_progress",
    });

    return res.status(200).send({
      message: "Count of in progress cases retrieved successfully",
      count: inProgressCasesCount,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const countSolvedCases = async (req, res) => {
  try {
    const solvedCasesCount = await Case.countDocuments({ status: "solved" });

    return res.status(200).send({
      message: "Count of solved cases retrieved successfully",
      count: solvedCasesCount,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const casesStats = async (req, res) => {
  try {
    const caseCount = await Case.countDocuments();
    const openCasesCount = await Case.countDocuments({ status: "open" });
    const closedCasesCount = await Case.countDocuments({ status: "closed" });
    const solvedCasesCount = await Case.countDocuments({ status: "solved" });
    const inProgressCasesCount = await Case.countDocuments({
      status: "in_progress",
    });

    return res.status(200).send({
      caseCount,
      openCasesCount,
      closedCasesCount,
      solvedCasesCount,
      inProgressCasesCount,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const getPublicCases = async (req, res) => {
  try {
    const publicCases = await Case.find({ visibility: "public" });

    if (!publicCases || publicCases.length === 0) {
      return res.status(404).send({
        message: "No public cases found",
      });
    }

    return res.status(200).send({
      message: "Public cases retrieved successfully",
      publicCases,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
