const express = require('express');
const homepageController = require('../controllers/homepage');

const router = express.Router();

router.get('/', homepageController.getLandingPage);

module.exports = router;
