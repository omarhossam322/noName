const express = require("express");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

userRoutes.route("/user/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    countrycode: req.body.countrycode,
    tel: req.body.tel,
    email: req.body.email,
    passportNo: req.body.passportNo,
  };
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

userRoutes.route("/user/login").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { 
    username: req.body.username
  };
  db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

userRoutes.route("/userDetails/:username").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { username: req.params.username};
  db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

userRoutes.route("/updateUser/:username").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { username: req.params.username};
  let newvalues = {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      passportNo: req.body.passportNo,
      email: req.body.email,
    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 user updated");
      response.json(res);
    });
});

userRoutes.route("/user/changePass").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { username: req.body.username};
  let newvalues = {
    $set: {
      password: req.body.newpassword
    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 user updated");
      response.json(res);
    });
});

module.exports = userRoutes;
