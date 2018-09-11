mui.plusReady(function() {
	getIndexData();
	$("#searchData_4").attr("placeholder", "输入瓷砖中文名/石材名");
	$("#dingwei").html(localStorage.getItem("city_name"));
	$("#searchData_4").val(""); //清空搜索框
	cartNum();
});
function initData() {
	$("#searchData_4").val("");
	$("#searchData_4").attr("placeholder", "");
	cartNum();
}
function getIndexData() {
	var jsonAjax = {
		"url": "app_index.do",
		"methodName": "updateOver_back",
		"overMethodName": "getIndexData_back"
	}
	getAjaxData(jsonAjax);
}

function getIndexData_back(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	Carouse10(strToJson(data.Carouse10)); //广告图
	Carouse9(strToJson(data.Carouse9)); //快报
	Carouse1(strToJson(data.Carouse1)); //首页轮播
	Carouse2(strToJson(data.Carouse2)); //推荐店铺
	Carouse3(strToJson(data.Carouse3)); //特价专区
	Carouse4(strToJson(data.Carouse4)); //推荐商品
	Carouse5(strToJson(data.Carouse5)); //物流推荐
	Carouse6(strToJson(data.Carouse6)); //招聘推荐
	Carouse7(strToJson(data.Carouse7)); //服务推荐
	Carouse8(strToJson(data.Carouse8)); //推荐工厂

}

window.addEventListener('setCity', function(event) {
	var city = event.detail.city;
	$("#dingwei").html(city)
});

/******************获取快报记录**************************/
function Carouse9(data) {
	$("#groupData").html("");
	var content = '';
	$.each(data, function(e, obj) {
		content += ' <span class="thermal-paper1_1">';
		content += '<span class="thermal-paper1">热文</span>';
		content += '<span>' + obj.bulletin_title + '</span>';
		content += '</span>';
	});
	$("#groupData").html(content);
}
/********************首页广告图************************/
function Carouse10(data) {
	if(!isUndefinedAndEmpty(data.init_key) && !isUndefinedAndEmpty(data.zt) && data.zt == '1') {
		$("#advertising_data").html('<div class="picture"><img src="' + path_url_img + data.init_key + '" style="width: 100% ;height: 5.06rem;" /></div>');
	}
}
/*******************首页轮播*************************/
function Carouse1(data) {
	var content = '';
	var indicator = '';
	$.each(data, function(e, obj) {
		if(e == 0) {
			content += '<div class="mui-slider-item mui-slider-item-duplicate">';
			content += '<img src="' + path_url_img + obj.carousel_img + '" onclick=getShopProDataByProductId(&quot;' + obj.product_id + '&quot;)  />';
			content += '</div>';
		}
		content += '<div class="mui-slider-item mui-slider-item-duplicate">';
		content += '<img src="' + path_url_img + obj.carousel_img + '" onclick=getShopProDataByProductId(&quot;' + obj.product_id + '&quot;)  />';
		content += '</div>';
		if(e == 4) {
			content += '<div class="mui-slider-item mui-slider-item-duplicate">';
			content += '<img src="' + path_url_img + obj.carousel_img + '" onclick=getShopProDataByProductId(&quot;' + obj.product_id + '&quot;)  />';
			content += '</div>';
		}
		if(e == 0) {
			indicator += '<div class="mui-indicator mui-active"></div>';
		} else {
			indicator += '<div class="mui-indicator"></div>';
		}
	});
	$("#fristCarousel").html(content);
	$("#containers").html(indicator);
	var gallery = mui('.mui-slider');
	gallery.slider({
		interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
	});
}
/*******************获取推荐商铺*************************/
function Carouse2(data) {
	var shop_show_img = data.shop_show_img;
	var ss = strToJson(data.shop_subject);
	var sss = data.shop_subject;
	var count = "";
	if(sss.indexOf("自营") != -1) {
		count += '<span class="shop_1" >自营店铺</span>';
	} else {
		count += '<span class="shop_1" >非自营店铺</span>';
	}
	$("#isziying").html(count);
	$("#business_id").val(data.shop_id);
	var simg = strToJson(data.shop_show_img);
	for(var j in simg) {
		if(j == "1") {
			$("#business_img_1").attr("src", path_url_img + simg[j]);
		}
		if(j == "2") {
			$("#business_img_2").attr("src", path_url_img + simg[j]);
		}
		if(j == "3") {
			$("#business_img_3").attr("src", path_url_img + simg[j]);
		}
	}
	$("#business_logo_img").attr("src", path_url_img + data.shop_logo);
	$("#business_name").text(data.shop_name);
}

