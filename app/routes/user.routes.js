module.exports = app => {
    const users = require("../controllers/user.controller");


    var VerifyToken = require('../../auth/VerifyToken');
  
    app.post("/users", users.create);
  
    app.get("/users", users.findAll);
  
    app.get("/users/:userId", users.findByID);
     
    app.get("/users/:email", users.findByEmail);
  
    app.put("/users/:userId", users.update);
  
    app.delete("/users/:userId", users.delete);
  
    app.delete("/users", users.deleteAll);
  };