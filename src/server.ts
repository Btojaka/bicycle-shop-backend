/**
 * @file This file sets up and configures the Express server for the bicycle shop backend.
 * It imports necessary modules, connects to the database, and sets up middleware and routes.
 */

import express from "express";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import db from "./config/database";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import { createServer } from "http";
import { Server } from "socket.io";

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
    // await db.sync({ alter: true });
    await db.sync(); // Sync all models with the database in development
    return true;
    // console.log(
    //   "Connection to the database has been established successfully."
    // );
  } catch (error) {
    console.log("Unable to connect to the database");
    return false;
  }
}

// Call the function to connect to the database
connectDB();

// Instantiate the Express server
const server = express();
const httpServer = createServer(server); // Create HTTP server for WebSockets

// Allow connections from the frontend
const corsOptions: CorsOptions = {
  origin: [
    "https://btojaka.github.io/bicycle-shop-frontend", // Agrega la URL completa de GitHub Pages
    "http://localhost:5173", // Para desarrollo local con Vite
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Habilita cookies o autenticación si es necesario
};

server.use(cors(corsOptions));

// Middleware to process JSON data
server.use(express.json());

// Middleware to log requests to the console
server.use(morgan("dev"));

// Configure the server to use the routes
server.use("/api", routes);

// API Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

// WebSocket setup with CORS (only frontend URL allowed)
const io = new Server(httpServer, {
  cors: {
    origin: [
      "https://btojaka.github.io/bicycle-shop-frontend",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("New WebSocket connection:", socket.id);

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected:", socket.id);
  });
});

export { io, httpServer, server };