/*******************获取特价专区*************************/
function Carouse3(data) {
	var content = '';
	$("#special_zonedata").html("");
	if(data.length == 0) {
		$("#tejia_show").css("display", "none");
	} else {
		$.each(data, function(e, obj) {
			var money = parseFloat(obj.sku_money); //获取价格
			var moneys = money * 0.2 + money; //价格乘以20%
			content += '<li class="li">' +
				'	<input type="text" style="display: none;" value="' + obj.product_id + '" id="product_id" />' +
				' 	<div class="mui-media-object"  onclick="openShopProByUserShopIdBySkuID(&quot;' + obj.shop_id + '&quot;,&quot;' + obj.product_id + '&quot;,&quot;' + obj.sku_id + '&quot;)"><img src="' + path_url_img + obj.product_logo + '" style="width: 10.18rem;"/></div>' +
				'  	<div class="mui-media-body">' + obj.product_name + ' </div>' +
				'	<div class="price1">' +
				'<span class="price">￥' + obj.sku_money + ' <del>￥' + moneys + '</del></span>' +
				'<span class="shopping" onclick=addCart(&quot;' + obj.product_id +
				'&quot;,&quot;' + obj.sku_id + '&quot;,1)>库存' + obj.product_inventory + '</span></div></li>'; //<img src="../../form_mobile/util/img/gouwuche1.png" style="width: 1.68rem"/>
		});
		$("#special_zonedata").html(content);
	}
}
/*******************获取推荐商品*************************/
function Carouse4(data) {
	var content = '';
	$("#shop_pordata").html("");
	var i = 0;
	if(data.length == 0) {
		$("#tuijian_show").css("display", "none");
	} else {
		$.each(data, function(e, obj) {
			var moneys = parseFloat(obj.sku_money) * 0.2 + parseFloat(obj.sku_money); //价格乘以20%
			content += '<li class="li">' +
				'<input type="text" style="display: none;" value="' + obj.product_id + '" id="product_id" />' +
				'<div class="mui-media-object"  onclick="openShopProByUserShopIdBySkuID(&quot;' + obj.shop_id + '&quot;,&quot;' + obj.product_id + '&quot;,&quot;' + obj.sku_id + '&quot;)"><img src="' + path_url_img + obj.product_logo + '" style="width: 10.18rem;"/></div>' +
				'<div class="mui-media-body">' + obj.product_name + ' </div>' +
				'<div class="price1">' +
				'<span class="price">￥' + obj.sku_money + '</span>' + // <del>￥' + moneys + '</del>
				'<span class="shopping">库存' + obj.product_inventory + '</span>' +
				'</div></li>';
		});
		$("#shop_pordata").html(content);
	}
}

/*******************获取推荐物流*************************/
function Carouse5(data) {
	var content = '';
	$("#logisticsdata").html("");
	if(data.length == 0) {
		$("#wuliu_show").css("display", "none");
	} else {
		$.each(data, function(e, obj) {
			content += '<div class="logistics">' +
				'<span>' + obj.logistics_name + '</span>' +
				'	<input type="text" style="display: none;" value="' + obj.logistics_id + '" id="logistics_id" />' +
				'<span class="logistics_price">' + obj.logistics_city_start + '—' + obj.logistics_city_stop + '&nbsp;&nbsp;&nbsp;' + obj.logistics_price + '元/吨</span>' +
				'<div class="logistics1">' +
				'<span class="logistics2" onclick="getLogisticsXiangqing(&quot;' + obj.logistics_id + '&quot;)"><img  src="' + path_url_img + obj.home_logo + '"/></span>' +
				'</div>' +
				'</div>';
		});
		$("#logisticsdata").html(content);
	}
}

