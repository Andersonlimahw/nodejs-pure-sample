const bodyParser = require("./bodyParser");
const routes = require("../routes");

function requestHandler(parsedUrl, request, response) {
  try {
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
      console.log(`🆗 Success : method ${request.method} , url: ${request.url}`);
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
      console.error(`❌ Error : method ${request.method} , url: ${request.url}`);
    }   
  } catch (ex) {
    console.error(`❌ Error : method ${request.method} , url: ${request.url}, error: ${ex}`);
  } finally {
    console.log(`🎇 Finally : method ${request.method} , url: ${request.url}`);
  }
}

module.exports = requestHandler;
