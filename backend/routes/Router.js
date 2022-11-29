const express = require("express");

// Router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const Router = express.Router();

const dbo = require('../db/smoothie_db');

// This section will help you get a list of all the documents.
Router.route("/smoothie_shack").get(async function (req, res) {
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
Router.route("/smoothie_shack/users").get(async function (req, res) {
  // console.log("get users called in router")
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

Router.route("/smoothie_shack/addFavorite").put(async function (req, res) {
  console.log("Router addFavorite called")
  const dbConnect = dbo.getDb();
  const id = req.body.id;
  const newfav = req.body.newfav;

  // console.log("Router " + id);
  // console.log("Router " + req.body.newfav);

  try {
    console.log("Inside push statement")
    await dbConnect.collection("users").updateOne({user: id}, {$push : {fav : newfav}});
  } catch (error)
  {
    console.log("Error updating user");
  }

});


Router.route("/smoothie_shack/removeFavorite").put(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.body.id;
  const newfav = req.body.newfav;

  console.log("Router " + id);
  console.log("Router " + req.body.newfav);

  try {
    await dbConnect.collection("users").updateOne({user: id}, {$pull : {fav : newfav}});
    // console.log("Smoothie pushed");
  } catch (error)
  {
    console.log("Error updating user");
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