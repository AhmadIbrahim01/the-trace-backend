import mongoose from "mongoose";

const { Schema } = mongoose;
export const caseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    status: {
      type: String,
      enum: ["open", "closed", "in_progress"],
      default: "open",
    },

    tags: [{ type: String }],

    assignedInvestigator: {
      investigatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String },
    },

    suspects: [
      {
        name: { type: String, required: true },
        contactInformation: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String },
        address: { type: String },
        crimeInvolved: { type: String, required: true },
        occupation: { type: String },
        height: { type: Number },
        weight: { type: Number },
        eyeColor: { type: String },
        hairColor: { type: String },
        photo: { type: String },
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
    evidence: [
      {
        type: { type: String, required: true },
        description: { type: String, required: true },
        locationOfCollection: { type: String, required: true },
        collectedAt: { type: Date, required: true },
        photo: { type: String },
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
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
        accepted: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    map: { type: String },
    scene: { type: String },
    caseImages: { type: String },
  },
  { timestamps: true }
);

// export const Case = model("Case", caseSchema);

const Case = mongoose.model("Case", caseSchema);
export default Case;