/*******************获取推荐招聘*************************/
function Carouse6(data) {
	var content = '';
	$("#recruitdata").html("");
	if(data.length == 0) {
		$("#zhaopin_show").css("display", "none");
	} else {
		$.each(data, function(e, obj) {
			content += '<div class="logistics">' +
				'	<span>' + obj.user_company + '   招聘</span>' +
				'	<input type="text" style="display: none;" value="' + obj.recruit_id + '" id="recruit_id" />' +
				'	<span class="logistics_price1">' + obj.recruit_name + '---' + obj.recruit_treatment + '</span>' +
				'	<div class="logistics1">' +
				'<span class="logistics2" onclick="openRecruitDetails(&quot;' + obj.recruit_id + '&quot;)"><img src="' + path_url_img + obj.home_logo + '"/></span>' +
				'</div></div>';
		});
		$("#recruitdata").html(content);
	}
}
/*******************获取推荐服务*************************/
function Carouse7(data) {
	var content = '';
	$("#servicedata").html("");
	if(data.length == 0) {
		$("#fuwu_show").css("display", "none");
	} else {
		$.each(data, function(e, obj) {
			content += '<div class="logistics">' +
				'<span>' + obj.service_name + '服务</span>' +
				'<input type="text" style="display: none;" value="' + obj.service_id + '" id="service_id" />' +
				'<div class="logistics1">' +
				'<span class="logistics2" onclick="openServiceDetails(&quot;' + obj.service_id + '&quot;)"><img src="' + path_url_img + obj.home_logo + '"/></span>' +
				'</div></div>';
		});
		$("#servicedata").html(content);
	}
}
/*******************获取推荐工厂*************************/
function Carouse8(data) {
	var content = '';
	$("#factorydata").html("");
	if(data.length == 0) {
		$("#gongchang_show").css("display", "none");
	} else {
		$.each(data, function(e, obj) {
			content += '<div class="logistics">' +
				'	<span>' + obj.shop_name + '加工厂</span>' +
				'	<input type="text" style="display: none;" value="' + obj.shop_id + '" id="shop_id" />' +
				'	<span class="logistics_price"></span>' +
				'	<div class="logistics1">' +
				'	<span class="logistics2" onclick="openDetails(&quot;' + obj.process_id + '&quot;)"><img src="' + path_url_img + obj.process_logo + '"/></span>' +
				'	</div></div>';
		});
		$("#factorydata").html(content);
	}
}

/*签到*/
function showSign() {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		mui.openWindow({
			url: 'sign/sign.html',
			id: 'sign',
			extras: { //这是要传的数据
			},
		});
	}
}

/*地区*/
function getRegion() {
	var city = $("#dingwei").html();
	mui.openWindow({
		url: 'choose-the-city.html',
		id: 'choose-the-city',
		extras: { //这是要传的数据
			"city": city
		},
	});
}

/*搜索*/
function getOnlineMall(search_val) {
	if(!isUndefinedAndEmpty(search_val)) {
		var page = plus.webview.getWebviewById("online_mall");
		if(page) {
			page.evalJS("initData('" + search_val + "')");
		}
		mui.openWindow({
			url: '../online_mall/online_malls.html',
			id: 'online_mall',
			extras: { //这是要传的数据
				"search_val": search_val
			},
		});
	} else {
		var page = plus.webview.getWebviewById("search");
		if(page) {
			page.evalJS("initData()");
		}
		mui.openWindow({
			url: 'search/search.html',
			id: 'search'
		});
	}
}

/*搜索按条件*/
function getOnlineMall_1() {
	var page = plus.webview.getWebviewById("online_mall");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: '../online_mall/online_malls.html',
		id: 'online_mall',
	});
}
/*特价专区*/
//function getOnlineMall_2() {
//	var page = plus.webview.getWebviewById("commodity");
//	if(page) {
//		page.evalJS("initData()");
//	}
//	mui.openWindow({
//		url: 'commodity/commodity.html',
//		id: 'commodity',
//
//		waiting: {
//			autoShow: false, //自动显示等待框，默认为true
//		}
//	});
//}

/*找物流*/
function getLogistics() {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		mui.openWindow({
			url: 'logistics/logistics.html',
			id: 'logistics',
			extras: { //这是要传的数据
			},
		});
	}
}
/*找工作*/
function getJobHunting() {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		mui.openWindow({
			url: 'JobHunting/Job-hunting.html',
			id: 'logistics',
			extras: { //这是要传的数据
			},
		});
	}
}

