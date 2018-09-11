mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	$("#dingwei").html(self.city);
	getHotCity();
});

function getHotCity() {
	var jsonAjax = {
		"url": "app_get_hot_city.do",
		"methodName": "getHotCity_back",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getHotCityBack(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var content = '';
	$.each(data, function(e, obj) {
		content += '<li class="city">' + obj.city_name + '</li>'
	});
	$("#hotcity").html(content);
}

function getHotCity_back(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var city_html = '';
	$.each(data, function(e, obj) {
		city_html += '<span>' + obj.city_name + '</span>'
	});
	$('.city1').html(city_html);
}
mui(".city1").on("tap", "span", function(e) {
	$("#dingwei").text(e.target.innerText)
	var selectCity = e.target.innerText;
	var view = plus.webview.currentWebview().opener();
	mui.fire(view, "setCity", {
		city: selectCity
	});
	mui.back();
})

mui("#ul_city").on("tap", "li", function(e) {
	$("#dingwei").text(e.target.innerText)
	getCity_name(e);
});

function getCity_name(e) {
	localStorage.setItem("userCity", e.target.innerText);
	var tagClass = e.target.getAttribute("class");
	if(tagClass && tagClass.indexOf("mui-table-view-cell") != -1) {
		var selectCity = e.target.innerText;
		var view = plus.webview.currentWebview().opener();
		mui.fire(view, "setCity", {
			city: selectCity
		});
		mui.back();
	}
};

function doindex_back() {
	mui.back();
}