const getUser = require("./users/get-user");
const mainRoute = require("./main/main");
const handleProductsRoute = require("./product/handle-product-route")


const router = {
  "/me": mainRoute,
  "/users": getUser,
  "/products": handleProductsRoute,
  default: mainRoute
};

module.exports = router;