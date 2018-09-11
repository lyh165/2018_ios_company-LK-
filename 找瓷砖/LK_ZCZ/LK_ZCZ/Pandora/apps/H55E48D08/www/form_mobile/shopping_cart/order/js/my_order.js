var ProId;
var SkuId;
$(function() {
	getOrderIndexData();
})
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	if(self.num == '1') {
		$(".mui-control-item").removeClass("mui-active");
		$("#item2").addClass("mui-active");
		getOrderIndexDataByZT('2');
	}
	if(self.num == '2') {
		$(".mui-control-item").removeClass("mui-active");
		$("#item4").addClass("mui-active");
		getCommentOrderGoodsList();
	}
	if(self.num == '3') {
		$(".mui-control-item").removeClass("mui-active");
		$("#item5").addClass("mui-active");
		getOrderIndexDataByZT('3');
	}
	if(self.num == '4') {
		$(".mui-control-item").removeClass("mui-active");
		$("#item1").addClass("mui-active");
		getOrderIndexData();
	}
});

$("#item1").on("tap",function(){
 	getOrderIndexData();
});
$("#item2").on("tap",function(){
 	getOrderIndexDataByZT('2')
});
$("#item3").on("tap",function(){
 	getOrderIndexDataByZT('3');
});
$("#item4").on("tap",function(){
 	getCommentOrderGoodsList();
});
$("#item5").on("tap",function(){
 	getOrderIndexDataByZT('10');
});


function getCommentOrderGoodsList() {
	var user_id = getUserLocalData().user_id;
	var json = {
		"user_id": user_id
	};
	var jsonAjax = {
		"url": "app_getCommentOrderGoodsList.do",
		"jsonData": json,
		"methodName": "getCommentOrderGoodsList_back",
	};
	getAjaxData(jsonAjax);
}

function getCommentOrderGoodsList_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = ''; 
	$.each(data, function(e, obj) {
		content += '<div class="content_product1">';
		content += '<span class="product2"><img src="' + path_url_img + obj.product_logo + '" style="width: 6.25rem;"/></span>';
		content += '<div class="content-text3">';
		content += '<span  class="content-text4">' + obj.product_name + '</span>';
		content += '<span class="content-text2">' + obj.orderdetail_val + '<span class="text-number">x' + obj.product_num + '</span></span></div>';
		content += '<button class="remove" onclick=startComment("' + obj.order_id + '","' + obj.orderdetail_id + '")>去评价</button>';
		content += '</div>';
	});
	$("#allOrder").html(content);
	
}

function getOrderIndexDataByZT(zt) {
	var user_id = getUserLocalData().user_id;
	var zt = zt;
	var json = {
		"user_id": user_id,
		"zt": zt
	};
	var jsonAjax = {
		"url": "app_getOrderListByZT.do",
		"jsonData": json,
		"methodName": "getOrderIndexData_back",
	};
	getAjaxData(jsonAjax);

}

