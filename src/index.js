require("dotenv").config({ path: ".env" });
const createServer = require("./createServer");
const db = require("./db");

server = createServer();

// TODO: Use express middleware to handle cookies (JWT)
// TODO: Use express middleware to populate user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server running on port http://localhost:${deets.port}`);
  }
);
