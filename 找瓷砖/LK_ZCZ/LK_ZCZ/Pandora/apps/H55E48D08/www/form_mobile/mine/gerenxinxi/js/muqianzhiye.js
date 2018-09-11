mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var position_name = self.position_name;
	var str = position_name.split(',');
	for(var i = 0; i < str.length; i++) {
		$('.futuretext').append('<div id="future_1" class="normal_button1 del" style="">' + str[i] + '</div>');
	}
});
$("#sure").click(function() {
	var position_name = null;
	$(".futuretext").find(".normal_button1").each(function() {
		if(null == position_name) {
			position_name = $(this).html();
		} else {
			position_name += "," + $(this).html();
		}
	})
	if(isUndefinedAndEmpty(position_name)) {
		mui.toast("请选择或者填写职业！");
		return;
	}
	
	var json = {
		"position_name": position_name,
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_updateUserProfessional.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "setUserPosition_back",
	};
	getAjaxData(jsonAjax);
})

function setUserPosition_back(jsonObj) {
	var page = plus.webview.getWebviewById("bianjiziliao");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "bianjiziliao.html",
		id: "bianjiziliao"
	});
}

//jQuery('.delect').click(function() {
//	jQuery('.del').hide();
//})
///***************************************************/
//$("#xiaoshou").click(function() {
//	$("#choose_professional").html('销售');
//	jQuery('.del').show();
//
//});
//$("#gendan").click(function() {
//	$("#choose_professional").html('跟单');
//	jQuery('.del').show();
//
//});
//$("#zhanshi").click(function() {
//	$("#choose_professional").html('展示');
//	jQuery('.del').show();
//});
//$("#wenan").click(function() {
//	$("#choose_professional").html('文案');
//	jQuery('.del').show();
//});
//$("#cehua").click(function() {
//	$("#choose_professional").html('策划');
//	jQuery('.del').show();
//});
//$("#peixun").click(function() {
//	$("#choose_professional").html('培训');
//	jQuery('.del').show();
//});
//$("#pingmian").click(function() {
//	$("#choose_professional").html('平面');
//	jQuery('.del').show();
//});
//$("#xingzheng").click(function() {
//	$("#choose_professional").html('行政');
//	jQuery('.del').show();
//});
//$("#kuaiji").click(function() {
//	$("#choose_professional").html('会计');
//	jQuery('.del').show();
//});
//$("#chanpinkaifa").click(function() {
//	$("#choose_professional").html('产品开发');
//	jQuery('.del').show();
//});
//$("#daqujinli").click(function() {
//	$("#choose_professional").html('大区经理');
//	jQuery('.del').show();
//});
//$("#shejizongjian").click(function() {
//	$("#choose_professional").html('设计总监');
//	jQuery('.del').show();
//});
//$("#shichangzongjian").click(function() {
//	$("#choose_professional").html('市场总监');
//	jQuery('.del').show();
//});
//$("#xiaoshouzongjian").click(function() {
//	$("#choose_professional").html('销售总监');
//	jQuery('.del').show();
//});