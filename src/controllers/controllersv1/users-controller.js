const bcrypt = require('bcrypt');

const createUser = async (request, response) => {

  try {
    console.log('request.body', request.body);
    const hash = await bcrypt.hash(request.body.password, 15);
    console.log('fin', hash);

    response.send({ status: 'OK', message: 'user created' });
  } catch (error) {
    response.status(500).send({ status: 'Error', message: error.message });
  }
};
const updateUser = (request, response) => {
  response.send({ status: 'OK', message: 'user update' });
};
const deleteUser = (request, response) => {
  console.log('req-body', request.body);
  response.send({ status: 'OK', message: 'user deleted' });
};

const getUsers = (request, response) => {
  response.send({ status: 'OK', data: [] });
};

module.exports = { createUser, deleteUser, getUsers, updateUser };
