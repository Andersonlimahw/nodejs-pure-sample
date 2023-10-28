const http = require("http");
const routes = require("./routes");
const { URL } = require("url");

const bodyParser = require("./helpers/bodyParser");

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);
  console.log(`Init : method ${request.method} , url: ${request.url}`);

  // extract path params
  let { pathname } = parsedUrl;
  let id = null;
  const splitedEndpoint = pathname.split("/").filter(Boolean);
  if (splitedEndpoint.length > 1) {
    pathname = `/${splitedEndpoint[0]}/:id`;
    id = splitedEndpoint[1];
  }

  const route = routes.find(
    (route) => route.endpoint === pathname && route.method === request.method
  );

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };
    response.send = (statusCode, responseBody) => {
      response.writeHead(statusCode, { "Content-Type": "application/json" });
      response.end(JSON.stringify(responseBody));
    };

    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, {
      "Content-Type": "application/json",
    });
    response.end(
      JSON.stringify({
        url: request.url,
        method: request.method,
        message: "resource not found.",
      })
    );
  }
});

server.listen(3000, () =>
  console.log("🆗 Server is running at http://locahost:3000")
);
