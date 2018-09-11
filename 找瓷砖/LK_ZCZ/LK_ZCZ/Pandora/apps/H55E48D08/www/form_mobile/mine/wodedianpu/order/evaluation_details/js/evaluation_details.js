mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	order_id = self.order_id;
	orderDetailId = self.orderDetailId;
	getProComment(orderDetailId);
});


function getProComment(orderDetailId){
	var json = {
		"orderdetail_id": orderDetailId,
	};
	var jsonAjax = {
		"url": "app_getOrderComment.do",
		"jsonData": json,
		"methodName": "getProComment_back",
	};
	getAjaxData(jsonAjax);
}


function getProComment_back(jsonObj){
	var json=strToJson(jsonObj.data);
	var data=strToJson(json.data);
	$("#user_name").html(data.user_img);
	$("#product_comment").html(data.product_comment);
	$("#gxsj").html(data.gxsj);
	$("#user_img").attr("src", path_url_img + data.user_img);
	var context='';
	var sse=strToJson(data.product_comment_img);
	for(var k in sse){
		content+='<img src="'+sse[k]+'" alt="" />';
	}
	$("#product_comment_img").html(content);
}

						