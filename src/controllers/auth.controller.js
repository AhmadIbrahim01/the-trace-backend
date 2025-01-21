import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const register = async (req, res) => {
  const { firstName, lastName, email, phone, password, role, profilePicture } =
    req.body;

  try {
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).send({
        message: "Missing credentials",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const userExists = await User.findOne({
      $or: [{ email: normalizedEmail }, { phone }],
    });
    if (userExists) {
      return res.status(409).send({
        message:
          userExists.email === normalizedEmail
            ? "Email already registered"
            : "Phone already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email: normalizedEmail,
      phone,
      password: hashed,
      role,
      profilePicture,
    });

    await user.save();

    const { password: _, ...userResponse } = user.toObject();
    return res.status(201).json(userResponse);
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    if (user.banned) {
      return res.status(403).json({
        message: "Account is banned. Login failed.",
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
  if (!userId) {
    return res.status(400).json({
      message: "Missing user ID.",
    });
  }

  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid user ID format.",
    });
  }

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

  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid user ID format.",
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
      const normalizedEmail = email.toLowerCase();
      const userEmail = await User.findOne({ email: normalizedEmail });
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
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid user ID format.",
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
