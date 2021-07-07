const path = require("path");
const fs = require("fs");
const uuidv4 = require("uuid/v4");

const ordersPath = path.join(
  __dirname,
  "..",
  "db",
  "users",
  "orders",
  "orders.json"
);

const productsPath = path.join(
  __dirname,
  "..",
  "db",
  "products",
  "all-products.json"
);

const usersPath = path.join(__dirname, "..", "db", "users", "all-users.json");

module.exports = {
  postOrder: (order) => {
    try {
      return new Promise((res, rej) => {
        fs.readFile(productsPath, "utf-8", (productsErr, productsData) => {
          if (productsErr) return rej(productsErr);
          fs.readFile(usersPath, "utf-8", (usersErr, usersData) => {
            if (usersErr) return rej(usersErr);
            fs.readFile(ordersPath, "utf-8", (ordersErr, ordersData) => {
              if (ordersErr) return rej(ordersErr);
              const orders = ordersData ? JSON.parse(ordersData) : [];

              const products = JSON.parse(productsData);

              const users = JSON.parse(usersData);

              const isUser = users.find((el) => el.id === order.user);

              const orderProducts = products.filter((el) =>
                order.products.includes(el.id)
              );

              if (orderProducts.length && isUser) {
                order.products = orderProducts;
                orders.push({ id: uuidv4(), ...order });
                return fs.writeFile(
                  ordersPath,
                  JSON.stringify(orders),
                  (err) => {
                    if (!!err) {
                      response.writeHead(500, {
                        "Content-Type": "application/json"
                      });
                      return response.end(
                        JSON.stringify({ message: "something went wrong" })
                      );
                    }
                    res({ message: "success", order });
                  }
                );
              }

              res({
                message: !orderProducts.length
                  ? "no products available"
                  : "user is not valid",
                order: null
              });
            });
          });
        });
      });
    } catch (e) {
      throw new Error("Something went wrong when post order: ", e);
    }
  }
};