/*找服务*/
function getService() {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		mui.openWindow({
			url: 'service/processing_factory.html',
			id: 'processing_factory',
			extras: { //这是要传的数据
			},
		});
	}
}

//进入店铺
function openIBusiness() {
	var shop_id = $("#business_id").val();
	var page = plus.webview.getWebviewById("wodedianpu_xiangqing");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: 'business-shop/businessi.html',
		id: 'businessi',
		extras: { //这是要传的数据
			"shop_id": shop_id
		},
	});
}

/*加工厂*/
function getProcess() {
	mui.openWindow({
		url: 'factory/factory.html',
		id:'factory'
	});
};

//商品详情
function openShopProByUserShopIdBySkuID(shop_id, product_id, sku_id) {
	var page = plus.webview.getWebviewById("shopProDetails_shop");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "details/shopProDetails/shop.html",
		id: "shop",
		extras: {
			"product_id": product_id,
			"sku_id": sku_id,
			"shop_id": shop_id
		}
	});
};

/**
 * 跳转到详情页面
 */
function getLogisticsXiangqing(logsitics_id) {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		mui.openWindow({
			url: "details/logisticsDetails/LogisticsDetails.html",
			id: "LogisticsDetails",
			extras: {
				"logsitics_id": logsitics_id
			}
		});
	}
};
/**
 * 打开服务详情页面
 * @param {Object} getId
 * @param {Object} up_id
 */
function openServiceDetails(service_id) {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		var page = plus.webview.getWebviewById("serviceDetails");
		if(page) {
			page.evalJS("initData()");
		}
		mui.openWindow({
			url: "details/serviceDetails/service.html",
			"id": "serviceDetails",
			extras: {
				"service_id": service_id
			}
		});
	}
};
/**
 * 打开工作详情页面
 * @param {Object} getId
 * @param {Object} up_id
 */
function openRecruitDetails(recruit_id) {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		var page = plus.webview.getWebviewById("recruitDetails");
		if(page) {
			page.evalJS("initData()");
		}
		mui.openWindow({
			url: "details/recruitDetails/position.html",
			"id": "recruitDetails",
			extras: {
				"recruit_id": recruit_id
			}
		});
	}
};

/**
 * 打开工厂详情页面
 * @param {Object} getId
 * @param {Object} up_id
 */
function openDetails(process_id) {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		mui.openWindow({
			url: "factory/factoryDetails.html",
			extras: {
				"process_id": process_id
			}
		});
	}
};

function getShopProDataByProductId(product_id) {
	var json = {
		"product_id": product_id
	}
	var jsonAjax = {
		"url": "app_shop_pro_by_product_id.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "getShopProDataByProductIdResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
};

function getShopProDataByProductIdResult(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var page = plus.webview.getWebviewById("shopProDetails_shop");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "details/shopProDetails/shop.html",
		id: "shop",
		extras: {
			"product_id": data.product_id,
			"shop_id": data.shop_id,
		}
	});
};
//跳转到团购界面
function openTuanGou() {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		var page = plus.webview.getWebviewById("tuangouList");
		if(page) {
			page.evalJS("initData()");
		}
		mui.openWindow({
			url: "../mine/tuangou/tuangouList.html",
			id: "tuangouList",
			extras: {}
		});
	}
}
//跳转到快报界面
function openkuaibao() {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		var page = plus.webview.getWebviewById("cizhuankuaibao");
		if(page) {
			page.evalJS("initData()");
		}
		mui.openWindow({
			url: "../mine/zixun/cizhuankuaibao.html",
			id: "cizhuankuaibao",
			extras: {}
		});
	}
}

//加入购物车
function addCart(product_id, sku_id, car_num) {
	var user_id = getUserLocalData().user_id;
	var json = {
		"car_num": car_num,
		"user_id": user_id,
		"sku_id": sku_id,
		"join_id": product_id
	}
	var jsonAjax = {
		"url": "app_addCar.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "addCartResult",

	}
	getAjaxData(jsonAjax);
}

function addCartResult(jsonObj) {
	cartNum();
	mui.toast("添加成功！");
}

var height = document.documentElement.clientHeight || document.body.clientHeight;
window.onresize = function() {
	var heightView = document.documentElement.clientHeight || document.body.clientHeight;
	if(heightView < height) {
		plus.webview.currentWebview().setStyle({
			height: height
		});
	}
}