import mongoose from "mongoose";
const { Schema } = mongoose;

const evidenceSchema = new Schema(
  {
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    collectedAt: { type: Date, required: true },
    photo: { type: String },
  },
  { timestamps: true }
);

export const caseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "closed", "in_progress", "solved"],
      default: "open",
    },

    tags: [{ type: String }],

    investigatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // assignedInvestigator: {
    //   name: { type: String },
    // },

    suspects: [
      {
        name: { type: String, required: true },
        phone: { type: Number, required: true },
        age: { type: Number, required: true },
        gender: { type: String },
        address: { type: String },
        crimeInvolved: { type: String, required: true },
        occupation: { type: String },
        blood: { type: String },
        height: { type: Number },
        weight: { type: Number },
        eyeColor: { type: String },
        hairColor: { type: String },
        photos: [{ type: String }],
        statements: [
          {
            date: { type: Date, required: true },
            statement: { type: String, required: true },
            photo: { type: String },
            locationOfIncident: { type: String },
            analysis: {
              sentimentAnalysis: { type: String },
              keyEntities: { type: String },
              inconsistencies: { type: String },
            },
          },
        ],
      },
      { timestamps: true },
    ],
    witnesses: [
      {
        name: { type: String, required: true },
        phone: { type: Number, required: true },
        age: { type: Number, required: true },
        gender: { type: String },
        address: { type: String },
        photo: { type: String },

        statements: [
          {
            date: { type: Date, required: true },
            statement: { type: String, required: true },
            locationOfIncident: { type: String, required: true },
            suspectDetails: {
              approximatedAge: { type: String, required: true },
              description: { type: String, required: true },
              additionalFeatures: { type: String, required: true },
              photo: { type: String },
              aiGeneratedPhoto: { type: String },
            },
            statementAnalysis: {
              sentimentAnalysis: { type: String },
              keyEntities: { type: String },
              inconsistencies: { type: String },
            },
          },
        ],
      },
      { timestamps: true },
    ],
    evidence: [evidenceSchema],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to User model
          required: true,
        },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        profilePicture: { type: String },
        likes: { type: Number, default: 0 },
      },
    ],
    tips: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: { type: String, required: true },
        file: { type: String },
        locationOfIncident: { type: String },
        dateOfIncident: { type: Date },
        anonymous: { type: Boolean, default: false },
        accepted: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    map: {
      latitude: { type: String },
      longitude: { type: String },
    },
    scene: { type: String },
    caseImages: [{ type: String }],
    suspectSketches: [
      {
        name: { type: String, required: true },
        age: { type: String, required: true },
        description: { type: String, required: true },
        additional: { type: String },
        photo: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// export const Case = model("Case", caseSchema);

const Case = mongoose.model("Case", caseSchema);
export default Case;
