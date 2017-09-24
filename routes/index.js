var express = require('express');
var check = require('../services/check');
var project = require('../services/project');
var _ = require('underscore');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
    //获取项目列表
    project.list().then(function(projList) {
        console.log(projList);
        var ajaxArry = [];
        _.each(projList, function(proj) {
            //获取项目检查报告
            ajaxArry.push(check.reports(proj.dir).then(function(report) {
                //如果没有报告，则直接返回项目
                if (!report) {
                    return proj;
                }
                //如果存在报告，则覆盖报告上的项目名称，以项目为准
                //因为有可能生成报告之后修改项目名称
                report.projName=proj.projName;
                return report;
            }));
        });
        return Promise.all(ajaxArry);
    }).then(function(reports) {
        res.render('index', { title: 'ERP静态代码检查', reports: reports });
    });
});
/* GET index-row html. */
router.get('/row/:dir', function(req, res, next) {
    //查询某一个项目的检查报告
    project.one4dir(req.params.dir).then(function(project) {
        if(!project){
            res.send(404);
            return;
        }
        check.reports(project.dir).then(function(report) {
            //如果没有报告，则直接返回项目
            if (!report) {
                report= project;
            }
            res.render('index-row', { report: report });
        });
    });
});

module.exports = router;