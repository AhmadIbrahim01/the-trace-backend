import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/connection.js";
import authRouter from "./routes/auth.routes.js";
import testimonialRouter from "./routes/testimonial.routes.js";
import caseRouter from "./routes/case.routes.js";
import witnessRouter from "./routes/witness.routes.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authRouter);
app.use("/testimonial", testimonialRouter);
app.use("/case", caseRouter);
app.use("/witness", witnessRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
  connectToDatabase();
});
