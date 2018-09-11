/********************** validate验证JS 李飞  2015年7月11日14:29:27 **********************/
/** 定义全局jsonValidate变量 ***** */
var jsonValidate = null;
/**
 * 初始化表单验证
 */
function initValidate(){
	//加载验证
	var $hideplaceholder=function(element){
		if($(element).data("pintuerholder")){
			$(element).val("");
			$(element).css("color", $(element).data("pintuerholder"));		
			$(element).removeData("pintuerholder");
		}
	};
	//调用自定义加载验证
	blurValidate();
	$pintuercheck=function(element,type,value){
		$pintu=value.replace(/(^\s*)|(\s*$)/g, "");
		switch(type){
			case "required":return /[^(^\s*)|(\s*$)]/.test($pintu);break;
			case "chinese":return /^[\u0391-\uFFE5]+$/.test($pintu);break;
			case "number":return /^\d+$/.test($pintu);break;
			case "integer":return /^[-\+]?\d+$/.test($pintu);break;
			case "plusinteger":return /^[+]?\d+$/.test($pintu);break;
			case "double":return /^[-\+]?\d+(\.\d+)?$/.test($pintu);break;
			case "plusdouble":return /^[+]?\d+(\.\d+)?$/.test($pintu);break;
			case "english":return /^[A-Za-z]+$/.test($pintu);break;
			case "password":return /^([a-z0-9\w\!\#\$\%\^\&\*\.\~]|[a-zA-Z0-9\w\!\#\$\%\^\&\*\.\~]){5,16}$/.test($pintu);break;
			case "username":return /^[a-z]\w{5,}$/i.test($pintu);break;
			case "mobile":return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[0-9]\d{8}?$|17[0-9]\d{8}?$|18[0-9]\d{8}?$|147\d{8}?$/.test($pintu);break;
			case "phone":return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);break;
			case "tel":return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[89]\d{8}?$|170\d{8}?$|18[0-9]\d{8}?$|147\d{8}?$/.test($pintu) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);break;
			case "email":return /^[^@]+@[^@]+\.[^@]+$/.test($pintu);break;
			case "url":return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test($pintu);break;
			case "ip":return /^[\d\.]{7,15}$/.test($pintu);break;
			case "qq":return /^[1-9]\d{4,10}$/.test($pintu);break;
			case "currency":return /^\d+(\.\d+)?$/.test($pintu);break;
			case "zip":return /^[1-9]\d{5}$/.test($pintu);break;
			/**自定义验证  excel的后缀***/
			case "xlsx":return /^.*?\.(xlsx|xls)$/.test($pintu);break;
			/**自定义验证  img的后缀***/
			case "img":return /^.*?\.(bmp|jpeg|jpg|gif|png)$/.test($pintu);break;
			/**自定义验证  压缩文件的后缀***/
			case "yaSuo":return /^.*?\.(rar|zip|7z|gz|bz|ace|uha|uda|zpaq)$/.test($pintu);break;
			/**自定义验证  邮箱或 手机***/
			case "mobile_or_email":return (/^[^@]+@[^@]+\.[^@]+$/.test($pintu))||(/^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[89]\d{8}?$|170\d{8}?$|147\d{8}?$/.test($pintu)||/^[a-z]\w{2,}$/i.test($pintu));break;
			case "radio":
				var radio=element.closest('form').find('input[name="'+element.attr("name")+'"]:checked').length;
				return eval(radio==1);
				break;
			default:
				var $test=type.split('#');
				if($test.length>1){
					switch($test[0]){
						case "compare":
							return eval(Number($pintu)+$test[1]);
							break;
						case "regexp":
							return new RegExp($test[1],"gi").test($pintu);
							break;
						case "length":
							var $length;
							if(element.attr("type")=="checkbox"){
								$length=element.closest('form').find('input[name="'+element.attr("name")+'"]:checked').length;
							}else{
								$length=$pintu.replace(/[\u4e00-\u9fa5]/g,"***").length;
							}
							return eval($length+$test[1]);
							break;
						case "ajax":
							var $getdata;
							var $url=encodeURI(encodeURI($test[1]+$pintu));
							$.ajaxSetup({async:false});
							$.getJSON($url,function(data){
								$getdata=data;
							});
							if($getdata==true){return true;}
							break;
						case "repeat":
							return $pintu==jQuery('input[name="'+$test[1]+'"]').eq(0).val();
							break;
						case "compareNum":
							return Number($pintu)>=Number(jQuery('#'+$test[1]).val());
							break;
						default:return true;break;
					}
					break;
				}else{
					return true;
				}
		}
	};
	$('form').submit(function(){
		//当前表单是否需要验证
		if("y"==$(this).attr("isValidate")){
			$(this).find('input[data-validate],textarea[data-validate],select[data-validate]').trigger("blur");
			$(this).find('input[placeholder],textarea[placeholder]').each(function(){$hideplaceholder($(this));});
			var numError = $(this).find('.has-error').length;
			if(numError){
				$(this).find('.has-error').first().find('input[data-validate],textarea[data-validate],select[data-validate]').first().focus().select();
				return false;
			}else{
				//回调自定义保存方法
				doCallback(eval(jsonValidate.methodName),[jsonValidate]);
			}
		}
	});
}


