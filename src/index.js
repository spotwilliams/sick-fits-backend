require("dotenv").config({ path: ".env" });
const cookieParser = require("cookie-parser");
const createServer = require("./createServer");
const db = require("./db");

server = createServer();

// Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());
// TODO: Use express middleware to populate user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  (deets) => {
    console.log(`Server running on port http://localhost:${deets.port}`);
  }
);
