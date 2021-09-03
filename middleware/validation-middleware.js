// src/middleware/validation-middleware.js

const validator = require("../helpers/validate");

const cakeValidator = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    imageUrl: "required|string",
    comment: "required|string|max:200",
    // yumFactor: "required|int|max:1",
  };
  let cake = JSON.parse(req.body.cake);
  cake.imageUrl = cake.imageUrl.value;
  validator(cake, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  cakeValidator,
};
