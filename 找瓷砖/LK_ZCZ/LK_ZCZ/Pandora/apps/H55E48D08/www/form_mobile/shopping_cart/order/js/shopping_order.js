var newallJsonData;
var order_ids; //定义的全局拿来接受订单id
mui.plusReady(function() {
	var s = plus.webview.currentWebview();
	newallJsonData = s.newallJsonData;
	getshop_order(newallJsonData);
	get_default_address();
});

function back() {
	mui.back();
}

(function($) {
	$.init();
	var btns = $('.btn');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var _self = this;
			if(_self.picker) {
				_self.picker.show(function(rs) {
					document.getElementById("user_birthday").innerHTML = rs.text;
					var user = getUserLocalStorage();
					user.user_birthday = rs.text;
					setUserLocalStorage(jsonToStr(user));
					saveUserData();

					_self.picker.dispose();
					_self.picker = null;
				});
			} else {
				var optionsJson = this.getAttribute('data-options') || '{}';
				var options = JSON.parse(optionsJson);
				var id = this.getAttribute('id');

				_self.picker = new $.DtPicker(options);
				_self.picker.show(function(rs) {

					document.getElementById("user_birthday").innerHTML = rs.text;

					var user = getUserLocalStorage();
					user.user_birthday = rs.text;
					setUserLocalStorage(jsonToStr(user));
					saveUserData();

					_self.picker.dispose();
					_self.picker = null;
				});
			}

		}, false);
	});

})(mui);

function back() {
	mui.back();
}

function changname_cancel_2() {
	document.getElementById("bg3").style.display = "none";
	//修改状态为未发货
	//updataOrderZt();
}

function changename_sure_2() {
	document.getElementById("bg3").style.display = "none";
	//修改状态为未发货
	//updataOrderZt();
}

function getshop_order(newallJsonData) {
	var content = '';
	var shopM = 0;
	var zongM = 0;
	var zNum = 0;
	for(var i in newallJsonData) {
		content += '<div class="content_name">';
		content += '<span class="shop"><img src="../../../form_mobile/util/img/u7.png" /></span>';
		content += '<span class="name">' + newallJsonData[i].shop_message.shop_name + '</span>';
		content += '</div>';
		var productList = newallJsonData[i].product_item;
		for(var j in productList) {
			content += '<div class="content_product">';
			content += '<img class="product" src="'+path_url_img+productList[j].product_logo+'" />';
			content += '<div class="content1-text">';
			content += '<span class="content-text1">' + productList[j].product_name + '<span class="number1 mui-pull-right">x' + productList[j].car_num + '</span></span>';
			content += '<span class="content-text2">' + productList[j].orderdetail_val + '</span>';
			content += '</div>';
			content += '</div>';
			shopM = productList[j].car_num * productList[j].sku_money;
			zNum += productList[j].car_num * 1;
			content += '<div class="content_message textareatext">';
			content += '<span class="message">给卖家留言</span>';
			content += '<textarea style="border: none;width: 70vw;padding: 0;"  placeholder="填写本次交易说明" class="placeholderys_share bordernone"></textarea>';
			content += '</div>';
			content += '<div class="content_message">';
			content += '<span class="message">商品总额</span>';
			content += '<span class="explain1">￥' + shopM + '</span>';
			content += '</div>';
			content += '<div class="content_message1">';
			content += '<span class="explain2">需付款:<b>￥' + shopM + '</b></span>';
			content += '</div>';
			content += '<div style="clear: both;background: #F0F0F0; height: 10px;"></div>';
			zongM += shopM;
		}
	}
	$("#shangp").html(content);
	$("#zongM").html(zongM);
	$("#gnum").html(zNum);
}
/**
 * 获取默认收货地址
 */
function get_default_address() {
	var json = {
		"user_id": getUserLocalData().user_id,
	}
	var jsonAjax = {
		"url": "app_Address.do",
		"jsonData": json,
		"methodName": "getDefaultAddress_back"
	}
	getAjaxData(jsonAjax);
}

function getDefaultAddress_back(jsonObj) {
	var data = strToJson(jsonObj.data);
	$("#dizhi").attr("address_id", data.address_id);
	var content = '';
	if(isUndefinedAndEmpty(data.address_id)) {
		content += '<div class="content_picture"></div>';
		content += '<div class="content" onclick="goToAddress()">';
		content += '<span class="location"><img src="../../../form_mobile/util/img/u13.png"></span>';
		content += '<span id="addressId" class="content-text-1" id="phone" >您还没有设置默认收货地址，点击去设置</span>';
		content += '<span class="right_arrow"><img src="../../../form_mobile/util/img/jiantou.png"/></span>';
		content += '</div>';
	} else {
		content += '<div class="content_picture"></div>';
		content += '<div class="content_1" onclick="address()">';
		content += '<span class="location"><img src="../../../form_mobile/util/img/u13.png"></span>';
		content += '<span class="content-text" id="address_person">' + data.address_person + '</span> &nbsp;&nbsp;<span id="address_phone">' + data.address_phone + '</span>';
		content += '<span class="content_location" id="address_detail">' + data.address_detail + '</span>';
		content += '<span class="right_arrow right_arrow_1"><img src="../../../form_mobile/util/img/jiantou.png"/></span>';
		content += '</div>';
	}
	$("#dizhi").html(content);
}
/**
 * 提交订单
 */
