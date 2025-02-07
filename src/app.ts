/**
 * @fileoverview Entry point for the bicycle-shop-backend application.
 * It imports the server instance and starts listening on the specified port.
 * The port is either taken from the environment variable `PORT` or defaults to 4000.
 *
 * @module app
 */

/**
 * The port on which the Express server will listen.
 * Defaults to 4000 if the `PORT` environment variable is not set.
 *
 * @constant {number|string} PORT
 */

/**
 * Starts the server and listens on the specified port.
 * Logs a message to the console once the server is running.
 *
 * @function
 * @name listen
 * @memberof server
 * @param {number|string} PORT - The port number or string on which the server will listen.
 * @param {Function} callback - A callback function that logs a message to the console.
 */
import { httpServer } from "./server"; // Use httpServer instead of server

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
