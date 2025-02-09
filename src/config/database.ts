import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { models } from "../models"; // Importa todos los modelos

dotenv.config(); // Load environment variables
/**
 * Initializes and configures the Sequelize instance for connecting to the PostgreSQL database.
 *
 * This configuration includes:
 * - Loading environment variables using dotenv.
 * - Setting the database connection URL from the environment variables.
 * - Specifying the dialect as PostgreSQL.
 * - Automatically loading TypeScript models from the specified directory.
 * - Disabling Sequelize logging in the console.
 * - Enabling SSL with specific options for secure connections.
 *
 * @module config/database
 */

const db = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  models: models, // Automatic loading of TypeScript models
  logging: false, // Optional: deactivate logs from Sequelize in the console
  dialectOptions: {
    ssl: {
      require: true, // Enable SSL for Railway
      rejectUnauthorized: false,
    },
  },
});

export default db;
