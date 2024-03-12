const http = require("http");
const routes = require("./routes");

const server = http.createServer(routes.handler);
console.log(routes.text);

server.listen(3000, () => {
  console.log("server started on port 3000");
});
