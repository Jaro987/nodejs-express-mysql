const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

var AuthController = require('./auth/AuthController');
app.use('/', AuthController);

require("./app/routes/customer.routes")(app);
require("./app/routes/user.routes")(app);
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});