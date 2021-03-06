// src/routes/cakes.js

const express = require("express");
const cloudinary = require("cloudinary");
const router = express.Router();
const Cake = require("../models/cakes");
const validation = require("../middleware/validation-middleware").cakeValidator;

/**
 * Returns all cakes
 */
router.get("/", async (req, res) => {
  try {
    const cake = await Cake.find().limit().sort({ createdDate: -1 });
    res.json(cake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * returns a single cake
 */
router.get("/:_id", getCake, (req, res) => {
  res.json({
    message: "A cake found",
    success: true,
    data: res.cake,
  });
});

/**
 * Creates a Cake
 */
router.post("/", validation, async (req, res) => {
  let dataRecieved = JSON.parse(req.body.cake);
  const base64 = "data:image/jpeg;base64," + dataRecieved.imageUrl.value;
  await cloudinary.uploader
    .upload(base64, {
      use_filename: true,
    })
    .then((result) => {
      saveCake(result, dataRecieved, res);
    })
    .catch((error) => {
      console.log(error);
    });
});

/**
 *
 * @param {*} image
 * @param {*} cakeData
 * @param {*} res
 */
async function saveCake(image, cakeData, res) {
  const cake = new Cake({
    name: cakeData.name,
    comment: cakeData.comment,
    imageUrl: image.secure_url,
    public_id: image.public_id,
    yumFactor: cakeData.yumFactor,
  });
  try {
    const newCake = await cake.save();
    // console.log(newCake);
    res.status(201).json({
      message:
        "The cake code #" + newCake._id + " has been saved successfully.. ",
      success: true,
      data: newCake,
    });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
}

/**
 * Endpoint that delete a cake
 */
router.delete("/:_id", getCake, async (req, res) => {
  const public_id = res.cake.public_id;
  // return;
  try {
    await res.cake.remove();
    // Delete image from cloudinary
    cloudinary.uploader.destroy(public_id, function (result) {
      console.log(result);
    });

    res.json({
      message: "Cake ID #" + res.cake._id + " successfully deleted.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, success: false });
  }
});

async function getCake(req, res, next) {
  try {
    cake = await Cake.findOne({
      $or: [{ _id: req.params._id }, { name: req.params._id }],
    });
    if (cake == null) {
      return res.json({
        message: "Cant find cake ID #" + req.params._id,
        success: false,
      });
    }
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ message: err.message });
  }

  res.cake = cake;
  next();
}

module.exports = router;
