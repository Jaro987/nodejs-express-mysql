var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('./VerifyToken');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../app/models/user.model');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

router.post('/register', function(req, res) {
  
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 1000
    });
    res.status(200).send({ auth: true, token: token });
  }); 
});

router.get('/me', VerifyToken, function(req, res) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
});

router.post('/login', function(req, res) {
  User.findByEmail(req.body.email, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 1000
    });
    
    res.status(200).send({ auth: true, token: token });
  });
  
});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null, msg: "Successfull logout" });
});

  module.exports = router;