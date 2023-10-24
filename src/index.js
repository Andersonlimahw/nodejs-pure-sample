const http = require('http');
const routes = require('./routes');


const server = http.createServer((request, response) => {
 
  const route = routes.find((route) => (
    route.endpoint === request.url && route.method === request.method
  ));
  
  if(route) {   
    route.handler(request, response);
  } else {
    response.writeHead(404, {
      'Content-Type': 'text/html'
    });
    response.end(`<h1>Not found</h1>  Method -> ${request.method} URL -> ${request.url}`);
  }
});


server.listen(3000, () => console.log('🆗 Server is running at http://locahost:3000'))