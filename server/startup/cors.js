const cors = require("cors");

module.exports = function (app) {
  console.log("startup/cors");
  app.use(cors());
};
