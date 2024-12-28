import { User } from "../models/user.model.js";
export const register = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(500).send({
        message: "Missing credentials",
      });
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(500).send({
        message: "Email already registered",
      });
    }

    const userPhone = await User.findOne({ phone });
    if (userPhone) {
      return res.status(500).send({
        message: "Phone already registered",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    return res.status(201).send(user);
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({
      message: "Failed to register",
    });
  }
};
