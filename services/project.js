var Project=require('../models/project');

function list(){
	return Project.where({}).exec();
}
function save(data){
	return Project.create(data);
}
function one(id){
	return Project.findById(id);
}
module.exports={
	list:list,
	one:one,
	save:save
};
