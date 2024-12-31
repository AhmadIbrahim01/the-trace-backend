import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    role,
    profilePicture,
    banned,
  } = req.body;

  try {
    if (!firstName || !lastName) {
      return res.status(400).send({
        message: "Missing required fields",
      });
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    if (email && email.toLowerCase() !== userData.email.toLowerCase()) {
      const loweredEmail = email.toLowerCase();
      const userEmail = await User.findOne({ email: loweredEmail });
      if (userEmail) {
        return res.status(409).send({
          message: "Email already registered",
        });
      }
    }

    if (phone && phone !== userData.phone) {
      const userPhone = await User.findOne({ phone });
      if (userPhone) {
        return res.status(409).send({
          message: "Phone already registered",
        });
      }
    }

    let hashedPassword = userData.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email: email ? email.toLowerCase() : userData.email,
        phone: phone || userData.phone,
        password: hashedPassword,
        role: role || userData.role,
        profilePicture: profilePicture || userData.profilePicture,
        banned: banned !== undefined ? banned : userData.banned,
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

export const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    return res.status(200).send({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const toggleBanUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    userData.banned = !userData.banned;
    await userData.save();

    return res.status(200).send({
      userData,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(200).send({
        message: "No users found",
      });
    }

    return res.status(200).send({
      users,
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
    const user = await User.findById(userId);
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

export const getInvestigators = async (req, res) => {
  try {
    const investigators = await User.find({ role: "investigator" });
    if (investigators.length === 0) {
      return res.status(200).send({
        message: "No investigators found",
      });
    }

    return res.status(200).send({
      investigators,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened",
    });
  }
};
