const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./routes/routes");
const middleware = require("./middleware/middleware");

const server = express();

server
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(morgan("combined"))
  .use(middleware.commonMiddleware)
  .use("/products", router.products)
  .use("/user", router.user)
  .use("/order", router.order)
  .use("/*", (req, res) => {
    res.statusCode = 404;
    res.json({ message: "Invalid url" });
  })
  .use(middleware.errorHandler);

module.exports = server;
