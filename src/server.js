const http = require("http");
const url = require("url");
const router = require("./routes/routes");
const morgan = require("morgan");
const logger = morgan("combined");
const getRouteHandler = require("./helpers/get-route-handler");

const newServer = port => {
  const server = http.createServer((request, response) => {
    // Get route from the request
    const parsedUrl = url.parse(request.url);

    // Get router function
    const func = getRouteHandler(router, parsedUrl.pathname) || router.default;

    logger(request, response, () => func(request, response));
  });

  server.listen(port, err => {
    console.log(`server listening port ${port}`);
  });
};

module.exports = newServer;

