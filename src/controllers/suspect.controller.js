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
      messaeg: "Suspect added successfully",
      newSuspect,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};
