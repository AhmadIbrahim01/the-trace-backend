import Case from "../models/case.model.js";

export const addWitnessStatement = async (req, res) => {
  const { caseId, witnessId } = req.params;
  const {
    userId,
    date,
    statement,
    locationOfIncident,
    approximatedAge,
    description,
    additionalFeatures,
    photo,
  } = req.body;

  try {
    if (
      !userId ||
      !date ||
      !statement ||
      !locationOfIncident ||
      !approximatedAge ||
      !additionalFeatures
    ) {
      return res.status(404).send({
        message: "Missing data",
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
      return res.status(404).json({
        message: "Witness not found",
      });
    }

    const newStatement = {
      userId,
      date,
      statement,
      locationOfIncident,
      suspectDetails: {
        approximatedAge,
        description,
        additionalFeatures,
        photo,
      },
    };

    witness.statements.push(newStatement);
    await caseData.save();
    return res.status(200).send({
      message: "Statement added successfully",
      newStatement,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const updateWitnessStatement = async (req, res) => {
  const { caseId, witnessId, statementId } = req.params;
  const {
    userId,
    date,
    statement,
    locationOfIncident,
    approximatedAge,
    description,
    additionalFeatures,
    photo,
  } = req.body;

  try {
    if (
      !userId ||
      !date ||
      !statement ||
      !locationOfIncident ||
      !approximatedAge ||
      !additionalFeatures
    ) {
      return res.status(404).send({
        message: "Missing data",
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
      return res.status(404).json({
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

    witness.statements[statementIndex] = {
      ...witness.statements[statementIndex],
      _id: statementId,
      userId,
      date,
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

    await caseData.save();
    res.status(200).send({
      message: "Statement updated successfully",
      case: caseData,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};
