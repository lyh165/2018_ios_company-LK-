/*********************ajax操作工具js*********************/
/**
 * 开启加载层
 * @return
 */
function loadingDiv() {
	
}

var nwaiting = null ; //加载层
var version_num = '1.1.1';//版本号
function getAjaxData(jsonAjax) {
	var jsonData = jsonAjax.jsonData;
	var url = path_url + jsonAjax.url;
	if(url.indexOf('?') != -1) {
		url += '&version_num=' + version_num
	} else {
		url += '?version_num=' + version_num
	}
	//加入手机型号
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/iPhone/i)=="iphone") {
		url += "&phoneSys=iphone";
	}else if(ua.match(/Android/i)=="android"){
		url += "&phoneSys=android";
	}
	var json = {"mapStr":jsonToStr(jsonData)};
	$.ajax( {
    	type : "post",
    	url : url,
    	cache : true,
    	async : true,
    	data : json,
    	dataType : "html",
    	success : function(data) {
    		//更新代码使用
    		var jsonInfo = strToJson(data);
    		if(data.indexOf('version_url')!=-1){//判断是否有版本更新
    			var version_url = strToJson(jsonInfo.data).version_url;
    			var btnArray = ['否', '是'];
				mui.confirm(jsonInfo.info, '确认', btnArray, function(e) {
					if(e.index == 1) {
						var ua = navigator.userAgent.toLowerCase();
						if(ua.match(/iPhone/i)=="iphone") {
							window.location = version_url;
						}else if(ua.match(/Android/i)=="android"){
							createDownload(version_url);
						}
					}
				})
    			return ;
    		}
    		if(!isUndefinedAndEmpty(jsonAjax.methodName)){ //如果有回调方法就进行回调
    			var jsonObj = editJson(jsonAjax, "data", data);
    			doCallback(eval(jsonAjax.methodName),[jsonObj]);
    		}
    	},
    	error:function(data){ 
    		//nwaiting.close();
    		mui.toast("加载失败,请重试!");
        }
    });
}



/**
 * 下载最新的安装包,并且自动弹出安装页面(不知道是不是适合苹果)
 * @param url 下载的apk地址
 */
var dtask = null ;
function createDownload(url) {
	nwaiting = plus.nativeUI.showWaiting('1/100 \n 程序更新中.....');
	//创建下载任务
	dtask = plus.downloader.createDownload(url,{},function(download,status){
		// 下载完成
		if ( status == 200 ) {
			//download.filename
			mui.alert("下载成功", '提示', function() {
				//安装程序，第一个参数是路径，默认的下载路径在_downloads里面
	            plus.runtime.install(download.filename,{},
	            	function(){
	            		plus.nativeUI.toast('安装成功');
	            	},
	            	function(){
	            		plus.nativeUI.toast('安装失败');
	            	}
	            );
			});
            plus.nativeUI.closeWaiting();
		} else{
			mui.toast( "下载失败: " + status ); 
		}
	});
	dtask.addEventListener("statechanged", onStateChanged, false);
	dtask.start();
}
//监听下载进度
function onStateChanged(){
	mui.later(function(){
		var num = dtask.downloadedSize / dtask.totalSize * 100;
		if(num < 100){
			nwaiting.setTitle(strToInt(num)+'/100 \n 程序更新中.....'); ;//显示原生等待框 
		}else{
			nwaiting.close();
		}
	},1000);
}

/**
 * 这个方法做了一些操作、然后调用回调函数
 * @param fn 当前需要操作的对象
 * @param args 当前操作的参数
 */
function doCallback(fn, args) {
	fn.apply(this, args);
}

/**
 * ajax请求之后的回执处理
 * @param ajaxData  回执数据
 * @return boolean 正确返回true  错误返回false
 */
function ajaxReceipt(ajaxData) {
	if(ajaxData.indexOf("error") != -1) { //错误信息输出
		return false;
	}
	return true;
}

/**
 * 所有操作完成弹出操作方法
 * @param jsonObj
 */
function updateOver_back(jsonObj) {
	if(ajaxReceipt(jsonObj.data)) {
		var jsonInfo = strToJson(jsonObj.data);
		if(jsonInfo.code == "fail") { //失败标识符
			mui.toast(jsonInfo.info);
		} else {
			if(isUndefinedAndEmpty(jsonInfo.info)) {
				if(!isUndefinedAndEmpty(jsonObj.brck_url)) {
					window.location = jsonObj.brck_url;
				} else if(!isUndefinedAndEmpty(jsonObj.overMethodName)) { //如果有回调方法就进行回调
					doCallback(eval(jsonObj.overMethodName), [jsonObj]);
				}
			} else {
				mui.toast(jsonInfo.info);
				setTimeout(function(){
					if(!isUndefinedAndEmpty(jsonObj.brck_url)){
						window.location=jsonObj.brck_url;
					}else if(!isUndefinedAndEmpty(jsonObj.overMethodName)){ //如果有回调方法就进行回调
						doCallback(eval(jsonObj.overMethodName),[jsonObj]);
					}
				},1000);
			}
		}
	} else {
		mui.toast('操作失败');
	}
}

/**
 * 所有操作完成弹出操作方法 弹出confirm对话框
 * @param jsonObj
 */
function updateOver_confirm_back(jsonObj) {
	if(ajaxReceipt(jsonObj.data)) {
		var jsonInfo = strToJson(jsonObj.data);
		if(jsonInfo.code == "fail") { //失败标识符
			mui.toast(jsonInfo.info);
		} else {
			var btnArray = ['否', '是'];
			if(isUndefinedAndEmpty(jsonInfo.info)) {
				mui.confirm(jsonInfo.info, '确认', btnArray, function(e) {
					if(e.index == 1) {
						if(!isUndefinedAndEmpty(jsonObj.brck_url)) {
							window.location = jsonObj.brck_url;
						} else if(!isUndefinedAndEmpty(jsonObj.overMethodName)) { //如果有回调方法就进行回调
							doCallback(eval(jsonObj.overMethodName), [jsonObj]);
						}
					}
				})
			} else {
				mui.confirm(jsonInfo.info, '确认', btnArray, function(e) {
					if(e.index == 1) {
						if(!isUndefinedAndEmpty(jsonObj.brck_url)) {
							window.location = jsonObj.brck_url;
						} else if(!isUndefinedAndEmpty(jsonObj.overMethodName)) { //如果有回调方法就进行回调
							doCallback(eval(jsonObj.overMethodName), [jsonObj]);
						}
					}
				})
			}
		}
	} else {
		mui.toast('操作失败');
	}
}
