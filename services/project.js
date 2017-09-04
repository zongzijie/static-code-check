var Project=require('../models/project');

function list(){
	return Project.where({}).exec();
};
function save(data){
	return Project.create(data);
};
module.exports={
	list:list,
	save:save
};
