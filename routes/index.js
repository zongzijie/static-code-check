var express = require('express');
var check = require('../services/check');
var project = require('../services/project');
var moment = require('moment');
var _ = require('underscore');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
    project.list().then(function(projList) {
        var ajaxArry = [];
         projlist = _.pluck(projList, '_doc');
        _.each(projlist, function(proj) {
            ajaxArry.push(check.reports(proj.dir).then(function(data){
                  if(data.length==0){
                    return proj;
                  }
                  return data[0]._doc;
            }));
        });
        return Promise.all(ajaxArry);
    }).then(function(reports){
    	res.render('index',{title:'ERP静态代码检查',reports:reports});
    });
});
/* GET index-row html. */
router.get('/row/:dir', function(req, res, next) {
   check.reports(req.params.dir).then(function(report){
      res.render('index-row',{report:report[0]._doc});
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