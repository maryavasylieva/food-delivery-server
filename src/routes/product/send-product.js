const fs = require("fs");
const path = require("path");
const url = require("url");
const qs = require("qs");

const productPath = path.join(
  __dirname,
  "..",
  "..",
  "db",
  "products",
  "all-products.json"
);

const getId = url => {
  const lastIndex = url.lastIndexOf("/");

  if (lastIndex !== -1) {
    return url.slice(lastIndex + 1);
  }
};

const getProducts = (request, response) => {
  fs.open(productPath, "r", (err, fd) => {
    if (err) {
      console.log(err);
    }

    fs.readFile(fd, "utf-8", (err, data) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end({ message: "Something went wrong when get product" });
      }

      const product = JSON.parse(data);
      const parsedUrl = url.parse(request.url);
      const id = getId(parsedUrl.path);
      const querySearch = qs.parse(parsedUrl.query);
      const productsArr = JSON.parse(data);
      // response.writeHead(200, { "Content-Type": "Application/json" });

      if (querySearch.category) {
        const categoriesArr = querySearch.category.split(",");
        console.log("categoriesArr", categoriesArr);
        const products = productsArr.filter(product => {
          const matchedCategories = categoriesArr.map(category =>
            product.categories.includes(category) ? true : false
          );
          // returns false if there is at least one false AND true if all categories matched
          return !matchedCategories.includes(false);
        });

        const productByCategory =
          products.length !== 0
            ? JSON.stringify({
                status: "success",
                products: products
              })
            : JSON.stringify({
                status: "no categories",
                products: []
              });

        response.writeHead(200, {
          "Content-Type": "application/json"
        });
        response.write(productByCategory);
        return response.end();
      }

      if (querySearch.ids) {
        const ids = querySearch.ids.split(",").map(product => Number(product));
        const getProdId = product.filter(el => ids.includes(el.id));
        const prodIds =
          getProdId.length !== 0
            ? JSON.stringify({
                status: "success",
                products: getProdId
              })
            : JSON.stringify({
                status: "no categories",
                products: []
              });

        response.writeHead(200, {
          "Content-Type": "application/json"
        });
        return response.end(prodIds);
      }
      if (Number(id)) {
        const getProdById = productsArr.filter(el => el.id === Number(id));
        console.log(getProdById);
        const prodById = getProdById.length
          ? JSON.stringify({
              status: "success",
              products: getProdById
            })
          : JSON.stringify({
              status: "no products",
              products: []
            });

        response.writeHead(200, {
          "Content-Type": "application/json"
        });
        response.write(prodById);
        return response.end();
      }

      if ("products") {
        response.writeHead(200, {
          "Content-Type": "application/json"
        });
        response.write(
          JSON.stringify({
            status: "success",
            products: product
          })
        );
        response.end();
      }

      fs.close(fd, () => {
        console.log("Success read file");
      });
    });
  });
};

module.exports = getProducts;
