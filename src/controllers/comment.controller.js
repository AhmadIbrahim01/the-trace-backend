import Case from "../models/case.model.js";
import { User } from "../models/user.model.js";

export const createComment = async (req, res) => {
  const caseId = req.params.caseId;
  const { userId, content } = req.body;

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const newComment = {
      userId,
      content,
      profilePicture: user.profilePicture,
    };
    const comments = caseData.comments;
    comments.push(newComment);
    await caseData.save();
    // Populate comment
    // const caseData = await Case.findById(caseId).populate(
    //   "comments.userId",
    //   "firstName lastName profilePicture"
    // );

    return res.status(201).send({
      Message: "Comment created successfully",
      newComment,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};
export const deleteComment = async (req, res) => {};
