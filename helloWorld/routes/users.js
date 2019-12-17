var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/', userController.userList);
router.get('/add', userController.addUser_get);
router.post('/add', userController.addUser_post);
router.get('/delete/:uid', userController.deleteUser);
router.get('/update/:uid', userController.updateUser);
router.get('/info/:uid', userController.userInfo);

module.exports = router;
