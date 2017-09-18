var express = require('express');
var router = express.Router();
var check = require('../services/check');
/*
	检查
 */
router.post('/', function(req, res, next) {
    check.start(req.body).then(function(id) {
        //req.redirect('/report?id='+id);
        res.send(id);
    });
});
module.exports = router;