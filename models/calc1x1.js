const Joi = require("joi");
const mongoose = require("mongoose");
// const {genreSchema} = require('./genre');

const Calc1x1 = mongoose.model(
  "Calc1x1",
  new mongoose.Schema({
    schoolClass: {
      type: Number,
      required: true,
      min: 0,
      max: 13,
    },
    difficulty: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 255,
    },
    maxValue: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    task: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 255,
    },
    result: {
      type: Number,
      required: true,
      min: 0,
      max: 4096,
    },
  })
);

function validateCalc1x1(calc) {
  const schema = {
    schoolClass: Joi.number().min(1).required(),
    difficulty: Joi.string().min(4).max(10).required(),
    type: Joi.string().min(4).max(10).required(),
    maxValue: Joi.number().min(0).required(),
    task: Joi.string().min(4).max(50).required(),
    result: Joi.number().min(0).required(),
  };

  return Joi.validate(calc, schema);
}

exports.Calc1x1 = Calc1x1;
exports.validate = validateCalc1x1;
