var num;
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var position_future = self.position_future;
	var str = position_future.split(',');
	for(var i = 0; i < str.length; i++) {
		$('.futuretext').append('<div id="future_1" class="normal_button1 del" style="">' + str[i] + '</div>');
	}
});
$("#sure").click(function() {
	var position_future = null;
	$(".futuretext").find(".normal_button1").each(function() {
		if(null == position_future) {
			position_future = $(this).html();
		} else {
			position_future += "," + $(this).html();
		}
	})
	if(isUndefinedAndEmpty(position_future)) {
		mui.toast("请选择或者填写职业愿景！")
		return;
	}
	var json = {
		"position_future": position_future,
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_updateUserFutureProfessional.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "setUserFuture_back",
	};
	getAjaxData(jsonAjax);
});

function setUserFuture_back(jsonObj) {
	var page = plus.webview.getWebviewById("bianjiziliao");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "bianjiziliao.html",
		id: "bianjiziliao"
	});
}

/******************************************/
//$("#del_1").click(function(){
//	$("#future_1").html('');
//});
//$("#del_2").click(function(){
//	$("#future_2").html('');
//});
//$("#del_3").click(function(){
//	$("#future_3").html('');
//});
//$("#del_4").click(function(){
//	$("#future_4").html('');
//});
/*********************************************/
//$("#xiaoshou").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('销售')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('销售')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('销售')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('销售')
//		return;
//	}
//});
//$("#gendan").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('跟单')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('跟单')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('跟单')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('跟单')
//		return;
//	}
//});
//$("#zhanshi").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('展示')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('展示')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('展示')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('展示')
//		return;
//	}
//});
//$("#wenan").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('文案')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('文案')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('文案')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('文案')
//		return;
//	}
//});
//$("#cehua").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('策划')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('策划')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('策划')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('策划')
//		return;
//	}
//});
//$("#peixun").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('培训')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('培训')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('培训')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('培训')
//		return;
//	}
//});
//$("#pingmian").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('平面')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('平面')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('平面')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('平面')
//		return;
//	}
//});
//$("#xingzheng").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('行政')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('行政')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('行政')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('行政')
//		return;
//	}
//});
//$("#kuaiji").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('会计')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('会计')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('会计')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('会计')
//		return;
//	}
//});
//$("#chanpinkaifa").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('产品开发')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('产品开发')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('产品开发')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('产品开发')
//		return;
//	}
//});
//$("#daqujinli").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('大区经理')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('大区经理')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('大区经理')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('大区经理')
//		return;
//	}
//});
//$("#shejizongjian").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('设计总监')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('设计总监')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('设计总监')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('设计总监')
//		return;
//	}
//});
//$("#shichangzongjian").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('市场总监')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('市场总监')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('市场总监')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('市场总监')
//		return;
//	}
//});
//$("#xiaoshouzongjian").click(function(){
//	if(isUndefinedAndEmpty($("#future_1").html())){
//		$("#future_1").html('销售总监')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_2").html())){
//		$("#future_2").html('销售总监')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_3").html())){
//		$("#future_3").html('销售总监')
//		return;
//	}
//	if(isUndefinedAndEmpty($("#future_4").html())){
//		$("#future_4").html('销售总监')
//		return;
//	}
//});

jQuery(".normal").click(function() {
	jQuery('.futuretext').append('<div id="future_1" class="normal_button1 del" style="">' + jQuery(this).text() + '</div>');

})

jQuery('body').on('tap', '.del', function() {
	jQuery(this).remove();
})