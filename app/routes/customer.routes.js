module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  var VerifyToken = require('../../auth/VerifyToken');

  app.post("/customers", VerifyToken, customers.create);

  app.get("/customers", VerifyToken, customers.findAll);

  app.get("/customers/:customerId", VerifyToken, customers.findOne);

  app.put("/customers/:customerId", VerifyToken, customers.update);

  app.delete("/customers/:customerId", VerifyToken, customers.delete);

  app.delete("/customers", VerifyToken, customers.deleteAll);
};