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
  {
    endpoint: '/users/:id',
    method: 'PUT',
    handler: UserController.edit,
  },
  {
    endpoint: '/users/:id',
    method: 'DELETE',
    handler: UserController.delete,
  },
]