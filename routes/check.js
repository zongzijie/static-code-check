var express = require('express');
var router = express.Router();
var check = require('../services/check');

router.get('/', function(req, res, next) {
       res.send(200);
});
router.post('/:dir', function(req, res, next) {
    check.start(req.params.dir).then(function(id) {
        //req.redirect('/report?id='+id);
        res.send(id);
    });
});
module.exports = router;