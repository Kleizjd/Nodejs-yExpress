const expess = require('express');

const usersController = require('../../controllers/controllersv1/users-controller');

const router = expess.Router();

router.post('/create', usersController.createUser);
router.post('/update', usersController.updateUser);
router.post('/delete', usersController.deleteUser);
router.post('/get-all', usersController.getUsers);

module.exports = router;