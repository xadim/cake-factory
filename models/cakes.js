const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const Cakeschema = new mongoose.Schema(
  {
    yumFactor: {
      type: Number,
      required: true,
      maxLength: 1,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    name: {
      type: String,
      required: true,
      maxLength: 30,
    },
    comment: {
      type: String,
      required: true,
      maxLength: 200,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);
const Cake = mongoose.model("Cake", Cakeschema);
Cake.createIndexes();

module.exports = Cake;
