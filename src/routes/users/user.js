// const qs = require("querystring");
const fs = require("fs");
const path = require("path");

const saveUser = (user) => {
  const usersPath = path.join(
    __dirname,
    "../../db/users/",
    `${user.username.toLowerCase()}.json`
  );
  fs.writeFile(usersPath, JSON.stringify(user), (error) => {
    if (error) throw error;
  });
};

const usersRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("error", (err) => {
      console.error(err);
    });

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      const user = JSON.parse(body);
      saveUser(user);

      const responseSuccess = JSON.stringify({
        status: "success",
        user: user
      });
      response.writeHead(201, { "Content-Type": "application/json" });
      response.end(responseSuccess);
    });
  }
};

module.exports = usersRoute;
