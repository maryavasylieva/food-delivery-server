const debug = require("debug")("controller");

const { productService } = require("../services/product-service");

module.exports = {
  get: async function(req, res) {
    try {
      let products;
      if (req._parsedUrl.path === "/") {
        products = await productService.getAll();
      }

      if (req.query.category) {
        products = await productService.getByCat(req.query.category);
      }

      if (req.query.ids) {
        products = await productService.getByIds(req.query.ids);
      }

      res.json(products);
    } catch (e) {
      debug("Catch error %O", e);
    }
  },

  getById: async function(req, res) {
    try {
      const getId = Number(req.params.id);
      const product = await productService.getById(getId);
      res.json(product);
    } catch (e) {
      debug("Catch error %O", e);
    }
  }
};
