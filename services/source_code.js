var exec = require('child_process').exec;
var Project = require('../models/project');
var Q = require('q');

function clone(proj_id) {
   return Project.findById(proj_id).then(function(project) {
        var dfd = Q.defer();
        exec("git tf clone ", function(err, stdout, stderr) {

            console.log(stderr);
            dfd.resolve(err, stdout, stderr);
        });
        return dfd.promise;
    });
}

function pull(dir) {
    var dfd = Q.defer();
    exec("git --git-dir=source_code/" + dir + "/.git tf pull", function(err, stdout, stderr) {

        console.log(stderr);
        dfd.resolve(err, stdout, stderr);
    });
    return dfd.promise;
}
// exec(cmdStr, function(err,stdout,stderr){
//     if(err) {
//         console.log('get weather api error:'+stderr);
//     } else {

//         这个stdout的内容就是上面我curl出来的这个东西：
//         {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}

//         var data = JSON.parse(stdout);
//         console.log(data);
//     }
// });
module.exports = {
    clone: clone,
    pull: pull
};