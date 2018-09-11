$(function() {
	var json = {
		"user_id": getUserLocalData().user_id,
	}
	var jsonAjax = {
		"url": "app_shop_getMyShop.do",
		"jsonData": json,
		"methodName": "getMyShop_back"
	}
	getAjaxData(jsonAjax);
})

function getMyShop_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	$("#shop_img").html('<img src="' + path_url_img + data.shop_logo + '" style="width: 4.37rem;"/>')
	$("#shop_name").html(data.shop_name);
	$(".product").html('<img src="' + path_url_img + data.shop_logo + '" />');
	$(".content-text1").html(data.shop_name);
	var sj = strToJson(data.shop_subject);
	var sj_html = ""
	for(var k in sj) {
		sj_html += "<span class='content-text2'>" + sj[k] + "</span>";
	}
	$("#shopJ").append(sj_html);
	var sr = strToJson(data.shop_range); //店铺经营范围
	var sr_html = '经营范围：'
	for(var k in sr) {
		sr_html += sr[k] + "、";
	}
	$(".content-text3").html(sr_html.substring(0, sr_html.length - 1));

	var ss = strToJson(data.shop_service); //店铺服务
	var ss_html = ''
	for(var k in ss) {
		ss_html += '<span class="content-text4">' + ss[k] + '</span>';
	}
	$('#shopService').html(ss_html);
	$("#shop_profile").html("公司简介：" + data.shop_profile);
}
//我的店铺详情跳转
mui("body").on('tap', '.content_product', function() {
	mui.openWindow({
		url: "shopInfo.html",
		id: "shopInfo",
	})
})

function openMyPublic() {
	mui.openWindow({
		url: "../wodefabu/wodefabu_wuliu.html",
		id: "wodefabu_wuliu",
	})
}

//打开商家的订单
function openBusinessOrder() {
	mui.openWindow({
		url: "order/my_order.html",
		id: "my_order",
	})
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
		url: "../mine.html",
		id: 'mine',
	});
}