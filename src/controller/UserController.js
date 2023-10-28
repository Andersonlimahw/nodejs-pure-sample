let users = require('../mocks/users');

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
  },

  edit(request, response) {
    let { id } = request.params;
    const { name } = request.body;
    id = Number(id);

    const userById = users.find((user) => user.id === id);
    if(!userById) {
      response.send(404, { error: `User with id: ${id} not found!`});    
    }
  
    const mappedUsers = users.map((user) => {
      if(user.id === id) {
        return { 
          ...user,
          name
        }
      }
      return user;
    })

    users = mappedUsers;

    response.send(200, {
      userById, 
      users
    });  
  }, 

  delete(request, response) {
    let { id } = request.params;   
    id = Number(id);

    const userById = users.find((user) => user.id === id);
    if(!userById) {
      response.send(404, { error: `User with id: ${id} not found!`});    
    }
  
    const filredUsers = users.filter((user) => user.id !== id);
    users = filredUsers;

    response.send(200, {
      delete: true, 
      users
    });  
  }, 
}