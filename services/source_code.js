var exec = require('child_process').exec;
var Project = require('../models/project');
var Q = require('q');
/**
 * 复制项目代码到本地
 * @param  {Object} project 项目信息
 * @return {Promise}         承诺
 */
function clone(project) {
    var dfd = Q.defer();
    exec("git tf clone " + project.host + "/" + project.collectionName + " " + project.path + " source_code/" + project.dir, function(err, stdout, stderr) {

        console.log(stderr);
        dfd.resolve(err, stdout, stderr);
    });
    return dfd.promise;
}
/**
 * 拉取最新代码到本地
 * @param  {String} dir 文件夹名称
 * @return {Promise}     承诺
 */
function pull(dir) {
    var dfd = Q.defer();
    exec("git --git-dir=source_code/" + dir + "/.git tf pull", function(err, stdout, stderr) {

        console.log(stderr);
        dfd.resolve(err, stdout, stderr);
    });
    return dfd.promise;
}
module.exports = {
    clone: clone,
    pull: pull
};