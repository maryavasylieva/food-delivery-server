const debug = require("debug")("app:http");

module.exports = {
  commonMiddleware: (res, req, next) => {
    debug(`Request name is ${req.pathname}`);
    next();
  },

  errorHandler: (err, req, res, next) => {
    if (err) {
      console.error(err.stack);
    }
    res.statusCode = 500;
    res.json({ message: "Something went wrong!" });

    next();
  }
};
