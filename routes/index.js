var express = require('express');
var check = require('../services/check');
var project = require('../services/project');
var _ = require('underscore');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
    project.list().then(function(projList) {
        console.log(projList);
        var ajaxArry = [];
        _.each(projList, function(proj) {
            ajaxArry.push(check.reports(proj.dir));
        });
        return Promise.all(ajaxArry);
    }).then(function(reports){
    	res.render('index',{title:'ERP静态代码检查',reports:reports});
    });
});
/* GET index-row html. */
router.get('/row/:dir', function(req, res, next) {
   check.reports(req.params.dir).then(function(report){
      res.render('index-row',{report:report});
    });
});

module.exports = router;