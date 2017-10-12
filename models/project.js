var mongoose=require('../db').mongoose;
var schema=new mongoose.Schema( {
			//项目名称
            projName: String,
            //下载到本地的文件夹名称
            dir:String,
            //版本控制方式 TFS GIT
            versionControl:String,
            //创建时间
            createdTime:Date,
            //TFS主机
            host:String,
           	//集合名称
            collectionName:String,
            //源代码地址
            path:String,
            //状态
            state:String
        });
var Resutl=mongoose.model('project',schema);
module.exports=Resutl;