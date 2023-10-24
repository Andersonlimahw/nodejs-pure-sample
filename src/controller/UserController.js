const users = require('../mocks/users');
module.exports = {
  get(request, response) {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(users));
  }
}