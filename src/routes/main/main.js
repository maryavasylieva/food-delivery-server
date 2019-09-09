const mainRoute = (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Hello!");
  response.end();
};

module.exports = mainRoute;
