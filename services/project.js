var Project=require('../models/project');
/**
 * 项目列表
 * @return {[type]} [description]
 */
function list(){
	return Project.find({});
}
/**
 * 保存项目
 * @param  {Object} data projectInfo
 * @return {Promise}      承诺
 */
function save(data){
	return Project.create(data);
}
/**
 * 获取某个项目
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function one(id){
	return Project.findById(id);
}
module.exports={
	list:list,
	one:one,
	save:save
};
