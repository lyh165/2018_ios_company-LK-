mui.init();

$(function() {
	getUserDate();
	cartNum();
	isBusiness();
	
})

function initData() {
	getUserDate();
	cartNum();
	isBusiness();
}
/**
 * 是否有开店
 */
function isBusiness(){
	var user_id = getUserLocalData().user_id;
	var json = {
		"user_id": user_id
	}
	var jsonAjax = {
		"url": "app_business_logistics_index.do",
		"methodName": "isBusiness_back",
		"jsonData": json
	}
	getAjaxData(jsonAjax);
}
function isBusiness_back(jsonObj){
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	if(isUndefinedAndEmpty(data.shop_id)){
		$("#kaidian").show();
		$("#fabu").hide();
	}else{
		if(data.zt == 2) {
			$("#kaidian").hide();
			$("#fabu").show();
		}else if(data.zt == 0){
			$("#kaidian").show();
			$("#fabu").hide();
		} else if(data.zt == 1){
			$("#kaidian").show();
			$("#fabu").hide();
		}
	}
}

function getUserDate() {
	var json = {
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_findByIdByUserId.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "getUserData_back",
	};
	getAjaxData(jsonAjax);
}

function getUserData_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	if(!isUndefinedAndEmpty(data.user_img)) {
		$("#user_img").attr("src", path_url_img + data.user_img);
	}
	if(!isUndefinedAndEmpty(data.user_name)) {
		$("#user_name").html(data.user_name);
	}
	getOrderNum();
}

function getOrderNum() {
	var json = {
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_getOrderCoumtByzt.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "getOrderNum_back",
	};
	getAjaxData(jsonAjax);
}

function getOrderNum_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	if(data.not_paying == '0') {} else if(!isUndefinedAndEmpty(data.not_paying)) {
		$("#notPaying").html('<img src="../util/img/daifukuan.png"/><span class="mui-badge">' + data.not_paying + '</span>');
	}
	if(data.not_evaluate == '0') {} else if(!isUndefinedAndEmpty(data.not_evaluate)) {
		$("#notEvaluate").html('<img src="../util/img/daipingjia_one.png"/><span class="mui-badge">' + data.not_evaluate + '</span>');
	}
	if(data.complete == '0') {} else if(!isUndefinedAndEmpty(data.complete)) {
		$("#complete").html('<img src="../util/img/yiwanchengdingdan.png" /><span class="mui-badge">' + data.complete + '</span>');
	}
}
/* 个人信息*/
function openGerenxinxi() {
	mui.openWindow({
		url: 'gerenxinxi/bianjiziliao.html',
		id: 'bianjiziliao',
	});
}
/*我的订单*/
function my_order(num) {
	mui.openWindow({
		url: '../shopping_cart/order/me_order.html',
		id: 'me_order',
		extras: { //这是要传的数据
			"num":num,
		},
		waiting: {
			autoShow: true,
		}
	});
}
/*我要发布*/
function openWoyaofabu() {
	mui.openWindow({
		url: 'woyaokaidian/woyaofabu.html',
		id: 'woyaofabu',
	});
}
/*我要开店*/
function openWoyaokaidian() {
	mui.openWindow({
		url: 'woyaokaidian/woyaokaidian_two.html',
		id: 'woyaokaidian_two',
	});
}
/*我的店铺*/
function openWodedianpu() {
	var json = {
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_business_logistics_index.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "openWodedianpu_back",
	};
	getAjaxData(jsonAjax);
}

function openWodedianpu_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	if(isUndefinedAndEmpty(data.shop_id)) {
		mui.toast("请先开店！");
		return;
	} else {
		if(data.zt == 2) {
			mui.openWindow({
				url: 'wodedianpu/wodedianpu.html',
				id: 'wodedianpu',
			});
		}else if(data.zt == 0){
			mui.toast("店铺审核不通过请重新填写资料！")
		} else if(data.zt == 1){
			mui.toast("店铺还在审核中！");
		}
	}
}
/*我的发布*/
function openWodefabu() {
	var json = {
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_business_logistics_index.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "openWodefabu_back",
	};
	getAjaxData(jsonAjax);
}

function openWodefabu_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	if(isUndefinedAndEmpty(data.shop_id)) {
		mui.toast("请先开店！");
	} else {
		mui.openWindow({
			url: 'wodefabu/wodefabu_wuliu.html',
			id: 'wodefabu',
		});
	}
}
/*收货地址*/
function openShoujiadizhi() {
	mui.openWindow({
		url: 'shouhoudizhi/shouhoudizhi.html',
		id: 'shouhoudizhi',
	});
}
/*我的收藏*/
function openwodeshoucang() {
	mui.openWindow({
		url: 'wodeshoucang/wodeshoucang.html',
		id: 'wodeshoucang',
	});
}
/*我的消息*/
function openWodexiaoxi() {
	mui.openWindow({
		url: 'wodexiaoxi/wodexiaoxi.html',
		id: 'wodexiaoxi',
	});
}
/*设置*/
function openShezhi() {
	mui.openWindow({
		url: 'shezhi/shezhi.html',
		id: 'shezhi',
	});
}


window.addEventListener("initMineData", function(e) {
	initData();
});