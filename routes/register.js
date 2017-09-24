var express = require('express');
var project = require('../services/project');
var stateEnum = require('../models/enum/project_state_enum');
var source_code = require('../services/source_code');
var router = express.Router();
/* save register data. */
router.post('/save', function(req, res, next) {
    req.body.state = stateEnum.notInit;
    //保存项目
    project.save(req.body).then(function(id) {
        res.send(id);
    });
});
/* init project data. */
router.post('/init', function(req, res, next) {
	//获取单个项目
    project.one(req.body.id).then(function(project) {
    	//根据项目信息，下载最新代码
        return source_code.clone(project).then(function() {
            project.state = stateEnum.inited;
            //更新项目状态为已初始化
            project.save().then(function(id) {
                res.send(id);
            });
        });
    });
});
module.exports = router;