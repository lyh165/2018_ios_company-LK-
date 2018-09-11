var ProId;
var SkuId;
$(function() {
	//这里以后要换成传入user_id
	getOrderIndexDataByZT('2');
	getOrderIndexDataByZT('4');
	getOrderIndexDataByZT('3');
	getCommentsList('5');
})

function initData() {
	getOrderIndexDataByZT('2');
	getOrderIndexDataByZT('4');
	getOrderIndexDataByZT('3');
	getCommentsList('5');
}
/**
 * 根据不同状态查看商家订单
 * @param {Object} zt
 */
function getOrderIndexDataByZT(zt) {
	var user_id = getUserLocalData().user_id;
	var zt = zt;
	var json = {
		"user_id": user_id,
		"zt": zt
	};
	var jsonAjax = {
		"url": "app_getBusinessOrderListByZT.do",
		"jsonData": json,
		"methodName": "getOrderIndexData_back",
	};
	getAjaxData(jsonAjax);

}

/**
 * 查询订单数据回调
 * @param {Object} jsonObj
 */
function getOrderIndexData_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var all = strToJson(jsonInfo.data);
	var showOrder = strToInt(all.showOrder); //展示在什么id下
	var orders = all.orders;
	var content = "";
	var content2 = "";
	var content3 = "";
	var content4 = "";
	$.each(orders, function(e, obj) {
		var zt = strToInt(obj.zt);
		var proList = strToJson(obj.proList);
		$.each(proList, function(a, objj) {
			ProId = objj.product_id;
			SkuId = objj.sku_id;
		});
		content += '<li class="li_12">';
		content += '<div class="backgroundfafafa">';
		if(zt == 2) {
			content += '<span class="store_name colorff4141">等待用户付款</span>';
		} else if(zt == 4) {
			content += '<span class="store_name colorff4141">等待发货</span>';
		} else if(zt == 3) {
			content += '<span class="store_name colorff4141">商家已发货</span>';
		}
		content += '</div>';
		$.each(proList, function(e, pro) {
			var product_logo = pro.product_logo;
			content += '<div class="mb">';
			content += '<div class="huijuzhihui">';
			content += '<img src="' + path_url_img + product_logo + '" />';
			content += '</div>';
			content += '<div class="text_contant">';
			content += '<div class="text_text">' + pro.product_name + '</div>';
			content += '<div class="text">规格：' + pro.orderdetail_val + '';
			content += '<span class="mui-pull-right">X' + pro.product_num + '</span>';
			content += '</div>';
			content += '</div>';
			content += '</div>';
		})
		content += '<div class="xufukuan">';
		content += '<div class="mui-pull-right">';
		content += '<span>共' + obj.order_num + '件商品</span>';
		content += '<span>需付款：￥<b>' + obj.order_cost + '</b></span>';
		content += '</div>';
		content += '</div>';
		if(zt == 4) {
			content += '<div class="colorred">';
			content += '<button class="mui-pull-right" onclick="openFahuo(\'' + obj.order_id + '\')">发货</button>';
			content += '</div>';
		} else if(zt == 3) {
			content += '<div class="colorred color666">';
			content += '<button class="mui-pull-right" onclick="openDetails(\'' + obj.order_id + '\')">查看订单</button>';
			content += '</div>';
		}
		content += '</li>';
	});
	if(showOrder == '2') {
		$("#fukuang").html(content);
	} else if(showOrder == '4') {
		$("#fahuo").html(content);
	} else if(showOrder == '3') {
		$("#shouhuo").html(content);
	}
}

/**
 * 打开发货页面
 * @param {Object} order_id
 */
function openFahuo(order_id) {
	mui.openWindow({
		url: "invoice/invoice.html",
		id: "invoice",
		extras: {
			"orderId": order_id
		},
	});
}

/**
 * 打开订单详情
 * @param {Object} order_id
 */
function openDetails(order_id) {
	mui.openWindow({
		url: "order_collect_goods.html",
		id: "order_collect_goods",
		extras: {
			"orderId": order_id
		},
	});
}

/**
 * 单独去查看评论订单
 */
function getCommentsList() {
	var user_id = getUserLocalData().user_id;
	var zt = zt;
	var json = {
		"user_id": user_id,
		"zt": zt
	};
	var jsonAjax = {
		"url": "app_getCommentOrderList.do",
		"jsonData": json,
		"methodName": "getOrderCommentsData_back",
	};
	getAjaxData(jsonAjax);
}

/**
 * 查询评论订单数据回调
 * @param {Object} jsonObj
 */
function getOrderCommentsData_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '';
	$.each(data, function(e, obj) {
		content += '<li class="li_12 bt">';
		content += '<div>';
		content += '<div class="huijuzhihui pingjia">';
		content += '<img src="' + path_url_img + obj.product_logo + '" />';
		content += '</div>';
		content += '<div class="text_contant pingjia_text">';
		content += '<div class="text_text">' + obj.product_name + '</div>';
		content += '<div class="text">规格：' + obj.orderdetail_val + '';
		content += '<span class="mui-pull-right">X' + obj.product_num + '</span>';
		content += '</div>';
		content += '</div>';
		content += '</div>';
		content += '<div class="colorred color666 pingjia_button">';
		if(obj.zt == 5) {
			content += '<button class="mui-pull-right" >待评价</button>';
		} else {
			content += '<button class="mui-pull-right" onclick="startComment(\'' + obj.order_id + '\',\'' + obj.orderdetail_id + '\')>查看评价</button>';
		}

		content += '</div>';
		content += '</li>';
	});
	$("#pingjia").html(content);
}

/**
 * 打开查看评论页面
 */
function startComment(orderId, orderDetailId) {
	var orderId = orderId;
	var orderDetailId = orderDetailId;
	mui.openWindow({
		url: "evaluation_details/evaluation_details.html",
		id: "evaluation_details",
		extras: {
			"orderId": orderId,
			"orderDetailId": orderDetailId
		},
	});
}

mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	}
});
/*返回键调用的函数*/
mui.back = function() {
	back();
}
document.getElementById('back').addEventListener('tap', function() {
	back();
})

function back() {
	mui.openWindow({
		url: "../wodedianpu.html",
		id: 'wodedianpu',
	});
}
