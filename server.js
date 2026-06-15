const app = require("./src/app.js");

const { PORT } = require("./src/config/config.js");

/* -------------------------------------------------------------------------- */
/*                                SERVER BOOTUP OPERATIONS                              */
/* -------------------------------------------------------------------------- */
let server;

// http.Server instance - remote control to that physical network socket
server = app.listen(PORT, () => {
  console.log(`[SERVER] Server is running on port http://localhost:3000/`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log(`[SERVER]: Server closed`);
      process.exit(1);
    });
  } else {
    process.exit(1); // if server never started, then exit immadiately
  }
};

// Handle unexpected runtime errors
const unexpectedErrorHandler = (error) => {
  console.error(`[SERVER] ${error}`);
  exitHandler(); // graceful shutdown
};

// Handle synchronous error that were never caught
process.on("uncaughtException", unexpectedErrorHandler);

// Handles rejected promises
process.on("unhandledRejection", unexpectedErrorHandler);

// Handles and listen SIGTERM signal for termination by AWS Server
process.on("SIGTERM", () => {
  console.info(`[SERVER] SIGTERM recieved`);

  if (server) {
    server.close();
  }
});