function validateElement(type,value){
	var $pintu=value.replace(/(^\s*)|(\s*$)/g, "");
	switch(type){
		/**判断是否非空**/
		case "required":return /[^(^\s*)|(\s*$)]/.test($pintu);break;
		/**判断中文**/
		case "chinese":return /^[\u0391-\uFFE5]+$/.test($pintu);break;
		/**判断数量**/
		case "number":return /^\d+$/.test($pintu);break;
		/**判断整数**/
		case "integer":return /^[-\+]?\d+$/.test($pintu);break;
		
		case "plusinteger":return /^[+]?\d+$/.test($pintu);break;
		/**判断小数**/
		case "double":return /^[-\+]?\d+(\.\d+)?$/.test($pintu);break;
		
		case "plusdouble":return /^[+]?\d+(\.\d+)?$/.test($pintu);break;
		/**判断英文**/
		case "english":return /^[A-Za-z]+$/.test($pintu);break;
		/**判断密码**/
		case "password":return /^([a-z0-9\w\!\#\$\%\^\&\*\.\~]|[a-zA-Z0-9\w\!\#\$\%\^\&\*\.\~]){5,16}$/.test($pintu);break;
		/**判断用户名**/
		case "username":return /^[a-z]\w{5,}$/i.test($pintu);break;
		/**判断电话**/
		case "mobile":return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[0-9]\d{8}?$|17[0-9]\d{8}?$|18[0-9]\d{8}?$|147\d{8}?$/.test($pintu);break;
		/**判断手机号**/
		case "phone":return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);break;
		/**判断小数**/
		case "tel":return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[89]\d{8}?$|170\d{8}?$|18[0-9]\d{8}?$|147\d{8}?$/.test($pintu) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);break;
		/**判断邮箱**/
		case "email":return /^[^@]+@[^@]+\.[^@]+$/.test($pintu);break;
		/**判断路径**/
		case "url":return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test($pintu);break;
		/**判断ip地址**/
		case "ip":return /^[\d\.]{7,15}$/.test($pintu);break;
		/**判断qq号**/
		case "qq":return /^[1-9]\d{4,10}$/.test($pintu);break;
		/**判断货币**/
		case "currency":return /^\d+(\.\d+)?$/.test($pintu);break;
		/**判断邮政编码**/
		case "zip":return /^[1-9]\d{5}$/.test($pintu);break;
		/**自定义验证  excel的后缀***/
		case "xlsx":return /^.*?\.(xlsx|xls)$/.test($pintu);break;
		/**自定义验证  img的后缀***/
		case "img":return /^.*?\.(bmp|jpeg|jpg|gif|png)$/.test($pintu);break;
		/**自定义验证  压缩文件的后缀***/
		case "yaSuo":return /^.*?\.(rar|zip|7z|gz|bz|ace|uha|uda|zpaq)$/.test($pintu);break;
		/**自定义验证  邮箱或 手机***/
		case "mobile_or_email":return (/^[^@]+@[^@]+\.[^@]+$/.test($pintu))||(/^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[89]\d{8}?$|170\d{8}?$|147\d{8}?$/.test($pintu)||/^[a-z]\w{2,}$/i.test($pintu));break;
	}
	
}
/**
 * 判断给入参数是否为undefined和null  是返回true  不是返回  false
 * @param obj
 * @return boolean
 */
function isUndefinedAndEmpty(obj){
	obj = $.trim(obj);
	if(undefined==obj || "undefined"==obj || "" ==obj || null == obj){
		return true ;
	}
	return false ;
}
/**
 * 判断是否有数字和字母
 * @param {Object} str
 */
 function numberAndEnglish(str){
	  var reg=new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
	  if(reg.test(str)){
	    return true;
	  }else{
	   return false;
	  }
 }
/**
 * 自定义验证，在需要地方加入即可
 * @param validateID 显示inputID
 * @param validateShowID file文件ID 没有进给入空
 * @param validateInfo 验证信息区
 * @param jsonObj 回调参数
 */
function myBlurValidate(validateID,validateShowID,validateInfo,jsonObj){
	if(!isUndefinedAndEmpty(validateShowID)){
		$('#'+validateID).attr('value',$("#"+validateShowID).val());
	}
	blurValidate();
	$("#"+validateID).blur( function (event,jsonObjEvent) { 
		var numError = validateErrorLength($("#"+validateInfo));
		if(!numError){
			if(!isUndefinedAndEmpty(jsonObjEvent)){
				doCallback(eval(jsonObjEvent.methodName),[jsonObjEvent]);
			}
		}
	}).trigger("blur", [jsonObj]).unbind("blur");
}


/**
 * 得到验证错误信息长度
 * @param this_
 * @return num数字
 */
function validateErrorLength(this_){
	return this_.find('.has-error').length;
}

/**
 * 为需要验证的表单绑验证事件
 */
function blurValidate(){
	$('textarea, input, select, password').blur(function(){
		var e=$(this);
		if(e.attr("data-validate")){
			e.closest('.field').find(".input-help").remove();
			var $checkdata=e.attr("data-validate").split(',');
			var $checkvalue=e.val();
			var $checkstate=true;
			var $checktext="";
			if(e.attr("placeholder")==$checkvalue){$checkvalue="";}
			if($checkvalue!="" || e.attr("data-validate").indexOf("required")>=0){
				for(var i=0;i<$checkdata.length;i++){
					var $checktype=$checkdata[i].split(':');
					if(! $pintuercheck(e,$checktype[0],$checkvalue)){
						$checkstate=false;
						if(isUndefinedAndEmpty($checktext)){
							$checktext=$checktype[1];
							break;
						}
					}
				}
			};
			if($checkstate){
				e.closest('.form-validate').removeClass("has-error");
				e.parent().find(".input-help").remove();
				e.closest('.form-validate').addClass("has-success");
			}else{
				e.closest('.form-validate').removeClass("has-success");
				e.closest('.form-validate').addClass("has-error");
				//使用mui  进行弹出提示信息
				mui.toast($checktext);
			}
		}
		return ;
	});
}