function buy() {
	var address_id = $("#dizhi").attr("address_id");
	if(isUndefinedAndEmpty(address_id)) {
		mui.toast("请添加收件地址！");
		return;
	}
	var shop_ids = new Array();
	var user_id = getUserLocalData().user_id;
	var address_detail = $("#address_detail").html();
	var address_phone = $("#address_phone").text();
	var address_person=$("#address_person").text();
	var car_nums = new Array();
	var product_names = new Array();
	var sku_moneys = new Array();
	var sku_ids = new Array();
	var product_ids = new Array();
	var orderdetail_vals = new Array();
	var car_ids = new Array(); //提交订单之后删除购物车的id
	
	var order_costs = new Array();
	var order_nums = new Array();
	for(var i = 0; i < newallJsonData.length; i++) {
		shop_ids.push(newallJsonData[i].shop_message.shop_id);
		var order_cost=0;
		var order_num=0;
		var productList = newallJsonData[i].product_item;
		for(var j = 0; j < productList.length; j++) {
			car_nums.push(productList[j].car_num);
			car_ids.push(productList[j].car_id);
			product_names.push(productList[j].product_names);
			sku_moneys.push(productList[j].sku_money);
			sku_ids.push(productList[j].sku_id);
			product_ids.push(productList[j].product_id);
			orderdetail_vals.push(productList[j].orderdetail_val);
			order_cost += productList[j].car_num * productList[j].sku_money;
			order_num+=productList[j].car_num*1;
		}
		order_costs.push(order_cost);
		order_nums.push(order_num);
	}
	var json = {
		"shop_ids": jsonToStr(shop_ids),
		"user_id": getUserLocalData().user_id,
		"address_detail": address_detail,
		"address_phone": address_phone,
		"address_person":address_person,
		"order_cost": jsonToStr(order_costs),
		"order_num": jsonToStr(order_nums),
		"product_ids": jsonToStr(product_ids),
		"product_nums": jsonToStr(car_nums),
		"product_names": jsonToStr(product_names),
		"product_salesprices": jsonToStr(sku_moneys),
		"orderdetail_vals":jsonToStr(orderdetail_vals),
		"sku_ids": jsonToStr(sku_ids)
	}
	var jsonAjax = {
		"url": "app_addOrder.do",
		"jsonData": json,
		"methodName": "addProOrders_back",
		"car_ids": car_ids,
		"sku_ids": sku_ids,
		"car_nums": car_nums
	}
	getAjaxData(jsonAjax);
}
//改为未发货回调
function paySuccess_back() {
	mui.toast("支付成功！")
	mui.openWindow({
		url: "me_order.html",
		id: "me_order",
	});
}

//提交订单后删除购物车商品
function deleceCar_back(car_ids) {
	var json = {
		"car_ids": car_ids
	}
	var jsonAjax = {
		"url": "app_deleteCar.do",
		"jsonData": json,
	}
	getAjaxData(jsonAjax);
}

//提交订单后修改商品的库存
function updateSkuInventory(sku_ids, car_nums) {
	var json = {
		"sku_ids": sku_ids,
		"car_nums": car_nums
	}
	var jsonAjax = {
		"url": "app_updateProInventory.do",
		"jsonData": json,
	}
	getAjaxData(jsonAjax);
}

//添加订单回调
function addProOrders_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	if(json.info == "提交成功") {
		var data = strToJson(json.data);
		order_ids = strToJson(data.order_ids); //添加完成后拿回来的订单号
		deleceCar_back(jsonObj.car_ids); //提交成功后删除购物车东西
		updateSkuInventory(jsonObj.sku_ids, jsonObj.car_nums); //修改库存
		document.getElementById("bg3").style.display = ""; //打开支付接口
	} else {
		alert('提交失败');
	}
}

//跳转到确认订单
/*function address() {
	mui.openWindow({
		url: "../../mine/shouhuodizhi/shouhuodizhi.html",
		extras: {
			"user_id":getUserLocalData().user_id
		}
	});
}*/

/**
 * 没有默认地址时转跳收件地址
 */
function goToAddress() {
	mui.openWindow({
		url: "../../mine/shouhoudizhi/shouhoudizhi.html",
		id: "shouhoudizhi",
	});
}

/**
 * 选择收货地址
 */
function address() {
	var userId = getUserLocalData().user_id;
	mui.openWindow({
		url: "../../mine/tuangou/groupAddress.html",
		id: "groupAddress",
		extras: {
			"userId": userId
		},
	});
}
window.addEventListener('setAddressID', function(event) {
	var jsonObj = event.detail;
	setAddressContent(jsonObj);
});

function setAddressContent(jsonObj) {
	$("#address_person").html(jsonObj.address_person);
	$("#address_phone").html(jsonObj.address_phone);
	$("#address_detail").html(jsonObj.address_detail);
}