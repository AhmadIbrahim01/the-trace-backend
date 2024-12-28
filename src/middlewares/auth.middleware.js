export const authMiddleware = (req, res, next) => {
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
    next();
  } catch (error) {
    return res.status(500).send({
      message: "Error happened in auth middleware",
    });
  }
};
