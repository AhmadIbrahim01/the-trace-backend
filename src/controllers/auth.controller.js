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
      { email: user.email, name: user.firstName, userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: expirationTime }
    );

    return res.status(200).send({
      user: { email: user.email, firstName: user.firstName, role: user.role },
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

export const updateUser = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send({
      message: "Missing user id",
    });
  }

  const { firstName, lastName, email, phone, profilePicture } = req.body;
  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).send({
      message: "Missing credentials",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    if (email && email.toLowerCase() !== user.email.toLowerCase()) {
      const loweredEmail = email.toLowerCase();
      const userEmail = await User.findOne({ email: loweredEmail });
      if (userEmail) {
        return res.status(409).send({
          message: "Email already registered",
        });
      }
    }

    if (phone && phone !== user.phone) {
      const userPhone = await User.findOne({ phone });
      if (userPhone) {
        return res.status(409).send({
          message: "Phone already registered",
        });
      }
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email: email ? email.toLowerCase() : user.email,
        phone: phone || user.phone,
        profilePicture: profilePicture || user.profilePicture,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    return res.status(200).send({
      message: "User updated successfully",
      updated,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const updateProfileImage = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send({
      message: "Missing user id",
    });
  }
  const profilePicture = req.body.profilePicture;
  if (!profilePicture) {
    return res.status(400).send({
      message: "Missing profile picture",
    });
  }
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      {
        profilePicture,
      },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    return res.status(200).send({
      message: "User updated successfully",
      updatedProfile,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
