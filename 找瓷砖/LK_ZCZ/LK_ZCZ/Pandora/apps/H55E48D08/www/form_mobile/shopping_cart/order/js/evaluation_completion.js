mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	getCommentOrderGoodsList1(self.userId);
});

function getCommentOrderGoodsList1(userId) {
	var user_id = userId;
	var json = {
		"user_id": user_id
	};
	var jsonAjax = {
		"url": "app_getCommentOrderGoodsList.do",
		"jsonData": json,
		"methodName": "getCommentOrderGoodsList_back1",
	};
	getAjaxData(jsonAjax);
}

function getCommentOrderGoodsList_back1(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '';
	$.each(data, function(e, obj) {
		content += '<div class="content_product">';
		content += '<span class="product1"></span>';
		content += '<div class="content-text1">';
		content += '<span class="content-text4">' + obj.product_name + '</span>';
		content += '<span class="content-text2">' + obj.orderdetail_val + '<span class="text-number">x' + obj.product_num + '</span></span>';
		content += '</div>';
		content += '<button class="remove" onclick="startComment(' + obj.order_id + ',' + obj.orderdetail_id + ')">去评价</button>';
		content += '</div>';

	});
	$("#commentOrderGoods").html(content);
}

/**
 * 打开评论页面
 */
function startComment(orderId, orderDetailId) {
	claerPage('shopping_evaluate');
	var orderId = orderId;
	var orderDetailId = orderDetailId;
	mui.openWindow({
		url: "shopping_evaluate.html",
		id: "shopping_evaluate",
		extras: {
			"orderId": orderId,
			"orderDetailId": orderDetailId
		},
	});
}

/**
 * 转跳到我的订单
 */
function backToMyOrder() {
	claerPage('shopping_evaluate');
	var page = plus.webview.getWebviewById("me_order");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "me_order.html",
		id: "me_order",
		extras: {},
		waiting: {
			autoShow: true
		}
	});
}
/**
 * 跳转到首页
 */
function goIndexPage() {
	claerPage('shopping_evaluate');
	mui.openWindow({
		url: "../../index/index.html",
		id: "index",
		waiting: {
			autoShow: true
		}
	});
}
/*返回键的设置*/
mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	}
});

/*返回键调用的函数*/
mui.back = function() {
	backToMyOrder();
}