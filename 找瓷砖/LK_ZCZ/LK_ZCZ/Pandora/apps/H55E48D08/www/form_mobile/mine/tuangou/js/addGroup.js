var group_id;
var skuMoney;
var order_id;
var orderdetail_val;
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	orderdetail_val = self.orderdetail_val;
	getSkuPro(self.sku_id);
	addGroupDefaultAddress();
});

function getSkuPro(skuId) {
	var json = {
		"sku_id": skuId
	}
	var jsonAjax = {
		"url": "app_addGroup_that_pro.do",
		"jsonData": json,
		"methodName": "getSkuPro_back"
	}
	getAjaxData(jsonAjax);

}

function getSkuPro_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '';
	$.each(data, function(e, obj) {
		$("#productId").val(obj.product_id);
		$("#skuId").val(obj.sku_id);
		$("#shop_id").val(obj.shop_id);
		$("#product_price").val(obj.product_price);
		$("#product_name").val(obj.product_name);
		content += '<span class="product"><img src="' + path_url_img + obj.product_logo + '" style="width: 5.62rem;"/></span>';
		content += '<div class="content1-text">';
		content += '<span  class="content-text1">' + obj.product_name + '</span>';
		content += '<p id="skuName" class="content-text2">' + orderdetail_val + '</p>';
		content += '<span class="content-text3"><small>￥</small>' + obj.sku_money + '</span></div>';
	});
	$("#skuPro").html(content);
}

function addGroupDefaultAddress() {
	var userId = getUserLocalData().user_id;
	var json = {
		"user_id": userId
	}
	var jsonAjax = {
		"url": "app_addGroup_default_address.do",
		"jsonData": json,
		"methodName": "addGroupDefaultAddress_back"
	}
	getAjaxData(jsonAjax);
}

function addGroupDefaultAddress_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var obj = strToJson(json.data);
	var content = '';
	if(isUndefinedAndEmpty(obj.address_id)) {
		content += '<div onclick="openShoujiadizhi()"><span class="location"><img src="../../../form_mobile/util/img/u13.png"></span>';
		content += '<span class="content-text">你还没有设置收货地址,点击去添加</span></div>';
	} else {
		content += '<div onclick="changAddress()"><span class="location"><img src="../../../form_mobile/util/img/u13.png"></span>';
		content += '<span id="addressPerson" class="content-text">' + obj.address_person + '</span><span id="addressPhone" class="content-text">' + obj.address_phone + '</span>';
		content += '<span id="addressDetail" class="content_location">' + obj.address_detail + '</span>';
		content += '<span class="right_arrow right"><img src="../../../form_mobile/util/img/jiantou.png"/></span></div>';
	}
	$("#defaultAddress").html(content);
}

function numberTest(str) {
	var reg = new RegExp(/^\d+$/);
	if(reg.test(str)) {
		return true;
	} else {
		return false;
	}
}

//发布成功回调
function changeDelete(jsonObj) {
	var json = strToJson(jsonObj.data);
	var obj = strToJson(json.data);
	group_id = obj.group_id;
	$("#bg3").css("display","block");
}
//查看发布后的团购详情
function changname_cancel() {
	$("#bg3").css("display","none");
}

/**
 * 选择收货地址
 */
function changAddress() {
	var userId = getUserLocalData().user_id;
	mui.openWindow({
		url: "groupAddressTwo.html",
		id: "groupAddressTwo",
		extras: {
			"userId": userId
		},
		waiting: {
			autoShow: true
		}
	});
}

window.addEventListener('setAddressID', function(event) {
	var jsonObj = event.detail;
	setAddressContent(jsonObj);
});

function setAddressContent(jsonObj) {
	$("#addressPerson").html(jsonObj.address_person);
	$("#addressPhone").html(jsonObj.address_phone);
	$("#addressDetail").html(jsonObj.address_detail);
}

/*收货地址*/
function openShoujiadizhi() {
	mui.openWindow({
		url: '../shouhoudizhi/shouhoudizhi.html',
		id: 'shouhoudizhi',
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
		}
	});
}

/*************************************支付*********************************/
var channel = null;
var channels = null;
var pays = {};

