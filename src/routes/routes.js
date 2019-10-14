const pizza = require("./product/product");
const mainRoute = require("./main/main");
const usersRoute = require("./users/user");


const router = {
  "/users": usersRoute,
  "/products": pizza,
  default: mainRoute
};

module.exports = router;
