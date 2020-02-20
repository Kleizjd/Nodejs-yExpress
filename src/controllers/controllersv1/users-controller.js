const bcrypt = require('bcrypt');
const Users = require('../../mongo/models/users');

const login = async (req, resp) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (user) {
      const isOK = await bcrypt.compare(password, user.password);
      if(isOK){
        resp.send({ status: 'OK', data: {} });

      } else {
        resp.status(403).send({ status: 'USER OR PASSWORD INVALID', message: '' });
      }
    } else {
      resp.status(401).send({ status: 'USER NOT FOUND', message: '' });
    }
  } catch (error) {
    resp.status(500).send({ status: 'Error', message: error.message });
  }
};
const createUser = async (request, response) => {
  try {
    const { username, email, password, data } = request.body;
    const hash = await bcrypt.hash(password, 15);

    const user = await Users.create({
      username, // username: username
      email,
      password,
      data,
      password: hash
    });
    // const user = new Users();

    // user.username = username;
    // user.email = email;
    // user.password = password;

    // await user.save();
    response.send({ status: 'OK', message: 'user created' });
  } catch (error) {
    if (error.code && error.code === 1100) {
      response
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
      return;
    }
    response.status(500).send({ status: 'Error', message: error.message });
  }
};

const updateUser = async (request, response) => {
  try {
    const { username, email, password, data, userId } = request.body;
    await Users.findByIdAndUpdate(userId, {
      username,
      email,
      data
    });
    response.send({ status: 'OK', message: 'user update' });
  } catch (error) {
    if (error.code && error.code === 1100) {
      response
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
      return;
    }
    response
      .status(500)
      .send({ status: 'Error', message: "It couldn't be update" });
  }
};
const deleteUser = (request, response) => {
  console.log('req-body', request.body);
  response.send({ status: 'OK', message: 'user deleted' });
};

const getUsers = (request, response) => {
  response.send({ status: 'OK', data: [] });
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  login,
};
