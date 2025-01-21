import Case from "../models/case.model.js";
import mongoose from "mongoose";

export const getInvestigatorStats = async (req, res) => {
  const investigatorId = req.params.investigatorId;
  if (!investigatorId) {
    return res.status(404).send({
      message: "Investigator ID is missing",
    });
  }

  if (investigatorId && !mongoose.Types.ObjectId.isValid(investigatorId)) {
    console.log("Investigator ID is of invalid format");
  }
  try {
    const investigatorCaseCount = await Case.countDocuments({
      investigatorId: investigatorId,
    });
    const investigatorSolvedCasesCount = await Case.countDocuments({
      investigatorId: investigatorId,
      status: "solved",
    });
    const investigatorOpenCasesCount = await Case.countDocuments({
      investigatorId: investigatorId,
      status: "open",
    });
    const investigatorClosedCasesCount = await Case.countDocuments({
      investigatorId: investigatorId,
      status: "closed",
    });

    return res.status(200).send({
      investigatorCaseCount,
      investigatorSolvedCasesCount,
      investigatorOpenCasesCount,
      investigatorClosedCasesCount,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
