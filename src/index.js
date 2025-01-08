import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/connection.js";
import authRouter from "./routes/auth.routes.js";
import testimonialRouter from "./routes/testimonial.routes.js";
import caseRouter from "./routes/case.routes.js";
import witnessRouter from "./routes/witness.routes.js";
import suspectRouter from "./routes/suspect.routes.js";
import evidenceRouter from "./routes/evidence.routes.js";
import commentRouter from "./routes/comment.routes.js";
import tipRouter from "./routes/tip.routes.js";
import adminRouter from "./routes/admin.routes.js";
import witnessStatementsRouter from "./routes/witness.statements.routes.js";
import suspectStatementsRouter from "./routes/suspect.statements.routes.js";
import sketchRouter from "./routes/ai.sketch.routes.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", authRouter);
app.use("/api/testimonial", testimonialRouter);
app.use("/api/case", caseRouter);
app.use("/api/witness", witnessRouter);
app.use("/api/suspect", suspectRouter);
app.use("/api/evidence", evidenceRouter);
app.use("/api/comment", commentRouter);
app.use("/api/tip", tipRouter);
app.use("/api/admin", adminRouter);
app.use("/api/witness/statements", witnessStatementsRouter);
app.use("/api/suspect/statements", suspectStatementsRouter);
app.use("/api/sketches", sketchRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
  connectToDatabase();
});
