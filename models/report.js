var mongoose = require('../db').mongoose;
var schema = new mongoose.Schema({
	projName:String,
	dir:String,
	createdTime:Date,
    errorCount: Number,
	errorDiff:Number,
    warningCount: Number,
    warningDiff: Number,
    fixableErrorCount: Number,
    fixableWarningCount: Number
});
var Report = mongoose.model('report', schema);
module.exports = Report;