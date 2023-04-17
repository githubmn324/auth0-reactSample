const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { join } = require("path");
const cors = require("cors");
const authConfig = require("./src/auth_config.json");

const app = express();

const port = process.env.SERVER_PORT || 3000;

app.use(morgan("dev"));

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(express.static(join(__dirname, "build")));
app.use(cors({
  origin: authConfig.appOrigin,
  credentials: true,
  optionsSuccessStatus: 200
}));
app.listen(port, () => console.log(`Server listening on port ${port}`));
