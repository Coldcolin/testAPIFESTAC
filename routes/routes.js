const express = require('express');

const router = express.Router();

const { signUp, logIn, getUsers } = require('../controllers/users');
const { admin } = require("../middleware/Authorization");

//endpoint to register a new user
router.post('/signup', signUp);

//endpoint to login a verified user
router.post('/login', logIn);

router.get("/users", admin, getUsers);



module.exports = router;