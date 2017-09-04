var CLIEngine = require('eslint').CLIEngine;
var Result = require('../models/result');
var Report = require('../models/report');
/**
 * 开始检查
 * @param  {Object} option 选项
 * @param  {String} option.dir 文件夹名称
 * @param  {String} option.projName 项目名称
 * @return {Promise}     [description]
 */
function start(option) {
    var cli = new CLIEngine({
        useEslintrc: false,
        rules: {
            semi: 2,
            curly:2
        }
    })
    var report = cli.executeOnFiles(['source_code/'+option.dir]);
    var report_id;
    return Report.create({
        projName:option.name,
        dir:option.dir,
        createdTime:new Date(),
        errorCount: report.errorCount,
        warningCount: report.warningCount,
        fixableErrorCount: report.fixableErrorCount,
        fixableWarningCount: report.fixableWarningCount
    }).then(function(reportData) {
        report_id = reportData._id;
        for (var i = report.results.length - 1; i >= 0; i--) {
            report.results[i].report_id = report_id;
        }
        return Result.create(report.results);
    }).then(function() {
        return report_id;
    });
}
/**
 * 查询最新报告
 * @return {String} 文件夹名称
 */
function reports(dir){
   return Report.where('dir',dir).sort({'_id':-1}).limit(1).exec();
}
/**
 * 根据报告ID查询错误
 * @param  {String} report_id 报告Id
 * @return {Array}           结果数组
 */
function errors(report_id){
   return Result.where('report_id',report_id).where('errorCount').gte(0).exec();
}
module.exports = {
    start: start,
    reports:reports,
    errors:errors,
};