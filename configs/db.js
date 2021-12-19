import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(
      chalk.green.underline.bold(
        `MongoDB connected: ${conn.connection.host}:${conn.connection.port}`
      )
    );
  } catch (error) {
    console.error(
      chalk.red.underline.bold(`Error connectingDB: ${error.message}`)
    );
    process.exit(1);
  }
};

export default connectDB;
