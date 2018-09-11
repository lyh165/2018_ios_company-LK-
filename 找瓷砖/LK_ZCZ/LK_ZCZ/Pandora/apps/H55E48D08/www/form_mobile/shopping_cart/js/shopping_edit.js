var shopid;
var allId = []; //全局左侧选中框的id
var allJsonData = []; //存储商品
mui.plusReady(function() {
	getCarShopIdList();
	getUserNotice();
	cartNum();
});

function initData() {
	mui.plusReady(function() {
		allId = [];
		$('#chooseCarProAll').removeClass('active');
		getCarShopIdList();
		getUserNotice();
		cartNum();
	});
}

//得到购物车商品的商店id
function getCarShopIdList() {
	var user_id = getUserLocalData().user_id;
	var json = {
		"user_id": user_id
	}
	var jsonAjax = {
		"url": "app_CarShopId.do",
		"jsonData": json,
		"methodName": "CarShopId_back"
	}
	getAjaxData(jsonAjax);
}

//得到购物车商品的商店id回调
function CarShopId_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	shopid = data;
	getCarProList();
}

//得到数据源
function getCarProList() {
	var user_id = getUserLocalData().user_id;
	var json = {
		"user_id": user_id
	}
	var jsonAjax = {
		"url": "app_getCarProList.do",
		"jsonData": json,
		"methodName": "getCarPro_back"
	}
	getAjaxData(jsonAjax);
}

function getCarPro_back(jsonObj) {
	allJsonData = [];
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var List = strToJson(data.List);
	var sum_cart_num = 0;
	var content2 = '';
	if(List.length == 0) {
		$("#kong").removeClass("mui-hidden");
		$("#zuida").addClass("mui-hidden");
	} else {
		$("#kong").addClass("mui-hidden");
		$("#zuida").removeClass("mui-hidden");
		$.each(shopid, function(i, shop) {
			var product_item = [];
			$.each(List, function(e, obj) {
				var isCollect = obj.isCollect;
				if(shop.shop_id == obj.shop_id) {
					product_item.push(obj);
				}
			});
			var product = {
				"shop_message": shop,
				"product_item": product_item
			}
			allJsonData.push(product);
		});
		loadView(); //加载购物车
	}
}

