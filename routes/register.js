var express = require('express');
var project = require('../services/project');
var stateEnum = require('../models/enum/project_state_enum');
var source_code = require('../services/source_code');
var router = express.Router();
/* save register data. */
router.post('/save', function(req, res, next) {
    req.body.state = stateEnum.notInit;
    //创建日期
    req.body.createdTime = new Date();
    //保存项目
    project.save(req.body).then(function(id) {
        res.send(id);
    });
});
/* update project data. */
router.post('/update', function(req, res, next) {
    //更新项目
    project.update(req.body).then(function(id) {
        res.send(id);
    });
});
/* delete project data. */
router.post('/remove', function(req, res, next) {
    //删除项目
    project.remove(req.body.dir).then(function(id) {
        source_code.remove(req.body.dir).then(function() {
            res.send(id);
        });
    });
});
/* findOne project data. */
router.get('/project/:dir', function(req, res, next) {
    //项目
    project.one4dir(req.params.dir).then(function(project) {
        res.send(project);
    });
});
/* init project data. */
router.post('/init', function(req, res, next) {
    //获取单个项目
    project.one(req.body.id).then(function(project) {
        //根据项目信息，下载最新代码
        return source_code.clone(project).then(function() {
            project.state = stateEnum.inited;
            //下载代码的时候是使用项目id创建的文件夹，所以这里反填文件夹名称到项目上
            project.dir = project._id;
            //更新项目状态为已初始化
            project.save().then(function(id) {
                res.send(id);
            });
        });
    });
});
module.exports = router;