import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { firstName, lastName, email, phone, password, role } = req.body;

  try {
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).send({
        message: "Missing credentials",
      });
    }

    const loweredEmail = email.toLowerCase();

    const userExists = await User.findOne({
      $or: [{ email: loweredEmail }, { phone }],
    });
    if (userExists) {
      return res.status(409).send({
        message:
          userExists.email === loweredEmail
            ? "Email already registered"
            : "Phone already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email: loweredEmail,
      phone,
      password: hashed,
      role,
    });

    return res.status(201).send(user);
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res.status(401).send({
        message: "Invalid credentials",
      });
    }
    const userId = user._id.toString();

    const expirationTime = "1h";
    const token = await jwt.sign(
      { email: user.email, name: user.firstName, userId },
      process.env.JWT_SECRET,
      { expiresIn: expirationTime }
    );

    return res.status(200).send({
      user: { email: user.email, firstName: user.firstName },
      token,
      message: "Login successfully",
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    return res.status(200).send({
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
