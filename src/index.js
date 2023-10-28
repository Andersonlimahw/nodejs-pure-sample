const http = require("http");
const { URL } = require("url");

const requestHandler = require('./helpers/requestHandler');

const server = http.createServer((request, response) => {

  const parsedUrl = new URL(`http://localhost:3000${request.url}`);
  console.log(`Init : method ${request.method} , url: ${request.url}`);
  requestHandler(parsedUrl, request, response);  
  
});

server.listen(3000, () =>
  console.log("🆗 Server is running at http://locahost:3000")
);
