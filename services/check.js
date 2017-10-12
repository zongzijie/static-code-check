var CLIEngine = require('eslint').CLIEngine;
var Result = require('../models/result');
var Report = require('../models/report');
var Eslintrc = require('../.eslintrc.js');
var project = require('../services/project');
var moment = require('moment');
var rule_name = require('../rules-name.js');
var _ = require('underscore');
var source_code = require('../services/source_code');
/**
 * 开始检查
 * @param  {Object} option 选项
 * @param  {String} option.dir 文件夹名称
 * @param  {String} option.projName 项目名称
 * @return {Promise}     [description]
 */
function start(option) {
    //获取单个项目
    return project.one4dir(option.dir).then(function(project) {
        //根据项目信息，下载最新代码
        return source_code.pull(option.dir, project.versionControl).then(function() {

            var cli = new CLIEngine(Eslintrc);
            //对指定文件夹进行代码扫描
            var report = cli.executeOnFiles(['source_code/' + option.dir]);
            var report_id;
            //查询上一次检查结果，对比并记录差异
            return reports(option.dir).then(function(oldReport) {
                //创建报告对象
                return Report.create({
                    projName: option.name,
                    dir: option.dir,
                    createdTime: new Date(),
                    errorCount: report.errorCount,
                    errorDiff: oldReport ? report.errorCount - oldReport.errorCount : 0,
                    warningCount: report.warningCount,
                    warningDiff: oldReport ? report.warningCount - oldReport.warningCount : 0,
                    fixableErrorCount: report.fixableErrorCount,
                    fixableWarningCount: report.fixableWarningCount
                });
            }).then(function(reportData) {
                report_id = reportData._id;

                //用来缓存因超过100条message限制切割出来的新result
                var results = [];
                console.log('start');
                //为结果明细设置外键和规则的中文说明
                _.each(report.results, function(result, k, list) {
                    result.report_id = report_id;
                    result.dir = option.dir;
                    // //定义message的极限值
                    // var max = 50;
                    // //由于单条document有16M的限制
                    // //故对于大于100条的message需要拆分到多个document存储
                    // if (result.messages.length > max) {
                    //     var count = Math.ceil(result.messages.length / max);
                    //     var range = _.range(count);
                    //     _.each(range, function(v) {
                    //         //分段存储的文档于原文档中基本信息一致
                    //         //故先拷贝再清空需要分段的属性
                    //         var result_tmp = _.clone(result);
                    //         result_tmp.message = [];
                    //         //利用事先计算好的分段次序计算出分段的起止位置
                    //         //循环处理规则中文后插入新建立的数组中
                    //         for (var i = v * max; i < v * max + max; i++) {
                    //             if(i==result.messages.length){
                    //                 return false;
                    //             }
                    //             var message = result.messages[i];
                    //             message.ruleName = rule_name[message.ruleId];
                    //             result_tmp.message.push(message);
                    //         }
                    //         //最后把新建立的文档插入缓存中，等待最后写入数据库
                    //         results.push(result_tmp);
                    //     });
                    //     return true;
                    // }
                    //没有超过最大限制则直接维护规则中文即可
                    //然后插入缓存等待写入数据库
                    // if (result.messages.length < max) {
                    //     console.log(k);

                    // }
                    _.each(result.messages, function(message) {
                        message.ruleName = rule_name[message.ruleId];
                        delete message.source;
                    });
                    //results.push(result);
                });

                console.log("end");
                //批量创建报告结果明细
                return Result.create(report.results, function(err) {
                    console.log(err);
                });
            }).then(function() {
                return report_id;
            });

        });
    });

}
/**
 * 查询最新报告
 * @return {String} 文件夹名称
 */
function reports(dir) {
    return Report.where('dir', dir).sort({ '_id': -1 }).limit(1).findOne();
}
/**
 * 根据报告ID查询错误
 * @param  {String} report_id 报告Id
 * @return {Array}           结果数组
 */
function errors(report_id) {
    return Result.where('report_id', report_id).where('errorCount').gte(0).exec();
}
/**
 * 根据报告ID查询错误(最近十天)
 * @param  {String} report_id 报告Id
 * @return {Array}           结果数组
 */
function history(dir) {
    var today = moment().subtract(10, 'days').format('YYYY-MM-DD');
    return Report.where('dir', dir).where('createdTime').gte(today).sort({ '_id': 1 }).limit(10).exec();
}
/**
 * 删除项目对应的报告和明细
 * @param  {String} report_id 报告Id
 * @return {Array}           结果数组
 */
function remove(dir) {
    return Report.remove({ dir: dir }).then(function() {
        return Result.remove({ dir: dir });
    }).then(function() {
        return source_code.remove(dir);
    });
}
module.exports = {
    start: start,
    history: history,
    reports: reports,
    errors: errors
};