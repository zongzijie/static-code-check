var express = require('express');
var CLIEngine = require('eslint').CLIEngine;
var Eslintrc = require('../.eslintrc.js');
var check = require('../services/check');
var _ = require('underscore');
var router = express.Router();

/* GET error results. */
router.get('/:dir/:report_id/errors', function(req, res, next) {
    //查询错误列表
    check.errors(req.params.report_id).then(function(results) {
        var cli = new CLIEngine(Eslintrc);
        //格式化为HTML格式，并输出
        var formater = cli.getFormatter('html');
        res.send(formater(results));
        //res.render('error-list', { title: req.params.dir + '-error-list', results: results });
    });
});
/* GET history pic. */
router.get('/:dir/charts', function(req, res, next) {
    //查询历史检查记录
    check.history(req.params.dir).then(function(reports) {
        check.errors(_.last(reports)._id).then(function(errors) {
        	var messages=[];
        	_.each(errors,function(error){
        		messages=_.union(messages,error.messages);
        	});
        	var errorsMsgs=_.filter(messages,function(v){return v.severity==2});
        	var warningMsgs=_.filter(messages,function(v){return v.severity==1});
            //渲染
            res.render('charts', { title: reports[0].projName+'-最近检查结果', reports: reports,errors:errorsMsgs,warnings:warningMsgs });
        });
    });
});
module.exports = router;