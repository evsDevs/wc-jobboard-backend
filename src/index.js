const express = require("express");
const morgan = require("morgan");
const router = require("./api");
const { logger } = require("./utils/logger");
const { errorHandler } = require("./middleware/error-handler");
const bodyParser = require('body-parser');


// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = process.env.PORT || 8081;

logger.info("🤖 Initializing middleware");
app.use(bodyParser.json()); // for parsing application/json
app.use(morgan("tiny", { stream: logger.stream }));
app.use("/", router);
app.use(errorHandler);

// Serve the application at the given port
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`🎧 Listening at http://localhost:${port}/`);
  });
}

module.exports = {
  app
};
