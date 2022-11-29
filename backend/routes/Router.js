const express = require("express");

// Router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const Router = express.Router();

const dbo = require('../db/smoothie_db');


// This section will help you get a list of all the documents.
Router.route("/smoothie_shack/").get(async function (req, res) {
  const dbConnect = dbo.getDb();

  await dbConnect
    .collection("smoothies")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching smoothies!");
      } else {
        res.json(result);
      }
    });
});

Router.route("/smoothie_shack/:search").get(function (req, res) {
  const db_connect = dbo.getDb();

  const myquery = { 
     $or: [ {name: new RegExp(req.params.search, 'i') }, { ingredients: new RegExp(req.params.search, 'i') } ] 
  };

  db_connect
  .collection("smoothies")
  .find(myquery).toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
 });

Router.route("/users").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  await dbConnect
    .collection("users")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching users");
      } else {
        res.json(result);
      }
    });
});

Router.route("/smoothie_shack/addFavorite").put((req, res) => {
  const dbConnect = dbo.getDb();
  const id = req.body.id;
  const fav = req.body.fav;

  dbConnect.collection("users").updateOne({user: id}, {$push : {fav : fav}},
    (error, data) => {
      if (error)
      {
        console.log(error);
      }
      else
      {
        res.json(data);
        console.log("Favorite added successfully")
      }
    });
});


Router.route("/smoothie_shack/removeFavorite").put((req, res) => {
  const dbConnect = dbo.getDb();
  const id = req.body.id;
  const fav = req.body.fav;

  dbConnect.collection("users").updateOne({user: id}, {$pull : {fav : fav}},
    (error, data) => {
      if (error)
      {
        console.log(error);
      }
      else
      {
        res.json(data);
        console.log("Favorite removed successfully")
      }
    });
});



Router.route("/smoothie_shack/updateSmoothieFreq").put((req, res) => {
  const dbConnect = dbo.getDb();
  const smoothie = req.body.smoothie;
  const count = req.body.count;

  dbConnect.collection("smoothies").updateOne({name : smoothie}, {$inc : {frequency : count}},
    (error, data) => {
      if (error)
      {
        console.log(error);
      }
      else
      {
        res.json(data);
        console.log("Smoothie frequency updated by " + count + " successfully")
      }
    });
});



Router.route("/smoothie_shack/updateSmoothieFreq").put(async function (req, res) {
  const dbConnect = dbo.getDb();
  const smoothie = req.body.smoothie;
  const count = req.body.count;

  console.log("Router: update smoothie freq called");

  try {
    await dbConnect.collection("smoothies").updateOne({name: smoothie}, {$inc : {frequency : count}});
  } catch (error)
  {
    console.log("Error updating smoothie frequency")
  }

});



Router.route("/signup").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const userInfo = {
    user: req.body.user,
    pass: req.body.pass,
    fav: req.body.fav
  };

  dbConnect
    .collection("users")
    .insertOne(userInfo, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting user!");
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

/*
// This section will help you create a new document.
Router.route("/listings/recordSwipe").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    listing_id: req.body.id,
    last_modified: new Date(),
    session_id: req.body.session_id,
    direction: req.body.direction
  };

  dbConnect
    .collection("matches")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting matches!");
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

// This section will help you update a document by id.
Router.route("/listings/updateLike").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const listingQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1
    }
  };

  dbConnect
    .collection("listingsAndReviews")
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        res.status(400).send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        console.log("1 document updated");
      }
    });
});

// This section will help you delete a record.
Router.route("/listings/delete/:id").delete((req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = { listing_id: req.body.id };

  dbConnect
    .collection("listingsAndReviews")
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res.status(400).send(`Error deleting listing with id ${listingQuery.listing_id}!`);
      } else {
        console.log("1 document deleted");
      }
    });
});
*/
module.exports = Router;