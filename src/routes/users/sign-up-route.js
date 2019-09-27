const saveUser = require("../../helpers/save-user");

const usersRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("error", (err) => {
      if (!!err) {
        response.writeHead(500, { "Content-Type": "application/json" });
        return response.end(
          JSON.stringify({ message: "Something went wrong when create user" })
        );
      }
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
