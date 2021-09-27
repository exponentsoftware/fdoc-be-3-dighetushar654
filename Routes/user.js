const router = require('express').Router();
const userController = require("../Controllers/user_controllers");

router.post('/', userController.create_user);

module.exports = router;
