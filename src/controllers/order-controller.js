const debug = require("debug")("controller");
const orderService  = require("../services/order-service");

module.exports = {
  postOrder: async function(req, res) {
    try {
      const order = await orderService.postOrder(req.body, req.file);
      res.json(order);
    } catch (e) {
      debug("Catch error %0", e);
    }
  }
};