function plusReady() {
	// 获取支付通道
	plus.payment.getChannels(function(cs) {
		channels = cs;
	}, function(e) {
		alert("获取支付通道失败：" + e.message);
	});
}
document.addEventListener('plusready', plusReady, false);
//调用支付
function pay(type) {
	var id = type;
	var money = strToFixed(skuMoney,2);
	if(isUndefinedAndEmpty(getUserLocalData().user_id)) {
		mui.toast('请重新登录进行支付！');
		return;
	}
	var alipayserver = path_url + 'ali_pay.do?money=' + money + '&user_id=' + getUserLocalData().user_id + '&order_ids=' + group_id + '&type=1';
	var wxpayserver = path_url + 'wx_payApp.do?money=' + money + '&user_id=' + getUserLocalData().user_id + '&order_ids=' + group_id + '&type=1';
	plus.nativeUI.showWaiting();
	//获取支付通道
	for(var i in channels) {
		if(channels[i].id == id) {
			channel = channels[i];
		}
	}
	if(id == 'alipay') {
		//获取支付通道
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			switch(xhr.readyState) {
				case 4:
					if(xhr.status == 200) {
						plus.payment.request(channel, xhr.responseText, function(result) {
							$("#bg3").css("display","none");
						}, function(error) {
							plus.nativeUI.alert("支付失败");
						});
					} else {
						alert("获取订单信息失败！");
					}
					break;
				default:break;
			}
		}
		xhr.open('GET', alipayserver);
		xhr.send();
	} else if(id == 'wxpay') {
		//获取支付通道
		mui.get(wxpayserver, {}, function(data) {
			var varpay = {
				retcode: 0,
				retmsg: "ok",
				appid: data.appid,
				noncestr: data.noncestr,
				package: data.package,
				partnerid: data.partnerid,
				prepayid: data.prepayid,
				timestamp: data.timestamp,
				sign: data.sign
			};
			plus.payment.request(channel, varpay, function(result) {
				$("#bg3").css("display","none");
			}, function(e) {
				plus.nativeUI.alert("支付失败");
			});
		}, "json");
	}
	plus.nativeUI.closeWaiting();

}

/***************************改为先生成订单先再生成团购订单********************************/
function addGroupGetMoney() {
	var user_id = getUserLocalData().user_id;
	var join_id = $("#productId").val();
	var shop_id = $("#shop_id").val();
	var group_num = $("#groupNum").val();
	var product_price = $("#product_price").val();
	var group_my_user = $("#groupMyUser").val();
	var group_price = $("#groupPrice").val();
	var product_name = $("#product_name").val();
	skuMoney = group_price * group_my_user;
	$("#Zmoney").val(skuMoney);
	var group_strat_time = $("#result").text();
	var group_stop_time = $("#start").text();
	var address_detail = $("#addressDetail").text();
	var address_person = $("#addressPerson").text();
	var address_phone = $("#addressPhone").text();
	var bz = $("#userGroupBz").val();
	var sku_id = $("#skuId").val();
	if(isUndefinedAndEmpty(user_id)) {
		mui.toast('请先登录');
		return;
	}
	if(isUndefinedAndEmpty(join_id)) {
		mui.toast('请选择商品');
		return;
	}
	if(isUndefinedAndEmpty(group_price)) {
		mui.toast('请输入团购价格');
		return;
	}
	if(isUndefinedAndEmpty(group_my_user)) {
		mui.toast('请输入我的团购数量');
		return;
	}
	if(!numberTest(group_my_user)) {
		mui.toast('请输入数字');
		return;
	}
	if(isUndefinedAndEmpty(group_num)) {
		mui.toast('请输入团购数量');
		return;
	}
	if(!numberTest(group_num)) {
		mui.toast('请输入数字');
		return;
	}
	if(isUndefinedAndEmpty(group_strat_time)) {
		mui.toast('请选择开始时间');
		return;
	}
	if(isUndefinedAndEmpty(group_stop_time)) {
		mui.toast('请选择结束时间');
		return;
	}
	if(isUndefinedAndEmpty(address_detail)) {
		mui.toast('请选择收货地址');
		return;
	}
	if(isUndefinedAndEmpty(address_person)) {
		mui.toast('请输入收货人');
		return;
	}
	if(isUndefinedAndEmpty(address_phone)) {
		mui.toast('请输入收货人电话');
		return;
	}
	if(isUndefinedAndEmpty(sku_id)) {
		mui.toast('请选择商品sku');
		return;
	}
	if(isUndefinedAndEmpty(bz)) {
		mui.toast('请介绍一下团购');
		return;
	}
	var json = {
		"user_id": user_id,
		"product_id": join_id,
		"group_num": group_num,
		"group_my_user": group_my_user,
		"group_price": group_price,
		"address_detail": address_detail,
		"address_person": address_person,
		"address_phone": address_phone,
		"sku_id": sku_id,
		"bz": bz,
		"order_cost": skuMoney,
		"shop_id": shop_id,
		"product_name": product_name,
		"orderdetail_val": orderdetail_val,
		"group_strat_time":group_strat_time,
		"group_stop_time":group_stop_time,
	};
	var jsonAjax = {
		"url": "app_addGroup.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "changeDelete",
		"is_login": "y"
	};
	getAjaxData(jsonAjax);
}

function openPay(jsonObj) {
	var json = strToJson(jsonObj.data);
	var obj = strToJson(json.data);
	order_id = obj.order_id;
	document.getElementById("bg3").style.display = ""; //打开支付接口
}