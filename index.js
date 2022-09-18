const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes/index.js");
app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(5000, () => {
  console.log("server started");
});
