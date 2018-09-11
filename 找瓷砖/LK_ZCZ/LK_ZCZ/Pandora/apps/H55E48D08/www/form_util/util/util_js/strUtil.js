/************字符串操作  李飞  2015-7-23 21:08:52******************/

/**
 * 传入一个对象 返回本对象的字符串格式 如果是null/undefined 会放回""
 * @param obj
 * @return String
 */
function getStr(obj){
	obj = $.trim(obj);
	if(undefined==obj || "undefined"==obj || "null" ==obj || null == obj){
		return "" ;
	}
	return obj+"";
}

/**
 * 将一个字符转换成utf-8 模式请求到后台
 * @param str
 */
function  toUTF_8(str){
	return encodeURIComponent($.trim(str));
}

/**
 * 将一个字符转换成utf-8 模式请求到后台  使用encodeURI两次转码
 * @param str
 */
function  toEncodeURI(str){
	return encodeURI(encodeURI($.trim(str)));
}


/**
 * 传入一个字符串进行截取
 * @param str 需要截取的字符串
 * @param sign 截取标志位
 * @param leng 截取长度
 * @return 根据截取要求  截取字符串
 */
function subStrUtil(str,sign,leng){
	str = getStr(str);
	if(str.indexOf(sign)==-1){
		return str;
	}
	return str.substring(0,str.indexOf(sign)+leng);
}
/**
 * 将一个字符串转化成int
 * @param str 需要转换的字符串
 */
function strToInt(str){
	if(isNaN(str) || isUndefinedAndEmpty(str)){
		return 0;
	}
	return parseInt(str);
}
/**
 * 将一个字符串转化成float
 * @param str 需要转换的字符串
 */
function strToFloat(str){
	if(isNaN(str)){
		return 0;
	}
	return parseFloat(str);
}

/**
 * 截取小数点
 * @param num 需要截取的数字
 * @param length 需要截取的长度
 */
function strToFixed(num,length){
	if(isNaN(num)){
		return 0;
	}
	return num.toFixed(length);
}

 

/**
 * 得到某个日期之后的数据    yyyy-mm-dd
 * @param {Object} timeStr
 */
function data_cha(dayNum){
    var date1 = new Date();
    var date2 = new Date(date1);
    date2.setDate(date1.getDate()+dayNum);
    var month = strToInt(date2.getMonth()+1);
    var date = date2.getDate();
    if(getStr(month).length<2){
        month = "0"+month;
    }    
    if(getStr(date).length<2){
        date = "0"+date;
    }   
    var times = date2.getFullYear()+"-"+month+'-'+date;
    return times;
}
/**
 * 替换字符串
 * @param {Object} data
 * @param {Object} sign
 * @param {Object} replace
 */
function replaceStr(data,sign,replace){
	var strReplace=getStr(data).replace(sign, ''+replace+'');
	return strReplace;	
}
/**
 * 乘法函数
 * @param {Object} arg1
 * @param {Object} arg2
 */
function accMul(arg1,arg2){
	var m=0,s1=arg1.toString(),s2=arg2.toString();
	try{m+=s1.split(".")[1].length}catch(e){}
	try{m+=s2.split(".")[1].length}catch(e){}
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

/**
 * 加法函数
 * @param {Object} arg1
 * @param {Object} arg2
 */
function accAdd(arg1,arg2){
	var r1,r2,m;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2))
	return (arg1*m+arg2*m)/m
}