import mongoose, { Schema, model } from "mongoose";
const chatMessageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const chatSchema = new Schema(
  {
    title: {
      type: String,
      default: "New Chat",
    },
    messages: [chatMessageSchema],
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true,
    },
    caseTitle: { type: String },
    caseDescription: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["public_user", "investigator", "admin", "super_admin"],
      default: "public_user",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    banned: { type: Boolean, default: "false" },
    tipsStats: {
      videos: { type: Number, default: 0 },
      photos: { type: Number, default: 0 },
      documents: { type: Number, default: 0 },
      accepted: { type: Number, default: 0 },
    },
    level: { type: Number, default: 1 },
    badges: [{ type: String }],
    chats: [chatSchema],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const User = model("User", userSchema);
