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

    response.send(200, sortedUsers);
  },

  getById(request, response) {
    const { id } = request.params;
    const user = users.find(x => Number(x.id) === Number(id));
    
    if(!user) {    
      response.send(404, {
        message: "user not found"
      });
    }
    response.send(200, user);   
  },

  create(request, response) {
    const { body } = request;
    const lastUserId = users[users.length -1]?.id;
    const newUser = {
      id: lastUserId + 1,
      name: body.name
    }
    users.push(newUser);
    response.send(200, newUser);  
  }
}