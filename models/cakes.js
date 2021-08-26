const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const Cakeschema = new mongoose.Schema(
  {
    // _id: {
    //   type: Number,
    // },
    yumFactor: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
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
