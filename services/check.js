var CLIEngine = require('eslint').CLIEngine;
var Result = require('../models/result');
var Report = require('../models/report');
var Eslintrc = require('../.eslintrc.js');
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
    return source_code.pull(option.dir).then(function() {
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
                errorDiff: report.errorCount-oldReport.errorCount,
                warningCount: report.warningCount,
                warningDiff: report.warningCount-oldReport.warningCount,
                fixableErrorCount: report.fixableErrorCount,
                fixableWarningCount: report.fixableWarningCount
            });
        }).then(function(reportData) {
            report_id = reportData._id;
            //为结果明细设置外键和规则的中文说明
            _.each(report.results, function(result) {
                result.report_id = report_id;
                result.dir = option.dir;
                _.each(result.messages, function(message) {
                    message.ruleName = rule_name[message.ruleId];
                });
            });
            //批量创建报告结果明细
            return Result.create(report.results);
        }).then(function() {
            return report_id;
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
    });
}
module.exports = {
    start: start,
    history: history,
    reports: reports,
    errors: errors
};