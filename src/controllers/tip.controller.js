import Case from "../models/case.model.js";

export const addTip = async (req, res) => {
  const caseId = req.params.caseId;
  const { userId, content, file, locationOfIncident, dateOfIncident } =
    req.body;

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    if (!userId || !content) {
      return res.status(400).send({
        message: "Missing required informations",
      });
    }

    const newTip = {
      userId,
      content,
      file,
      locationOfIncident,
      dateOfIncident,
    };

    caseData.tips.push(newTip);
    await caseData.save();

    return res.status(201).send({
      message: "Tip added successfully",
      newTip,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
export const updateTip = async (req, res) => {};
export const getTips = async (req, res) => {};
export const getTip = async (req, res) => {};
export const deleteTip = async (req, res) => {};
export const acceptTip = async (req, res) => {};
