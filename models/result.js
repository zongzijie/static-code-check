var mongoose=require('../db').mongoose;
var schema=new mongoose.Schema( {
			report_id:String,
            filePath: String,
            messages: [],
            errorCount: Number,
            warningCount: Number,
            fixableErrorCount: Number,
            fixableWarningCount: Number,
            output: String
        });
var Resutl=mongoose.model('result',schema);
module.exports=Resutl;