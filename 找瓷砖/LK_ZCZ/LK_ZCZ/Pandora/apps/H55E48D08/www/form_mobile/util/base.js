/*****************工具操作  js  李飞  2016年10月21日 21:53:12*************************/

/*******************常量设置********************/
//var path_url = 'http://192.168.31.146:8080/Tile_Web/';
//var path_url_img = 'http://192.168.31.146:8080';

var path_url = 'http://www.kexingzhineng.com/Tile_Web/';
var path_url_img = 'http://www.kexingzhineng.com';

/**
 * 将登录信息保存到  localStorage中
 * @param userJson
 */
function setUserLocalData(userJson) {
	localStorage.setItem("userJson", userJson);
}
/**
 * 从localStorage中得到登录消息
 * @return json
 */
function getUserLocalData() {
	var userJson = localStorage.getItem("userJson");
	if(isUndefinedAndEmpty(userJson)) {
		mui.openWindow({
			url: "/form_mobile/login/login_land.html",
			id: "login",
		})
		return;
	} else {
		return strToJson(userJson);
	}
}

/**
 * 判断用户是否登录
 * @return json
 */
function isUserLogin() {
	var userJson = localStorage.getItem("userJson");
	if(isUndefinedAndEmpty(userJson)) {
		return true;
	} else {
		return false;
	}
}

function loginOut() {
	plus.webview.close('login');
	mui.openWindow({
		url: "/form_mobile/login/login_land.html",
		id: "login",
	});
}

/**
 * 得到第一个参数
 */
function getPan_1() {
	var thisURL = document.URL;
	var getval = thisURL.split('?')[1];
	return getval.split("=")[1];
}

/**********************************----图片上传----***********************************/
/**
 * 图片上传初始化
 * @param {Object} menthodNameurl
 */
function imgInit(menthodName) {
	var btnArray = [{
		title: "拍照或录像"
	}, {
		title: "读取相册"
	}];
	plus.nativeUI.actionSheet({
		cancel: "取消",
		buttons: btnArray
	}, function(e) {
		var index = e.index;
		switch(index) {
			case 0:
				break;
			case 1:
				getImage(menthodName); //拍照或录像
				break;
			case 2:
				galleryImg(menthodName); //选取现有的
				break;
		}
	});
}
/**
 * 拍照 
 */
function getImage(overMethodName) {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var s = entry.toLocalURL() + "?version=" + new Date().getTime();
			uploadHead(s, overMethodName); /*上传图片*/
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		console.log("error" + s);
	}, {
		filename: "_doc/head.png"
	})
}

/**
 * 上传头像图片 
 * @param {Object} imgPath
 */
function uploadHead(imgPath, overMethodName, square) {
	var mainImage = new Image();
	mainImage.src = imgPath;
	var image = new Image();
	image.src = imgPath;
	image.onload = function() {
		if($('#updateImgType').length != 0) {
			uploadImgH5(image, square);
		} else {
			var imgData = getBase64Image(image);
			console.log("准备上传 = " + overMethodName);
			var jsonAjax = {
				"url": "otherFile_fileEntityUploadImgBase64.do",
				"jsonData": {
					"imgData": imgData,
				},
				"methodName": overMethodName,
				"is_login": "n"
			};
			getAjaxData(jsonAjax);
		}

	}
}
/**
 * 上传 1是用户头像  2是微信公众号
 */
function uploadImgH5(image, square) {
	var wt = plus.nativeUI.showWaiting();
	var task = plus.uploader.createUpload(path_url + 'otherFile_fileEntityUploadImgs.do?width=800&height=1060', {
			method: "POST",
			blocksize: 204800,
			priority: 100
		},
		function(t, status) {
			// 上传完成
			if(status == 200) {
				var img = '<img class="data" id="" src="' + path_url_img + t.responseText + '" data-src="' + t.responseText + '" data-preview-src="" data-preview-group="1" onclick="preview(this)" />'
				$('.uploadImg').before(img);

			} else {
				mui.toast('上传图片失败', {
					duration: 'long',
					type: 'div'
				});
			}
			wt.close();
		}
	);
	task.addFile(image.src, {
		key: "uploadName"
	});
	task.start();
}
/*
 * 本地相册选择 
 */
function galleryImg(overMethodName) {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
				root.getFile("head.png", {}, function(file) {
					//文件已存在 
					file.remove(function() {
						console.log("file remove success");
						entry.copyTo(root, 'head.png', function(e) {
								var e = e.fullPath + "?version=" + new Date().getTime();
								uploadHead(e, overMethodName); /*上传图片*/
								//变更大图预览的src 
								//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现 
							},
							function(e) {
								console.log('copy image fail:' + e.message);
							});
					}, function() {
						console.log("delete image fail:" + e.message);
					});
				}, function() {
					//文件不存在 
					entry.copyTo(root, 'head.png', function(e) {
							var path = e.fullPath + "?version=" + new Date().getTime();
							uploadHead(path, overMethodName); /*上传图片*/
						},
						function(e) {
							console.log('copy image fail:' + e.message);
						});
				});
			}, function(e) {
				console.log("get _www folder fail");
			})
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(a) {}, {
		filter: "image"
	})
};

/**
 * 将图片压缩base64
 * @param {Object} img
 */
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = 600;
	var height = 600;
	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("image/png", 0.8);
	return dataURL.replace("data:image/png;base64,", "");
}
/**
 * 清空之前打开页面
 */
function claerPage(id) {
	plus.webview.hide(id); //为了效果更逼真
	plus.webview.close(id);
}

