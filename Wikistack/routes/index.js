var express = require('express');
var router = express.Router();

const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.use('/wiki', wikiRouter);

module.exports = router