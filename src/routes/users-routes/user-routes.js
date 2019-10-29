const express = require('express');
const userController = require('../../controllers/user-controller');

const router = express.Router();

router.get("/:id", userController.getById);
router.post("/", userController.postUser);

module.exports = router;