import { connect } from "mongoose";

const connectToDatabase = async () => {
  try {
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASSWORD;
    const dbName = process.env.DB_NAME;

    const url = `${dbHost}:${dbPort}/${dbName}`;

    await connect(url);
    console.log("Connected to database");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToDatabase;
