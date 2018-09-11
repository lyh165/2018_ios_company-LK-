/***********************json操作工具JS****************************/

/**
 * 将目标json对象复制到主json对象中 jsonTarget---》jsonObj
 * 
 * @param jsonTarget
 *            目标对象
 * @param jsonObj
 *            主对象
 * @return JSON
 */
function copyJson(jsonTarget, jsonObj) {
	if(null==jsonObj){
		return jsonTarget;
	}
	// 目标json对象
	var jsonList = jsonTarget;// 转换为json对象
	for ( var key in jsonList[0]) {
		jsonObj = editJson(jsonObj, key, jsonList[0][key]);
	}
	return jsonObj;
}

/**
 * 操作json工具函数 传入(key, val)为修改或添加 传入(prop)为删除 参数：key = 键，val = 值
 * 
 * @param jsonObj
 * @param key
 * @param val
 * 
 */
function editJson(jsonObj, key, val) {
	// 如果 val 被忽略
	if (typeof val === "undefined") {
		// 删除属性
		delete jsonObj[prop];
	} else {
		// 添加 或 修改
		jsonObj[key] = val;
	}
	return jsonObj;
}

/**
 * 将一个字符串转化为一个json对象 传入一个json格式数据
 * 
 * @param jsonStr
 * @return JSON
 */
function strToJson(jsonStr) {
	if(isUndefinedAndEmpty(jsonStr)){
		return jsonStr;
	}
	if(jsonStr.indexOf('{') != -1||jsonStr.indexOf('[') != -1){
		return eval('(' + jsonStr + ')');
	}else{
		return jsonStr;
	}
}
/**
 * 将一个json对象数据转化为一个字符串数据 传一个json对象
 * 
 * @param jsonObj
 * @return Str
 */
function jsonToStr(jsonObj) {
	return JSON.stringify(jsonObj);
}
/**
 * 将一个map字符串转化成一个json对象
 * @param mapStr
 * @return JSON
 */
function mapStrToJson(mapStr){
	var strJson = "\""+mapStr+"\"";
	return strToJson(strToJson(strJson));
}

/**
 * 得到json指定key的值  如果得到数据会返回需要数据  如果没有查询到数据  就返回{}
 * @param jsonObj
 * @param key
 */
function getKeyJSON(jsonObj,key){
	if(isUndefinedAndEmpty(jsonObj[key])){
		return {};
	}else{
		return jsonObj[key];
	}
}