function loadView() {
	allId = [];
	var content = "";
	$.each(allJsonData, function(i, shop) {
		content += '<div id="shop' + i + '" class="xuanze_shop">';
		content += '<div class="content">';
		content += '<div id="shopa' + i + '" class="no choice headC" onclick="dianjiout(\'shop' + i + '\')"></div>';
		content += '<input type="checkbox" name="zuida" value="" style="display: none;"/>';
		content += '<div class="shop"><img src="../../form_mobile/util/img/u7.png" alt="" /></div>';
		content += '<div class="name">' + shop.shop_message.shop_name + '</div>';
		content += '</div>';
		var item = [];
		var inputId = [];
		var List = shop.product_item;
		$.each(List, function(e, obj) {
			var isCollect = obj.isCollect;
			content += '<div class="content_product">';
			content += '<div class="choice_1 choice" id="s_redio' + i + '-' + e + '" onclick="dianji2(\'' + i + '\', \'shop' + i + '\',\'#s_redio' + i + '-' + e + '\')"></div>';
			if(obj.is_shelf == 1) {
				content += '<span class="product1 width5"><img src="' + path_url_img + obj.product_logo + '" /><span>已下架</span></span></span>';
			} else {
				content += '<span class="product width5"><img src="' + path_url_img + obj.product_logo + '" /></span></span>';
			}
			content += '<div class="content-text">';
			content += '<span class="content-text1">' + obj.product_name + '</span>';
			content += '<br />';
			content += '<span class="content-text2">' + obj.orderdetail_val + '</span>';
			content += '<br />';
			content += '<span class="content-text3" name="sku_money' + obj.product_id + '"> <small>￥</small>' + obj.sku_money + '</span>';
			content += '</div>';
			if(obj.is_shelf == 0) {
				content += '<div class="mui-numbox" style="width: 5.56rem; height: 1.47rem; padding: 0 1.846rem;" car_id="' + obj.car_id + '" pro_id="' + obj.product_id + '" id="pro">';
				content += '<button class="mui-btn mui-btn-numbox-minus" type="button" style="width: 1.846rem; background: white;" onclick="clickCarNum(this,-1,event)">-</button>';
				content += '<input id="quantity_input' + i + '-' + e + '" class="mui-input-numbox" type="number" name="car_num' + obj.product_id + '" skuMoney="' + obj.sku_money + '" value="' + obj.car_num + '"/>';
				content += '<button class="mui-btn mui-btn-numbox-plus" type="button" style="width: 1.846rem; background: white;" onclick="clickCarNum(this,1,event)">+</button>';
				content += '</div>';
			} else {
				if(isCollect == 1) {
					content += '<button class="remove">已收藏</button>';
				} else {
					content += '<button class="remove"   onclick="addCollection(' + obj.product_id + ')">移入收藏夹</button>';
				}
			}
			content += '</div>';
			item.push('s_redio' + i + '-' + e);
			inputId.push('quantity_input' + i + '-' + e);
		});
		content += '</div>';
		var shopa = {
			"shopa": 'shopa' + i,
			"item": item,
			"inputId": inputId
		};
		allId.push(shopa);
	});
	$('#choose_pro').html(content);
	mui('.mui-numbox').numbox();
	getSumPrice();
}
//得到个人信息
function getUserNotice() {
	var user_id = getUserLocalData().user_id;
	var json = {
		"user_id": user_id,
		"notice_type": 1,
	}
	var jsonAjax = {
		"url": "app_getNoticeByUserId.do",
		"jsonData": json,
		"methodName": "getUserNotice_back"
	}
	getAjaxData(jsonAjax);
}

/**
 * 得到个人信息总数回调
 */
function getUserNotice_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var count = data.length;
	if(count != 0) {
		$("#count_size").html(count);
	} else {
		$("#count_size").html('');
	}
}

//单个移入收藏
function addCollection(product_id) {
	var user_id = getUserLocalData().user_id;
	var json = {
		"user_id": user_id,
		"product_id": product_id
	}
	var jsonAjax = {
		"url": "app_addCollection.do",
		"jsonData": json,
		"methodName": "getUserNotice_back"
	}
	getAjaxData(jsonAjax);
}

//单个移入收藏回調
function getUserNotice_back(jsonObj) {
	$(".remove").text("已收藏");
	cartNum();
}
/**
 * 控制外层
 * @param {Object} id
 */
function dianjiout(id) {
	var obj = $("#" + id).find(".choice");
	if(obj.hasClass('active')) {
		obj.removeClass('active')
	} else {
		obj.addClass('active')
	}
	var isAllSelectWaiceng = true;
	for(var i = 0; i < allId.length; i++) {
		if(!$('#' + allId[i].shopa).hasClass('active')) {
			isAllSelectWaiceng = false;
		}
	}
	if(isAllSelectWaiceng) {
		$('#chooseCarProAll').addClass('active');
	} else {
		$('#chooseCarProAll').removeClass('active');
	}
	getSumPrice();
}
/**
 * 控制内层
 * @param {Object} id
 * @param {Object} s
 */
