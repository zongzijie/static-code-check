var mongoose = require('../db').mongoose;
var schema = new mongoose.Schema({
    ruleId: String,  //规则ID
    severity: String,//严重性
    description:String//规则描述
});
var Resutl = mongoose.model('rule', schema);
module.exports = Resutl;