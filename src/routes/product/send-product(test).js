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

const getId = (url) => {
  const lastIndex = url.lastIndexOf("/");

  if (lastIndex !== -1) {
    return url.slice(lastIndex + 1);
  }

  return id;
};

const getProduct = (request, response) => {
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
      response.writeHead(200, {"Content-Type": "Application/json"})

      if (querySearch.category) {
        const categoriesArr = cat.split(",");
        console.log("cat :", cat);
        console.log("categoriesArr", categoriesArr);
        const productsArr = JSON.parse(data);
        const products = productsArr.filter((product) => {
          const matchedCategories = categoriesArr.map((category) =>
            product.categories.includes(category) ? true : false
          );
          // returns false if there is at least one false AND true if all categories matched
          return !matchedCategories.includes(false);
        });

        const productByCategory =
          matchedCategories.length !== 0
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
        response.end();
      } 
      
      if (querySearch.ids) {
        const ids = querySearch.ids
          .split(",")
          .map((product) => Number(product));
        const getProdId = product.filter((el) => ids.includes(el.id));
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
        response.write(prodIds);
        response.end();
      } 
      
      if (Number(id)) {
        const getProdById = product.filter((el) => el.id === id);
        const prodById =
          getProdById !== undefined
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
        response.end();
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

      fs.close(() => {
        console.log('Success resd file')
      })
    });
  });
};

module.exports = getProducts;
