import Case from "../models/case.model.js";

export const addWitness = async (req, res) => {
  const userId = req.params.id;

  const { name, phone, age, gender, address } = req.body;

  try {
    const newWitness = {
      name,
      phone,
      age,
      gender,
      address,
      createdAt: new Date(),
    };

    const createWitness = await Case.findById(userId);

    createWitness.witnesses.push(newWitness);

    await createWitness.save();

    return res.status(201).send({
      name,
      phone,
      age,
      gender,
      address,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const updateWitness = async (req, res) => {
  try {
    const { caseId, witnessId } = req.params;
    const { name, phone, age, gender, address } = req.body;
    if (!name || !phone || !age || !gender || !address) {
      return res.status(400).send({
        message: "All fields are required to update the witness",
      });
    }
    const caseData = await Case.findById(caseId);

    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }
    const witnessIndex = caseData.witnesses.findIndex(
      (witness) => witness._id.toString() === witnessId
    );

    if (witnessIndex === -1) {
      return res.status(404).json({
        message: "Witness not found in this case",
      });
    }
    caseData.witnesses[witnessIndex] = {
      ...caseData.witnesses[witnessIndex],
      _id: witnessId,
      name,
      phone,
      age,
      gender,
      address,
      updatedAt: new Date(),
    };

    await caseData.save();

    res.status(200).json({
      message: "Witness updated successfully",
      case: caseData,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const getWitnesses = async (req, res) => {
  try {
    const caseId = req.params.caseId;
    console.log(caseId);

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

    return res.status(200).send({ witnesses });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};
export const getWitness = async (req, res) => {
  try {
    const { caseId, witnessId } = req.params;
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

    const witness = witnesses[witnessIndex];

    return res.status(200).send({ witness });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};
