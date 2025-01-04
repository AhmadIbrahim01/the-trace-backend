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
export const deleteComment = async (req, res) => {
  const { caseId, commentId } = req.params;
  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const comments = caseData.comments;

    const commentIndex = comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }

    const deletedComment = comments[commentIndex];

    const updatedComments = comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    caseData.comments = updatedComments;
    await caseData.save();

    return res.status(200).send({
      message: "Comment deleted successfully",
      deletedComment,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const getComments = async (req, res) => {
  const caseId = req.params.caseId;

  try {
    const caseData = await Case.findById(caseId).populate(
      "comments.userId",
      "firstName lastName profilePicture"
    );
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const comments = caseData.comments;

    if (comments.length == 0) {
      return res.status(400).send({
        message: "No comments",
      });
    }

    // Populate comment
    // const caseData = await Case.findById(caseId).populate(
    //   "comments.userId",
    //   "firstName lastName profilePicture"
    // );

    return res.status(200).send({
      comments,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const getComment = async (req, res) => {
  const { caseId, commentId } = req.params;

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }
    const comments = caseData.comments;
    const commentIndex = comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }
    const comment = comments[commentIndex];

    return res.status(200).send({
      comment,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const likeComment = async (req, res) => {
  const { caseId, commentId } = req.params;

  try {
    const caseData = await Case.findById(caseId);

    if (!caseData) {
      return res.status(404).send({
        message: "Case not found",
      });
    }

    const comments = caseData.comments;

    const commentIndex = comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }

    const updatedComment = comments[commentIndex];
    updatedComment.likes += 1;
    await caseData.save();
    return res.status(201).send({
      message: "Like added successfully",
      updatedComment,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};

export const deleteAllComments = async (req, res) => {
  const caseId = req.params.caseId;

  try {
    const caseData = await Case.findById(caseId);

    if (!caseData) {
      return res.status(404).send({
        messaeg: "Case not found",
      });
    }

    caseData.comments = [];
    await caseData.save();
    return res.status(200).send({
      message: "All comments deleted successfully.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};