function getOrderIndexData() {
	var user_id = getUserLocalData().user_id;
	var json = {
		"user_id": user_id,
	};
	var jsonAjax = {
		"url": "app_getDifferenceTypeOrder.do",
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
	var content5 = "";
	$.each(orders, function(e, obj) {
		var zt = strToInt(obj.zt);
		if(zt != 30 && zt != -1 && zt != 35 && zt != 40 && zt != 45) {
			var proList = strToJson(obj.proList);
			$.each(proList, function(a, objj) {
				ProId = objj.product_id;
				SkuId = objj.sku_id;
			});
			var buttonText = "";
			var state = "";
			if(zt == 2) {
				state = "等待付款";
				buttonText += '<div class="payment1" onclick=openTheNoPayDetail("' + obj.order_id + '")><div>去支付</div></div>';
				//onclick="gotoPay(\'' + obj.order_id + '\',\'' + obj.order_cost + '\')"
			} else if(zt == 3) {
				state = "待收货";
				buttonText += '<div class="payment1">';
				buttonText += '<div class="payment3" onclick=openSureGetdetail("' + obj.order_id + '")>确认收货</div>';
				buttonText += '<div class="payment2" style="border:1px solid #333333; color: #333333;" onclick="openOrder(\'' + ProId + '\',\'' + SkuId + '\',\'' + obj.shop_id + '\')">再次购买</div>';
				buttonText += '</div>';
			} else if(zt == 4) {
				state = "待发货";
				buttonText += '<div class="payment1"></div>';
			} else if(zt == 10) {
				state = "待评价";
				buttonText += '<div class="payment1">';
				buttonText += '<div class="payment3" onclick="openOrder(\'' + ProId + '\',\'' + SkuId + '\',\'' + obj.shop_id + '\')">再次购买</div>';
				buttonText += '</div>';
			}
			content += '<div  class="content_name" id="orderListId' + obj.order_id + '">';
			if(zt == 2 || zt == 3 || zt == 5 || zt == 4) {
				content += '<span class="shop1 text_text"><img src="../../../form_mobile/util/img/u7.png" alt=""  style="width: 0.75rem;/"></span>';
				content += '<span class="name text_text">' + obj.shop_name + '</span>';
				content += '<span class="jiantou1 text_text"><img src="../../../form_mobile/util/img/youjiantou1.png" style="width: 0.37rem; height: 0.62rem;"/></span>';
				content += '<span class="payment text_text">' + state + '</span></div>';
			} else {
				content += '<span class="shop1 text_text"><img src="../../../form_mobile/util/img/u7.png" alt=""  style="width: 0.75rem;/"></span>';
				content += '<span class="name text_text">' + obj.shop_name + '</span>';
				content += '<span class="jiantou1 text_text"><img src="../../../form_mobile/util/img/youjiantou1.png" style="width: 0.37rem; height: 0.62rem;"/></span>';
				content += '<span class="payment text_text" onclick=changeDelete("' + obj.order_id + '")><img src="../../../form_mobile/util/img/lajitong.png" style="width: 0.93rem;" /></span>';
				content += '<span class="yiwancheng"><img src="../../../form_mobile/util/img/yiwancheng.png" style="width: 3.43rem; height: 2.87rem;"/ ></span>';
			}
			if(zt == 2) {
				$.each(proList, function(e, pro) {
					var product_logo = pro.product_logo;
					content += '<div class="content_product" onclick=openTheNoPayDetail("' + obj.order_id + '")>';
					content += '<span class="product"><img src="' + path_url_img + product_logo + '" style="width: 3.75rem;height:3.75rem"/></span>';
					content += '<div class="content1-text">';
					content += '<span class="content-text1">' + pro.product_name + '</span>';
					content += '<span class="content-text2">' + pro.orderdetail_val + '</span>';
					content += '<span class="number1">x' + pro.product_num + '</span>';
					content += "</div>";
					content += "</div>";
				})
			} else if(zt == 3){
				$.each(proList, function(e, pro) {
					var product_logo = pro.product_logo;
					content += '<div class="content_product" onclick=openSureGetdetail("' + obj.order_id + '")>';
					content += '<span class="product"><img src="' + path_url_img + product_logo + '" style="width: 3.75rem;height:3.75rem"/></span>';
					content += '<div class="content1-text">';
					content += '<span class="content-text1">' + pro.product_name + '</span>';
					content += '<span class="content-text2">' + pro.orderdetail_val + '</span>';
					content += '<span class="number1">x' + pro.product_num + '</span>';
					content += "</div>";
					content += "</div>";
				})
			} else if(zt == 4){
				$.each(proList, function(e, pro) {
					var product_logo = pro.product_logo;
					content += '<div class="content_product">';
					content += '<span class="product"><img src="' + path_url_img + product_logo + '" style="width: 3.75rem;height:3.75rem"/></span>';
					content += '<div class="content1-text">';
					content += '<span class="content-text1">' + pro.product_name + '</span>';
					content += '<span class="content-text2">' + pro.orderdetail_val + '</span>';
					content += '<span class="number1">x' + pro.product_num + '</span>';
					content += "</div>";
					content += "</div>";
				})
			} else if(zt == 10){
				$.each(proList, function(e, pro) {
					var product_logo = pro.product_logo;
					content += '<div class="content_product" onclick=openDoneOrderDetail("' + obj.order_id + '")>';
					content += '<span class="product"><img src="' + path_url_img + product_logo + '" style="width: 3.75rem;height:3.75rem"/></span>';
					content += '<div class="content1-text">';
					content += '<span class="content-text1">' + pro.product_name + '</span>';
					content += '<span class="content-text2">' + pro.orderdetail_val + '</span>';
					content += '<span class="number1">x' + pro.product_num + '</span>';
					content += "</div>";
					content += "</div>";
				})
			}
			if(zt == 2) {
				content += '<div class="content_payment">';
				content += '<span>共' + obj.order_num + '件商品&nbsp;&nbsp;</span>';
				content += '<span>需付款:￥' + obj.order_cost + '</small></span></div>';
			} else {
				content += '<div class="content_payment">';
				content += '<span>共' + obj.order_num + '件商品&nbsp;&nbsp;</span>';
				content += '<span>商品总额:￥' + obj.order_cost + '</small></span></div>';
			}
			content += buttonText;
		}
	});
	
	$("#allOrder").html(content);
}

function changeDelete(orderId) {
	$("#sureDeleteOrder").attr("ss", orderId);
	document.getElementById("bg1").style.display = "";
}

function changname_order_cancel() {
	document.getElementById("bg1").style.display = "none";
}

function changename_order_sure() {

	var json = {
		"order_id": $("#sureDeleteOrder").attr("ss")
	};
	var jsonAjax = {
		"url": "app_order_updateOrderDelete.do",
		"jsonData": json,
		"methodName": "deleteOk"
	};
	getAjaxData(jsonAjax);
}

function deleteOk() {
	document.getElementById("bg1").style.display = "none";
	//document.getElementById("add").style.display = "none";
	mui.toast('删除订单成功');
	//mui.back();
	getOrderIndexDataByZT('10');
}

/**
 * 打开评论页面
 */
function startComment(orderId, orderDetailId) {
	var orderId = orderId;
	var orderDetailId = orderDetailId;
	claerPage('shopping_evaluate');
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
 * 打开订单支付详情页
 */
function openTheNoPayDetail(orderId) {
	var orderId = orderId;
	mui.openWindow({
		url: "order_details.html",
		id: "order_details",
		extras: {
			"orderId": orderId
		},
	});
}

/**
 * 打开订单确定收货详情页
 */
function openSureGetdetail(orderId) {
	var orderId = orderId;
	mui.openWindow({
		url: "order_details_two.html",
		id: "order_details_two",
		extras: {
			"orderId": orderId
		},
		
	});
}

/**
 * 打开订单确定收货详情页
 */
function openDoneOrderDetail(orderId) {
	var orderId = orderId;
	mui.openWindow({
		url: "order_complete.html",
		id: "order_complete",
		extras: {
			"orderId": orderId
		},
		
	});
}

function openOrder(ProId, sku_id, shop_id) {
	mui.openWindow({
		url: "../../index/details/shopProDetails/shop.html",
		id: "shop",
		extras: {
			"product_id": ProId,
			"sku_id": sku_id,
			"shop_id": shop_id
		},
		
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
	back();
}

function back() {
	var order = plus.webview.currentWebview().opener();
	order.evalJS("initData()");
	closePage("me_order");
}