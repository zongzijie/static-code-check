var express = require('express');
var check = require('../services/check');
var config = require('../services/config');
var moment = require('moment');
var _ = require('underscore');
var Promise = require("bluebird");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    config.proj_list().then(function(projList) {
        var ajaxArry = [];
         projlist = _.pluck(projList, '_doc');
        _.each(projlist, function(proj) {
            ajaxArry.push(check.reports(proj.dir));
        });
        return Promise.all(ajaxArry);
    }).then(function(reports){
         reports = _.pluck(reports[0], '_doc');
    	res.render('index',{reports:reports});
    });
});
/* GET error results. */
router.get('/:dir/:report_id/errors', function(req, res, next) {
    check.errors(req.params.report_id).then(function(results) {
        // res.send(results);
        res.render('error-list', { title: req.params.dir + '-error-list', results: results });
    });
});

module.exports = router;