var express = require('express');
var CLIEngine = require('eslint').CLIEngine;
var Eslintrc = require('../.eslintrc.js');
var check = require('../services/check');
var router = express.Router();

/* GET error results. */
router.get('/:dir/:report_id/errors', function(req, res, next) {
    check.errors(req.params.report_id).then(function(results) {
        var cli = new CLIEngine(Eslintrc);
        var formater = cli.getFormatter('html');
        res.send(formater(results));
        //res.render('error-list', { title: req.params.dir + '-error-list', results: results });
    });
});
/* GET history pic. */
router.get('/:dir/history', function(req, res, next) {
    check.history(req.params.dir).then(function(reports) {
        res.render('history', { title: '最近检查结果' ,reports:reports});
    });
});
module.exports = router;