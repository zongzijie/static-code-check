var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/:report_id', function(req, res, next) {
  res.send(req.query.id);
});

module.exports = router;
