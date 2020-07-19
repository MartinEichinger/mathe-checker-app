const { Calc1x1, validate } = require("../models/calc1x1");
// const { Genre } = require("../models/genre");
// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
// const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("routes/calc1x1", req.query, Object.keys(req.query).length);
    let calc1x1;
    if (Object.keys(req.query).length > 0) {
      console.log("found query...lets go...");
      calc1x1 = await Calc1x1.find(JSON.parse(req.query["0"])).exec();
    } else {
      console.log("found no query...I send all...");
      calc1x1 = await Calc1x1.find().exec();
      console.log(calc1x1);
    }
    res.send(calc1x1);
  } catch (error) {
    console.log("routes/calc1x1");
    return res.status(400).send(error.details[0].message);
  }
});

// router.post("/", [auth], async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findById(req.body.genreId);
//   if (!genre) return res.status(400).send("Invalid genre.");

//   const movie = new Movie({
//     title: req.body.title,
//     genre: {
//       _id: genre._id,
//       name: genre.name,
//     },
//     numberInStock: req.body.numberInStock,
//     dailyRentalRate: req.body.dailyRentalRate,
//     publishDate: moment().toJSON(),
//   });
//   await movie.save();

//   res.send(movie);
// });

//router.put("/:id", [auth], async (req, res) => {
// router.put("/", async (req, res) => {
//     //const { error } = validate(req.body);
//   console.log("calc/put: ", req.body);

//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findById(req.body.genreId);
//   if (!genre) return res.status(400).send("Invalid genre.");

//   const movie = await Movie.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: req.body.title,
//       genre: {
//         _id: genre._id,
//         name: genre.name,
//       },
//       numberInStock: req.body.numberInStock,
//       dailyRentalRate: req.body.dailyRentalRate,
//     },
//     { new: true }
//   );

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

// router.delete("/:id", [auth, admin], async (req, res) => {
//   const movie = await Movie.findByIdAndRemove(req.params.id);

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

// router.get("/:id", validateObjectId, async (req, res) => {
//   const movie = await Movie.findById(req.params.id).select("-__v");

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

module.exports = router;
