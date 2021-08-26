const express = require("express");
const cloudinary = require("cloudinary");
const router = express.Router();
const Cake = require("../models/cakes");

// Get all cakes
router.get("/", async (req, res) => {
  try {
    const cake = await Cake.find().limit().sort({ createdDate: -1 });
    res.json(cake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one cake
router.get("/:_id", getPost, (req, res) => {
  res.json({
    message: "A cake found",
    success: true,
    data: res.cake,
  });
});

// Create one cake
router.post("/", async (req, res) => {
  let dataRecieved = JSON.parse(req.body.cake);
  const base64 = "data:image/jpeg;base64," + dataRecieved.imageUrl.value;
  const uploadResponse = await cloudinary.uploader
    .upload(base64, {
      use_filename: true,
      public_id: "/cake-factory/hadim",
      resource_type: "image",
      transformation: "cake_image",
    })
    .then((result) => {
      console.log(result);
      saveCake(result, dataRecieved, res);
    })
    .catch((error) => {
      console.log(error);
    });
});

async function saveCake(image, cakeData, res) {
  const cake = new Cake({
    name: cakeData.name,
    comment: cakeData.comment,
    imageUrl: image.secure_url,
    yumFactor: cakeData.yumFactor,
  });
  try {
    const newCake = await cake.save();
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

// Delete a cake
router.delete("/:_id", getPost, async (req, res) => {
  try {
    await res.cake.remove();
    res.json({
      message: "Cake ID #" + res.cake._id + " successfully deleted.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  try {
    cake = await Cake.findOne({ _id: req.params._id });
    if (cake == null) {
      return res.json({
        message: "Cant find cake ID #" + req.params._id,
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.cake = cake;
  next();
}

module.exports = router;
