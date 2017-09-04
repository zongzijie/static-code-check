var Project=require('../models/project');

function proj_list(){
	return Project.where({}).exec();
};
function proj_save(data){
	return Project.create(data);
};
module.exports={
	proj_list:proj_list,
	proj_save:proj_save
};