function dianji2(index, id, s) {
	var obj = $("#" + id).find(".content .choice"); //得到外层div
	if($(s).hasClass('active')) {
		$(s).removeClass('active');
	} else {
		$(s).addClass('active');
	}
	var item = allId[index].item;
	var isAllSelectNeiceng = true;
	for(var i = 0; i < item.length; i++) {
		if(!$('#' + item[i]).hasClass('active')) {
			isAllSelectNeiceng = false;
		}
	}
	if(isAllSelectNeiceng) {
		$('#' + allId[index].shopa).addClass('active');
	} else {
		$('#' + allId[index].shopa).removeClass('active');
	}
	var isAllSelectWaiceng = true;
	for(var i = 0; i < allId.length; i++) {
		if(!$('#' + allId[i].shopa).hasClass('active')) {
			isAllSelectWaiceng = false;
		}
	}
	if(isAllSelectWaiceng) {
		$('#chooseCarProAll').addClass('active');
	} else {
		$('#chooseCarProAll').removeClass('active');
	}
	getSumPrice();

}
//全点
function quandian() {
	var ogj = $("#choose_pro").find(".choice");
	if(ogj.hasClass('active')) {
		ogj.removeClass('active');
		$('#chooseCarProAll').removeClass('active');
	} else {
		ogj.addClass('active')
		$('#chooseCarProAll').addClass('active');
	}
	getSumPrice();
}

/**
 * 加加减减购物车
 */
function clickCarNum(this_, num, event) {
	event.stopPropagation();
	var car_id = $(this_).parents().attr("car_id"); //获取他上一级的car_id
	var json = {
		"car_id": "",
		"car_num": 0
	}
	if(num == 1) {
		var val = parseInt($(this_).prev().val());
		var skuPrice = parseFloat($(this_).prev().attr("skuMoney"));
		$(this_).parent().prev().find("#zong").html(accMul(skuPrice, val));
		json.car_id = car_id;
		json.car_num = val;
	} else {
		var val = parseInt($(this_).next().val());
		if(val <= 1) {
			val = 1
			$("#" + $(this_).next().attr("id")).val(1);
		}
		var skuPrice = parseFloat($(this_).next().attr("skuMoney"));
		$(this_).parent().prev().find("#zong").html(accMul(skuPrice, val));
		json.car_id = car_id;
		json.car_num = val;
	}
	var jsonAjax = {
		"url": "app_updataCarNum.do",
		"jsonData": json
	}
	getAjaxData(jsonAjax);
	//更改总价格
	getSumPrice();
	shuaixn_back();
}

/**
 * 更改总价格和商品总数量
 */
function getSumPrice() {
	var allMoney = 0.0;
	var zongnum = 0;
	for(var index = 0; index < allId.length; index++) {
		var item = allId[index].item;
		for(var i = 0; i < item.length; i++) {
			if($('#' + item[i]).hasClass('active')) {
				var quantity = $('#' + allId[index].inputId[i]).val(); //\刷新购物车数量
				//var money = allJsonData[index].product_item[i].sku_money; //商品的钱
				var money = $('#' + allId[index].inputId[i]).attr("skuMoney"); //\刷新购物车数量
				if(isUndefinedAndEmpty(quantity)) {
					quantity = 0;
				}
				allMoney = allMoney + quantity * money;
				zongnum = zongnum + quantity * 1;
			}
		}
	}
	$('#zong').html(allMoney);
	$('#put_order').html(zongnum);
}

//结算
function vailStock() {
	var allMoney = 0.0;
	var newallJsonData = [];
	for(var index = 0; index < allId.length; index++) { //循环店铺
		var item = allId[index].item;
		var new_item = [];
		for(var i = 0; i < item.length; i++) { //循环店内商品
			if($('#' + item[i]).hasClass('active')) {
				var quantity = $('#' + allId[index].inputId[i]).val();
				if(isUndefinedAndEmpty(quantity)) {
					quantity = 0;
				}
				var product_item = allJsonData[index].product_item[i];
				if(quantity == 0) {
					continue;
				}
				product_item.car_num = quantity;
				new_item.push(product_item);
			}
		}
		if(new_item.length != 0) {
			var jsonItem = {
				"shop_message": allJsonData[index].shop_message,
				"product_item": new_item
			}
			newallJsonData.push(jsonItem);
		}
	}
	if(!newallJsonData.length == 0) {
		openOrder(newallJsonData);
	}

}

//跳转到确认订单
function openOrder(newallJsonData) {
	mui.openWindow({
		url: "order/shopping_order.html",
		id: "shopping_order",
		extras: {
			"newallJsonData": newallJsonData
		}
	});
	shuaixn_back();
}

