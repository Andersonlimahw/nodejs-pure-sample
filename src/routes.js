const UserController = require("./controller/UserController");

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.get,
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: UserController.getById,
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: UserController.create,
  },
]