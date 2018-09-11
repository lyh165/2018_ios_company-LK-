$(function() {
	$("#sousuo").attr("placeholder", "搜索规格/颜色纹理/类别/品类等");
	getHotData();
	getHistoryData();

});

function initData() {
	$("#sousuo").attr("placeholder", "");
	getHotData();
	getHistoryData();
}

function closewindou() {
	// 获取当前webview窗口对象
	var curr = plus.webview.currentWebview();
	var wvs = plus.webview.all();
	for(var i = 0, len = wvs.length; i < len; i++) {
		//关闭除当前页面外的其他页面
		if(wvs[i].getURL() == curr.getURL())
			//遇到当前页跳过
			continue;
		//非当前页执行关闭
		plus.webview.close(wvs[i]);
	}
}

//返回首页界面
function getindex() {
	var page = plus.webview.getWebviewById("index");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: '../index.html',
		id: 'index'
	});
}

/*********************************************************/

function getHotData() {
	var jsonAjax = {
		"url": "app_index_search_hot.do",
		"jsonData": null,
		"methodName": "getData_back",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);

}
/*绑定热门搜索*/
function getData_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var all = strToJson(jsonInfo.data);
	$("#searchHot").html("");
	var content = "";
	$.each(all, function(e, obj) {
		content += '<span onclick="getBingSeatchData(&quot;' + obj.serach_name + '&quot;)">' + obj.serach_name + "</span>";
	});
	$("#searchHot").html(content);
}

function getHistoryData() {
	var user_id = getUserLocalData().user_id;
	var jsonObj = {
		"user_id": user_id
	}
	var jsonAjax = {
		"url": "app_index_search_history.do",
		"jsonData": jsonObj,
		"methodName": "getHistoryData_back",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}
/*绑定搜索历史*/
function getHistoryData_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var all = strToJson(jsonInfo.data);
	var content = '<li class="font08 hot_one">历史搜索</li>';
	$.each(all, function(e, obj) {
		content += '<li onclick="getBingSeatchData(&quot;' + obj.serach_name + '&quot;)" class="ssls">' + obj.serach_name + "</a>";
	});
	$("#searchHistory").html(content);
}

/*清空搜索*/
function clearHistorySearch() {
	var btnArray = ['取消', '确定'];
	mui.confirm("确定清空历史搜索吗？", "", btnArray, function(e) {
		var user_id = getUserLocalData().user_id;
		if(e.index == 1) {
			var json = {
				"user_id": user_id
			};
			var jsonAjax = {
				"url": "app_index_search_history_deleteData.do",
				"jsonData": json,
				"methodName": "updateOver_back",
				"overMethodName": "clearHistorySearch_back",
			};
			getAjaxData(jsonAjax);
		}
	}, 'div')
}

function clearHistorySearch_back() {
	$(".ssls").remove();
	mui.toast("清除成功");
}

function getBingSeatchData(searchText) {
	$("#searchText").val("");
	$("#searchText").val(searchText);
	showSearchObj($("#searchText").val());
};

/*文本款失去焦点*/
function getBlurSearch() {
	var sousuo = $("#sousuo").val();
	if(isUndefinedAndEmpty(sousuo)) {
		return;
	}
	showSearchObj(sousuo);
};

/*跳转到搜索页*/
function showSearchObj(searchText) {
	var page = plus.webview.getWebviewById("online_malls");
	if(page) {
		page.evalJS("initData('" + searchText + "')");
	}
	mui.openWindow({
		url: '../../online_mall/online_malls.html',
		id: 'online_mall',
		extras: { //这是要传的数据
			"search_val": searchText,
		},
	});

}