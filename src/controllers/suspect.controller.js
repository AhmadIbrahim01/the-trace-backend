import Case from "../models/case.model.js";

export const addSuspect = async (req, res) => {
  const {
    name,
    phone,
    age,
    gender,
    address,
    crimeInvolved,
    occupation,
    height,
    weight,
    eyeColor,
    hairColor,
    photo,
  } = req.body;
  const caseId = req.params.caseId;
  try {
    if (!caseId) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    if (!name || !phone || !age || !crimeInvolved) {
      return res.status(400).send({
        message: "Incomplete data",
      });
    }

    const caseData = await Case.findById(caseId);

    const newSuspect = {
      name,
      phone,
      age,
      gender,
      address,
      crimeInvolved,
      occupation,
      height,
      weight,
      eyeColor,
      hairColor,
      photo,
      createdAt: new Date(),
    };

    caseData.suspects.push(newSuspect);
    await caseData.save();

    return res.status(201).send({
      message: "Suspect added successfully",
      newSuspect,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const updateSuspect = async (req, res) => {
  const { caseId, suspectId } = req.params;
  const {
    name,
    phone,
    age,
    gender,
    address,
    crimeInvolved,
    occupation,
    height,
    weight,
    eyeColor,
    hairColor,
    photo,
  } = req.body;

  try {
    if (!caseId) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    if (!name || !phone || !age || !crimeInvolved) {
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

    const suspectIndex = caseData.suspects.findIndex(
      (suspect) => suspect._id.toString() === suspectId
    );

    if (suspectIndex === -1) {
      return res.status(404).send({
        message: "Suspect not found",
      });
    }

    caseData.suspects[suspectIndex] = {
      ...caseData.suspects[suspectIndex],
      _id: suspectId,
      name,
      phone,
      age,
      gender,
      address,
      crimeInvolved,
      occupation,
      height,
      weight,
      eyeColor,
      hairColor,
      photo,
      updatedAt: new Date(),
    };
    await caseData.save();
    return res.status(200).send({
      message: "Suspect updated successfully",
      case: caseData,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const getSuspects = async (req, res) => {
  const caseId = req.params.caseId;

  try {
    if (!caseId) {
      return res.status(404).send({
        message: "No case found",
      });
    }

    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const suspects = caseData.suspects;
    if (suspects.length == 0) {
      return res.status(400).send({
        message: "No suspects",
      });
    }
    return res.status(200).send({
      suspects,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};
