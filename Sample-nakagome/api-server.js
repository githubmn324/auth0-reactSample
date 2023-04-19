const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");
const request = require("request");

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

app.get("/api/external/workflow", checkJwt, (req, res) => {
  request.get({
      uri: `${authConfig.audience}/bff/workflow`,
      headers: {'Authorization': req.get('Authorization')},
      qs: {
        // GETのURLの後に付く?hoge=hugaの部分
      },
      json: true
  }, function(err, req, data){
      res.send({
        data
      });
  });
});

app.get("/api/external/api2", checkJwt, (req, res) => {
  request.get({
      uri: `${authConfig.audience}/bff/api2`,
      headers: {'Authorization': req.get('Authorization')},
      qs: {
        // GETのURLの後に付く?hoge=hugaの部分
      },
      json: true
  }, function(err, req, data){
      res.send({
        data
      });
  });
});


app.listen(port, () => console.log(`API Server listening on port ${port}`));