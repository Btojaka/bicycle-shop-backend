/**
 * @file This file sets up and configures the Express server for the bicycle shop backend.
 * It imports necessary modules, connects to the database, and sets up middleware and routes.
 */

import express from "express";
import dotenv from "dotenv";
import db from "./config/database";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

/**
 * Connects to the database and synchronizes all models.
 * If the connection fails, the server will stop.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} A promise that resolves when the database connection is successful.
 * @throws Will throw an error if the connection to the database fails.
 */

dotenv.config(); // Upload environment variables

export async function connectDB() {
  try {
    await db.authenticate();
    await db.sync({ alter: true }); // Sync all models with the database in development
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Connection to the database failed:", error);
    process.exit(1); // Stop the server
  }
}

// Call the function to connect to the database
connectDB();

const server = express();

// Middleware to process JSON data
server.use(express.json());

// Configure the server to use the routes
server.use("/api", routes);

// Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
