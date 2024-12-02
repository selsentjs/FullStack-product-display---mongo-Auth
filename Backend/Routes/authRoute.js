const express = require('express');

const router = express.Router();
const {
    Register,
    Login,
    Logout
} = require('../controllers/authController')

router.post('/register', Register )
router.post('/login', Login )
router.get('/logout', Logout )

module.exports = router;