/**
 * 定时循环
 * @param i 循环次数
 */
function runCodeTime(i) {
	var codeButton = $("#codeButton");
	if(i < 60) {
		i += 1;
		codeButton.html((60 - i) + "秒重发");
		setTimeout("runCodeTime(" + i + ")", 1000);
		codeButton.attr("disabled", true);
	} else {
		codeButton.html("重新获取");
		codeButton.attr("disabled", false);
	}
}
/**
 * 根据id查询初始化数据
 * @param {Object} num
 * @param {Object} methodName
 */
function getInitData(num, methodName) {
	var json = {
		"init_id": num
	}
	var jsonAjax = {
		"url": "app_util_init_data_getData.do",
		"jsonData": json,
		"methodName": methodName,
		"is_login": "n"
	};
	getAjaxData(jsonAjax);
}
/**
 * 查询当前级别的所有城市
 * 1:省；2：市；3：区；4：县
 * @param {Object} level
 * @param {Object} methodName
 */
function getCityNameByLevel(level, methodName) {
	var json = {
		"level": level
	}
	var jsonAjax = {
		"url": "app_getCityNameByLevel.do",
		"jsonData": json,
		"methodName": methodName,
		"is_login": "n"
	};
	getAjaxData(jsonAjax);
}
/**
 * 通过上级城市名或id查找下级城市名
 * @param {Object} name
 * @param {Object} methodName
 */
function getNameByParentName(name, id, methodName) {
	var json = {
		"name": name,
		"id": id,
	}
	var jsonAjax = {
		"url": "app_getNameByParentName.do",
		"jsonData": json,
		"methodName": methodName,
		"name": name,
		"is_login": "n"
	};
	getAjaxData(jsonAjax);
}

/**
 * 获取未读消息
 */
function getHasNew() {
	var userJson = localStorage.getItem("userJson");
	if(!isUndefinedAndEmpty(userJson)) {
		var user_id=getUserLocalData().user_id;
		var jsonObj = {
			"user_id": user_id
		}
		var jsonAjax = {
			"url": "app_index_information.do",
			"jsonData": jsonObj,
			"methodName": "getHasNewBack"
		}
		getAjaxData(jsonAjax);
	}
}

/**
 * 未读消息回调
 */
function getHasNewBack(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var count = strToInt(jsonInfo.data);
	var content = '';
	if(count > 0) {
		$('#newsPoint').removeClass("mui-hidden");
		//		$('#newImg').css('margin-top','-10px')
		content += count
		$("#newsPoint").html(content);
	}
}

/**
 * 关闭页面
 * @param {Object} id
 */
function closePage(id) {
	plus.webview.close(id);
}

/*关闭自身*/
function closeme() {
	var ws = plus.webview.currentWebview();
	plus.webview.close(ws);
}

function openPage(url, id) {
	if(isUndefinedAndEmpty(url)) {
		return;
	}
	mui.openWindow({
		url: url,
		id: id,
	});
}

$(".lianxikefu").click(function() {
	jQuery('iframe').slideDown(300);
	setTimeout(function() {
		document.getElementById('kf').contentWindow.document.getElementsByClassName('goBack')[0].addEventListener('click', function() {
			document.getElementById('kf').style.display = 'none';
		})
	}, 1000)
})

/*首页*/
function openIndex() {
	var page = plus.webview.getWebviewById("index");
	if(page) {
		page.evalJS("cartNum()");
	}
	mui.openWindow({
		url: '/form_mobile/index/index.html',
		id: 'index',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
		},
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			aniShow: 0, //页面显示动画，默认为”slide-in-right“；
			duration: 0 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		}
	});
}
/*在线商城*/
function openMall() {
	var page = plus.webview.getWebviewById("online_mall");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: '/form_mobile/online_mall/online_malls.html',
		id: 'online_mall',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
		},
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			aniShow: 0, //页面显示动画，默认为”slide-in-right“；
			duration: 0 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		}
	});
}
/*购物车*/
function openCart() {
	var page = plus.webview.getWebviewById("shopping_cat");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: '/form_mobile/shopping_cart/shopping_edit.html',
		id: 'shopping_cat',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
		},
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			aniShow: 0, //页面显示动画，默认为”slide-in-right“；
			duration: 0 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		}
	});
}
/*我的*/
function openMine() {
	if(isUndefinedAndEmpty(getUserLocalData())) {
		return;
	}
	var page = plus.webview.getWebviewById("mine");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: '/form_mobile/mine/mine.html',
		id: 'mine',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
		},
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			aniShow: 0, //页面显示动画，默认为”slide-in-right“；
			duration: 0 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		}
	});
}
/**
 * 公用的购物车数量
 */
function cartNum() {
	var userJson = localStorage.getItem("userJson");
	if(!isUndefinedAndEmpty(userJson)) {
		var user_id = getUserLocalData().user_id;
		var json = {
			"user_id": user_id
		}
		var jsonAjax = {
			"url": "app_getCartNum.do",
			"methodName": "updateOver_back",
			"overMethodName": "cartNumBack",
			"jsonData": json
		}
		getAjaxData(jsonAjax);
	}
}

/**
 * 公用的购物车数量回调
 */
function cartNumBack(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	if(data.car_num > 0) {
		$(".car_num").html('<img src="../../form_mobile/util/img/gouwuche.png" style=" height: 1.34rem;"/><span class="mui-badge CartNum">'+data.car_num+'</span>');
	} else {
		$(".car_num").html('<img src="../../form_mobile/util/img/gouwuche.png" style=" height: 1.34rem;"/>');
	}
}