/**
 * 删除选中的购物车商品
 */
function deleteCarPros() {

	var car_ids = new Array();
	for(var index = 0; index < allId.length; index++) {
		var item = allId[index].item;
		for(var i = 0; i < item.length; i++) {
			if($('#' + item[i]).hasClass('active')) {
				car_ids[i] = allJsonData[index].product_item[i].car_id; //购物车id
			}
		}
	}
	if(car_ids.length == 0) {
		mui.toast("请选择要删除的商品")
		return;
	}
	var json = {
		"car_ids": car_ids
	}
	var jsonAjax = {
		"url": "app_deleteCar.do",
		"jsonData": json,
		"methodName": "deleteCarPro_back",
		"car_ids": car_ids
	}
	getAjaxData(jsonAjax);
}

//删除回调
function deleteCarPro_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	if(json.code == "success") {
		mui.toast("删除成功");
	}
	getCarProList();
	deleteCC(); //计算删除后的数据
	loadView(); //加载页面
	cartNum();

	shuaixn_back();
}
/**
 * 收藏选中的购物车商品
 */
function addListCarPros() {
	var pro_ids = new Array();
	var car_ids = new Array();
	var user_id = getUserLocalData().user_id;
	var s = '';
	for(var index = 0; index < allId.length; index++) {
		var item = allId[index].item;
		for(var i = 0; i < item.length; i++) {
			if($('#' + item[i]).hasClass('active')) {
				pro_ids[i] = allJsonData[index].product_item[i].product_id; //购物车id
				car_ids[i] = allJsonData[index].product_item[i].car_id; //购物车id
			}
		}
	}
	if(pro_ids.length == 0) {
		mui.toast("请选择要收藏的商品")
		return;
	}
	var json = {
		"pro_ids": pro_ids,
		"user_id": user_id
	}
	var jsonAjax = {
		"url": "app_addCollectionList.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "getAddcollectionList_back",
		"car_ids": car_ids
	}
	getAjaxData(jsonAjax);
}

//多个移入收藏回調
function getAddcollectionList_back(jsonObj) {
	var json = {
		"car_ids": jsonObj.car_ids
	}
	var jsonAjax = {
		"url": "app_deleteCar.do",
		"jsonData": json
	}
	getAjaxData(jsonAjax);
	shuaixn_back();
}

/**
 * 计算被删除之后剩下的json
 */
function deleteCC() {
	var newallJsonData = [];
	var newallId = [];
	for(var index = 0; index < allId.length; index++) { //循环店铺
		//这里是新的产品的列表
		var item = allId[index].item;
		var new_product_item = [];

		//这里是新的id的列表
		var new_item = [];
		var new_inputId = [];
		for(var i = 0; i < item.length; i++) { //循环店内商品
			if(!$('#' + item[i]).hasClass('active')) {
				var quantity = $('#' + allId[index].inputId[i]).val();
				if(isUndefinedAndEmpty(quantity)) {
					quantity = 0;
				}
				var product_item = allJsonData[index].product_item[i];
				product_item.car_num = quantity;
				new_product_item.push(product_item);

				var id_new_item = allId[index].item[i];
				var id_new_inputId = allId[index].inputId[i];

				new_item.push(id_new_item);
				new_inputId.push(id_new_inputId);
			}
		}
		if(new_product_item.length != 0) {
			var jsonItem = {
				"shop_message": allJsonData[index].shop_message,
				"product_item": new_product_item
			}
			newallJsonData.push(jsonItem);

			var jsonId = {
				"shopa": allId[index].shopa,
				"item": new_item,
				"inputId": new_inputId
			}
			newallId.push(jsonId);
		}
	}
	allJsonData = newallJsonData;
}
//打开消息页面
function openMessage() {
	mui.openWindow({
		url: "../mine/wodexiaoxi/wodexiaoxi.html",
		id: "wodexiaoxi",
	});
}
//刷新
function shuaixn_back() {
	getCarShopIdList();
	cartNum();
}