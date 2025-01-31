import Case from "../models/case.model.js";

export const addWitness = async (req, res) => {
  const caseId = req.params.id;

  const { name, phone, age, gender, address, photo } = req.body;

  try {
    if (!caseId) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    if (!name || !phone || !age) {
      return res.status(400).send({
        message: "Incomplete data",
      });
    }
    const newWitness = {
      name,
      phone,
      age,
      gender,
      address,
      photo,
      createdAt: new Date(),
    };

    const createWitness = await Case.findById(caseId);

    createWitness.witnesses.push(newWitness);

    await createWitness.save();

    return res.status(201).send({
      name,
      phone,
      age,
      gender,
      address,
      photo,
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
    const { name, phone, age, gender, address, photo } = req.body;
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
      return res.status(404).send({
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
      photo,
      updatedAt: new Date(),
    };

    await caseData.save();

    res.status(200).send({
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

    if (witnessIndex === -1) {
      return res.status(404).send({
        message: "Witness not found",
      });
    }
    const witness = witnesses[witnessIndex];

    return res.status(200).send({ witness });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const deleteWitness = async (req, res) => {
  try {
    const { caseId, witnessId } = req.params;
    const caseData = await Case.findById(caseId);

    if (!caseData) {
      return res.status(400).send({
        message: "Case not found",
      });
    }

    const witnessIndex = caseData.witnesses.findIndex(
      (witness) => witness._id.toString() === witnessId
    );
    if (witnessIndex === -1) {
      return res.status(404).send({
        message: "Witness not found in this case",
      });
    }

    const witnesses = caseData.witnesses;
    const witness = witnesses[witnessIndex];
    const updatedData = witnesses.filter(
      (witness) => witness._id.toString() !== witnessId
    );

    caseData.witnesses = updatedData;
    await caseData.save();

    return res.status(200).send({
      message: "Witness deleted successfully",
      witness,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
