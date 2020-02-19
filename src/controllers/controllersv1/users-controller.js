const createUser = (request, response) => {
  console.log("request.body", request.body);
  response.send({ status: "OK", message: "user created" });
};
const updateUser = (request, response) => {
  response.send({ status: "OK", message: "user update" });
};
const deleteUser = (request, response) => {
  console.log("req-body", request.body);
  response.send({ status: "OK", message: "user deleted" });
};

const getUsers = (request, response) => {
  response.send({ status: "OK", data: [] });
};


module.exports = {createUser, deleteUser, getUsers, updateUser};
