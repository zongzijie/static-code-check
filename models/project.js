var mongoose=require('../db').mongoose;
var schema=new mongoose.Schema( {
            projName: String,
            dir:String,
            sourceCode:String
        });
var Resutl=mongoose.model('project',schema);
module.exports=Resutl;