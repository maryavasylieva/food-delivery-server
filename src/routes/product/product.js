const fs = require("fs");
const path = require("path");

const pizzaPath = path.join(
  __dirname,
  "../../",
  "db",
  "products",
  "all-products.json"
);

module.exports = (request, response) => {
  if (request.method !== "GET") return;


  fs.open(pizzaPath, "r", (err, fd) => {
    if (err) return;

    fs.readFile(fd, "utf8", (err, data) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end({ message: "Something went wrong!" });
      }

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(data);

      fs.close(fd, () => {
        console.log("Success read file");
      });
    });
  });
};

