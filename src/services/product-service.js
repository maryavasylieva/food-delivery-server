const fs = require("fs");
const path = require("path");

const productsPath = path.join(
  __dirname,
  "..",
  "db",
  "products",
  "all-products.json"
);

const productService = {
  getAll: () => {
    return new Promise((res, rej) => {

      fs.open(productsPath, "r", (err, fd) => {

        fs.readFile(fd, "utf-8", (err, data) => {
          if (err) rej(err);
          res({ status: "success", products: JSON.parse(data) });
          fs.close(fd, () => {
            console.log("succes read file");
          });
        });
      });
    });
  },

  getById: (id) => {
    return new Promise((res, rej) => {

      fs.open(productsPath, "r", (err, fd) => {

        fs.readFile(fd, "utf-8", (err, data) => {
          const allProducts = JSON.parse(data);

          const getProductId = allProducts.filter(
            (products) => products.id === id
          );
          
          res(
            getProductId
              ? { ststus: "success", getProductId }
              : { status: "no products", products: [] }
          );
        });

        if (err) rej(err);
      });
    });
  },

  getByIds: (ids) => {
    try {
      return new Promise((res, rej) => {

        fs.open(productsPath, "r", (err, fd) => {

          fs.readFile(fd, "utf-8", (err, data) => {
            const allProducts = JSON.parse(data);

            const idsArr = ids.split(",").map((product) => Number(product));

            const products = allProducts.filter((product) =>
              idsArr.includes(product.id)
            );
            res(
              products.length
                ? { status: "success", products }
                : { status: "no products", products: [] }
            );
          });

          if (err) rej(err);
        });
      });
    } catch (e) {
      throw new Error("Something went wrong when get by ids:", e);
    }
  },

  getByCat: (category) => {

    return new Promise((res, rej) => {

      fs.open(productsPath, "r", (err, fd) => {

        fs.readFile(fd, "utf-8", (err, data) => {
          const allProducts = JSON.parse(data);

          const categoryArr = category.split(",");

          const products = allProducts.filter((product) => {
            const matchedProduct = categoryArr.map((category) =>
              product.categories.includes(category) ? true : false
            );
            return !matchedProduct.includes(false);
          });

          res(
            products.length
              ? { status: "success", products }
              : { status: "no product", products: [] }
          );
        });

        if (err) rej(err);
      });
    });
  }
};

module.exports = {
  productsPath,
  productService
};
