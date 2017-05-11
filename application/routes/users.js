var express = require('express');
var router = express.Router();
var logger = require('winston');

/* GET users listing. */
router.get('/', function(req, res, next) {
  logger.silly('This is an info log');
  logger.debug('This is an debug log');
  logger.verbose('This is an verbose log');
  logger.info('This is an info log');
  logger.warn('This is an warn log');
  logger.error('This is an error log');
  res.send('respond with a resource');
});

module.exports = router;
