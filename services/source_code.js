var exec = require('child_process').exec;
var Project = require('../models/project');
var path = require('path');
var Q = require('q');
/**
 * 复制项目代码到本地
 * @param  {Object} project 项目信息
 * @return {Promise}         承诺
 */
function clone(project) {
    var dfd = Q.defer();
    if (project.versionControl == 'TFS') {
        exec("git tf clone " + project.host + "/" + project.collectionName + " " + project.path + " "+path.join(__dirname, '../source_code/') + project._id, function(err, stdout, stderr) {
            console.log(err);
            dfd.resolve(err, stdout, stderr);
        });
    }
    if (project.versionControl == 'GIT') {
        exec("git clone " + project.path + " "+path.join(__dirname, '../source_code/') + project._id, function(err, stdout, stderr) {
            console.log(err);
            dfd.resolve(err, stdout, stderr);
        });
    }
    return dfd.promise;
}
/**
 * 拉取最新代码到本地
 * @param  {String} dir 文件夹名称
 * @param  {String} versionControl 版本控制方式 TFS GIT
 * @return {Promise}     承诺
 */
function pull(dir, versionControl) {
    var dfd = Q.defer();
    if (versionControl == 'TFS') {
        exec("git --git-dir="+path.join(__dirname, '../source_code/') + dir + "/.git tf pull", function(err, stdout, stderr) {
            console.log("err:"+err);
            console.log("stdout:"+stdout);
            console.log("stderr:"+stderr);
            console.log("pull end");
            dfd.resolve(err, stdout, stderr);
        });
    }
    if (versionControl == 'GIT') {
        exec("git --git-dir="+path.join(__dirname, '../source_code/') + dir + "/.git pull", function(err, stdout, stderr) {
            console.log(err);
            dfd.resolve(err, stdout, stderr);
        });
    }
    return dfd.promise;
}
/**
 * 删除文件夹以及文件
 * @param  {String} dir 文件夹名称
 * @return {Promise}     承诺
 */
function remove(dir) {
    var dfd = Q.defer();
    exec("rm -rf "+path.join(__dirname, '../source_code/') + dir , function(err, stdout, stderr) {
        console.log(err);
        dfd.resolve(err, stdout, stderr);
    });
    return dfd.promise;
}
module.exports = {
    clone: clone,
    remove: remove,
    pull: pull
};