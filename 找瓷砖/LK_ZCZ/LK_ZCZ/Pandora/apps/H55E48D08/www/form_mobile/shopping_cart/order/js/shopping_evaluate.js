mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	getShouldCommentOrder(self.orderId, self.orderDetailId);
	$("#orderId").val(self.orderId);
	$("#orderDetailId").val(self.orderDetailId);
});
var picNum = 0;
/**
 * 评价详情初始化
 * @param {Object} id
 */
function getShouldCommentOrder(orderId, orderDetailId) {
	var json = {
		"order_id": orderId,
		"orderdetail_id": orderDetailId,
	}
	var jsonAjax = {
		"url": "app_getOrderDetailByOrderDetailId.do",
		"jsonData": json,
		"methodName": "getOrderDetailByOrderDetailId_back"
	}
	getAjaxData(jsonAjax);
}

function getOrderDetailByOrderDetailId_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var obj = strToJson(json.data);
	$("#productImg").attr("src", path_url_img + obj.product_logo);
	$("#productName").html(obj.product_name);
	$("#skuName").html(obj.orderdetail_val);
}

/**
 * 更改图片回调
 * @param {Object} jsonObj
 */
function setImg(jsonObj) {
	var content = '';
	if(picNum >= 5) {
		alert("只能选择五张图片");
	} else {
		content += '<li class="content_picture2">';
		content += '<img src="../../../form_mobile/util/img/shanchujian.png" onclick="deleteImg($(this))" class="picture6"/>';
		content += '<span><img class="getImg" src="' + path_url_img + jsonObj.data + '" style="width: 5rem;"/></span></li>';
		$("#justList").after(content);
		picNum++;
	}
	//$("#comment_img").attr("src",path_url_img+jsonObj.data);
}
/**
 * 删除图片
 * @param {Object} obj
 */
function deleteImg(obj) {
	obj.parent().remove();

}
/**
 * 提交商品评价
 */
function addOrderComment() {
	var user_id;
	var orderId = $("#orderId").val();
	var orderDetailId = $("#orderDetailId").val();
	var productComment = $("#commentContext").val();
	if($("#is_xuan").is(":checked")) { //选中，返回true，没选中，返回false
		var is_anonymous = 1;
	} else {
		var is_anonymous = 0;
	}
	if(isUndefinedAndEmpty(productComment)) {
		mui.toast("请填写评价！");
		return;
	}
	var ImgArr = [];
	$(".getImg").each(function(e) {
		ImgArr.push(imgUrlRep($(this).attr("src")));
	});
	var json = {
		"is_anonymous": is_anonymous,
		"order_id": orderId,
		"orderdetail_id": orderDetailId,
		"product_comment": productComment,
		"product_comment_img": ImgArr.toString()
	}
	var jsonAjax = {
		"url": "app_commitCommentOrder.do",
		"jsonData": json,
		"methodName": "commitCommentOrder_back"
	}
	getAjaxData(jsonAjax);
}
/**
 * 转跳到评论成功页面
 */
function commitCommentOrder_back() {
	var userId = getUserLocalData().user_id;
	mui.openWindow({
		url: "evaluation_completion.html",
		id: "evaluation_completion",
		extras: {
			"userId": userId
		},
	});
}

/**
 * 图片路径截取
 * @param {Object} urlStr 图片路径
 */
function imgUrlRep(urlStr) {
	if(urlStr != null || urlStr != "") {
		return urlStr.substring(urlStr.indexOf('/Tile'), urlStr.length);
	}
}