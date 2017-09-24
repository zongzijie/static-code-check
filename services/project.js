var Project=require('../models/project');
/**
 * 项目列表
 * @return {Promise}      承诺
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
	return Project.create(data).then(function(p){
		return p._id;
	});
}
/**
 * 获取某个项目
 * @param  {String} id 项目ID
 * @return {Promise}    承诺
 */
function one(id){
	return Project.findById(id);
}
/**
 * 更新某个项目
 * @param  {Object} data 需要更新的数据
 * @return {Promise}      承诺
 */
function update(data){
	return Project.update({dir:data.dir},data);
}
/**
 * 删除某个项目
 * @param  {String} dir 项目文件夹名称
 * @return {Promise}     承诺
 */
function remove(dir){
	return Project.remove({dir:dir});
}

/**
 * 获取某个项目(根据文件夹)
 * @param  {String} dir 项目文件夹名称
 * @return {Promise}     承诺
 */
function one4dir(dir){
	return Project.findOne({dir:dir});
}
module.exports={
	list:list,
	one:one,
	update:update,
	remove:remove,
	one4dir:one4dir,
	save:save
};
