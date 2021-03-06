const express = require("express");

// flightRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const flightRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the flights.
flightRoutes.route("/flight").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("flights")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get flights by departure airport
flightRoutes.route("/reserve/:flight_to").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { flight_from: req.params.flight_to};
  db_connect
      .collection("flights")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

flightRoutes.route("/reserve/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    user: req.body.user,
    dep_flight_no: req.body.dep_flight_no,
    return_flight_no: req.body.return_flight_no,
  };
  db_connect.collection("reservations").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

flightRoutes.route("/reserve/edit").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.body.id )};
  let myobj = {
    $set: {
      _id: ObjectId( req.body.id ),
      user: req.body.user,
      dep_flight_no: req.body.dep_flight_no,
      return_flight_no: req.body.return_flight_no,
    }
  };
  db_connect.collection("reservations").updateOne(myquery, myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

flightRoutes.route("/reservations/:user").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { user: req.params.user};
  db_connect
      .collection("reservations")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

flightRoutes.route("/reservations/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("reservations").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 reservation deleted");
    response.status(obj);
  });
});

// This section will help you get a single record by id
flightRoutes.route("/flight/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("flights")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
flightRoutes.route("/flight/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    flight_no: req.body.flight_no,
    flight_from: req.body.flight_from,
    flight_to: req.body.flight_to,
    flight_time: req.body.flight_time,
    flight_date: req.body.flight_date,
    flight_arrival_time: req.body.flight_arrival_time,
    flight_arrival_date: req.body.flight_arrival_date,
    flight_duration: req.body.flight_duration,
    flight_cabin: req.body.flight_cabin,
    flight_baggage: req.body.flight_baggage,
    flight_seats: req.body.flight_seats,
    flight_price: req.body.flight_price,
  };
  db_connect.collection("flights").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
flightRoutes.route("/updateFlight/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      flight_no: req.body.flight_no,
      flight_from: req.body.flight_from,
      flight_to: req.body.flight_to,
      flight_time: req.body.flight_time,
      flight_date: req.body.flight_date,
      flight_arrival_time: req.body.flight_arrival_time,
      flight_arrival_date: req.body.flight_arrival_date,
      flight_duration: req.body.flight_duration,
      flight_cabin: req.body.flight_cabin,
      flight_baggage: req.body.flight_baggage,
      flight_seats: req.body.flight_seats,
      flight_price: req.body.flight_price,
    },
  };
  db_connect
    .collection("flights")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
flightRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("flights").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = flightRoutes;
