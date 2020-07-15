const express = require('express');
const router = express.Router();

const userService = require('../services/user.service');

router.post('/signup', (req, res, next) => {
  userService.postUser(req, res, next);
});

router.post('/login', (req, res, next) => {
  userService.authenticateUser(req, res, next);
});

router.delete('/:userId', (req, res, next) => {
  userService.deleteUser(req, res, next);
});


module.exports = router;
