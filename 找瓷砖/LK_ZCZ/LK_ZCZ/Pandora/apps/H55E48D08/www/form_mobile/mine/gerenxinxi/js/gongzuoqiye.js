mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var user_company = self.user_company;
		var str=user_company.split(',');
		for (var i=0;i<str.length;i++) {
			$('.futuretext').append('<div id="future_1" class="normal_button1 del" style="">' + str[i] + '</div>');
		}
});
$("#sure").click(function() {
	
	var  user_company=null;
	$(".futuretext").find(".normal_button1").each(function(){
		if(null==user_company){
			user_company=$(this).html();
		}else{
			user_company+=","+$(this).html();
		}
	})
	
	if(isUndefinedAndEmpty(user_company)) {
		mui.toast("请填写工作企业！");
		return;
	}
	
	var json = {
		"user_company": user_company,
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_updateUserCompany.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "setUserCompany_back",
	};
	getAjaxData(jsonAjax);
});

function setUserCompany_back(jsonObj) {
	var page = plus.webview.getWebviewById("bianjiziliao");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "bianjiziliao.html",
		id: "bianjiziliao"
	});
}
jQuery(".btn-button").click(function() {
	if(jQuery('#user_compary_past').val()) {
		jQuery('.futuretext').append('<div id="future_1" class="normal_button1 del" style="">' + jQuery('#user_compary_past').val() + '</div>');
		jQuery('#user_compary_past').val('');
	}

})
jQuery('body').on('tap', '.del', function() {
	jQuery(this).remove();
})