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
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const witnesses = caseData.witnesses;
    const witnessIndex = witnesses.findIndex(
      (witness) => witness._id.toString() === witnessId
    );

    const witness = witnesses[witnessIndex];

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
