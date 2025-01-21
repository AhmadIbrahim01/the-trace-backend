import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const spiltted = authHeader.split(" ");

  if (spiltted.length !== 2 || spiltted[0] !== "Bearer") {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const token = spiltted[1];

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    const id = payload.id;

    const user = await User.findById(id);

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Error happened in auth middleware",
    });
  }
};
