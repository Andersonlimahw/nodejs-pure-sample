const users = require('../mocks/users');

module.exports = {
  get(request, response) {
    const { order } = request.query;

    const sortedUsers  = users.sort((a, b) => {
      if(order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }
      return a.id > b.id ? 1 : -1;
    })
    
    response.writeHead(200, {
      'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(sortedUsers));
  },

  getById(request, response) {
    const { id } = request.params;
    const user = users.find(x => Number(x.id) === Number(id));
    
    if(user) {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify(user));
    } else {
      response.writeHead(404, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify({
        message: "user not found"
      }));
    }
   
  }
}