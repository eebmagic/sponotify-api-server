const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/artist").get(function (req, res) {
 let db_connect = dbo.getDb();
 db_connect
   .collection("artistSubscribers")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/artist/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { artistID: req.query.artistID};

 console.log(`Working with req:`);
 console.log(req.query);
 console.log(`Running get artist by id with query:`);
 console.log(myquery);

 db_connect.collection("artistSubscribers")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     console.log(`Got result:`);
     console.log(result);
     res.json(result);
   });
});

recordRoutes.route("/artistdocs").get(function (req, res) {
  console.log(`RUNNING GET MANY`);
  let db_connect = dbo.getDb();
  let myquery = { artistID: { "$in": req.query.artistIDs } };
  console.log(`Got req:`);
  console.log(req.query);
  console.log(`Working with query: ${JSON.stringify(myquery)}`);

  db_connect.collection("artistSubscribers")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(`Got many results:`);
      console.log(result);
      res.json(result);
    })
})

 
// This section will help you create a new record.
recordRoutes.route("/artist/add").post(function (req, res) {
 let db_connect = dbo.getDb();
 console.log(`ADDING DOC:`);
 console.log(req.body);
 db_connect.collection("artistSubscribers")
   .insertOne(req.body, function (err, response) {
     if (err) throw err;
     console.log(`finished adding doc`);
     res.json(response);
   });
});

recordRoutes.route("/update/:id/email/:email").post(function (req, res) {
  let db_connect = dbo.getDb();
  console.log(`UPDATING DOC:`);
  console.log(req.params);

  db_connect.collection("artistSubscribers").findOne({artistID: req.params.id})
  .then(existingDoc => {

    var newDoc = {...existingDoc}
    if (!newDoc.subscribers.includes(req.params.email)) {
      newDoc.subscribers.push(req.params.email);
    }

    db_connect.collection("artistSubscribers").replaceOne(
      { artistID: req.params.id },
      newDoc
    )
    .then((result) => {
      res.json(result);
    })
  })

  db_connect.collection("artistSubscribers")

})

// TODO: Will eventually need an update func to remove

 
// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId( req.params.id )};
//  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
//  });
// });
 
module.exports = recordRoutes;