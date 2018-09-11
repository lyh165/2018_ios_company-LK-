/*取参*/
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	$("#shop_id").val(self.shop_id);
	$("#product_id").val(self.product_id);
	getShopProData(self.shop_id, self.product_id);
	getBusinessByShopId_ShopPro(self.shop_id);
	getShopProEvaluation(self.product_id, "y");
	isCollections();
	openOrderdetailVal();
	updateSerivces();
});

function initData() {
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		$("#shop_id").val(self.shop_id);
		$("#product_id").val(self.product_id);
		getShopProData(self.shop_id, self.product_id, self.sku_id);
		getBusinessByShopId_ShopPro(self.shop_id);
		getShopProEvaluation(self.product_id, "y");
		isCollections();
		openOrderdetailVal();
		updateSerivces();
	});
}

//查询商品信息

function getShopProData(shop_id, product_id) {
	var json = {
		"shop_id": shop_id,
		"product_id": product_id
	}
	var jsonAjax = {
		"url": "app_shop_info_details.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "get_shop_proResults",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}
var attributeArr = new Array(); //属性
function get_shop_proResults(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var theProAttribute = data.product_attribute_val;
	attributeArr = theProAttribute.split(";");
	var showAttribute = '<span class="text_06">产品参数</span><br />';
	for(i = 0; i < attributeArr.length - 1; i++) {
		showAttribute += '<span class="text_06">' + attributeArr[i] + '</span><br />';
	}
	$("#shop_name").val(data.shop_name);
	$("#product_id_1").text(data.product_id);
	$("#product_id_2").text(data.product_id);
	$("#product_id_3").text(data.product_id);
	$("#shop_proImg_1").attr("src", path_url_img + data.product_logo);
	$("#shop_proImg_2").attr("src", path_url_img + data.product_logo);
	$("#shop_proImg_3").attr("src", path_url_img + data.product_logo);
	$("#suk_inventory").text(data.product_inventory); //id没有改
	$("#product_money").text(data.sku_money);
	$("#product_money_1").text(parseFloat(data.product_price) * 0.2 + parseFloat(data.product_price));
	$("#spxqjs").html("");
	var dd = strToJson(data.product_detail);
	var shop_pro_img = "";
	for(var k in dd) {
		shop_pro_img += '<img src=' + path_url_img + dd[k] + ' style="width: 100vw;"/>';
	}
	$("#spxqjs").html(shop_pro_img);
	$("#product_name").text(data.product_name);
	//判断商品是否已下架，更改样式
	if(isUndefinedAndEmpty(data.is_shelf) && data.is_shelf == '1') { 
		//disabled="disabled" background-color: #797979;".setAttribute("style","width:10px;height:10px;border:solid 1px red;") ;
		$("#jrgwc").text("已下架");
		$("#jrgwc").attr("disabled", "disabled");
		$("#ljgm").text("已下架");
		$("#ljgm").attr("disabled", "disabled");
		$("#jrgwc").css("background-color", "#797979");
		$("#ljgm").css("background-color", "#797979");
		$("#A_bulk").hide();
	} else {
		$("#jrgwc").text("加入购物车");
		$("#ljgm").text("立即购买");
		$("#jrgwc").css("background-color", "sandybrown");
		$("#ljgm").css("background-color", "red");
		$("#A_bulk").show();
	}
	//设置轮播
	$("#CKTP").html("");
	var datas = strToJson(data.product_img);
	var content = "";
	var content_1 = "";
	var num = 0;
	for(var k in datas) {
		num++;
	}
	$("#maxNum").text(num);
	var i = 0;
	for(var k in datas) {
		i++;
		content += '<div class="swiper-slide ">';
		content += '	<img class="slider-img" src="' + path_url_img + datas[k] + '" style="width: 100% ;"  />';
		content += '</div>';
		if(i == '1') {
			content_1 += ' <div class="mui-slider-item  mui-slider-item-duplicate">' +
				'     <div class="mui-grid-view">' +
				'         <div class="mui-media">' +
				'         <img class="mui-media-object" src="' + path_url_img + datas[k] + '"  style="width: 400px; height: 400px;"/ >' +

				'         </div>  ' +
				'     </div>' +
				' </div>';
		}
		content_1 += ' <div class="mui-slider-item ">' +
			'     <div class="mui-grid-view">' +
			'         <div class="mui-media">' +
			'         	<img class="mui-media-object" src="' + path_url_img + datas[k] + '"  style="width: 400px; height: 400px;"/ >	' +
			'         </div>  ' +
			'     </div>' +
			' </div>';
		if(i == num) {
			content_1 += ' <div class="mui-slider-item  mui-slider-item-duplicate">' +
				'     <div class="mui-grid-view">' +
				'         <div class="mui-media">' +
				'         <img class="mui-media-object" src="' + path_url_img + datas[k] + '"  style="width: 400px; height: 400px;"/ >' +
				'         </div>  ' +
				'     </div>' +
				' </div>';
		}
	}
	$("#fristCarousel").html(content);
	$("#CKTP").html(content_1);
	$("#proAttribute").html(showAttribute);
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 5000
	});
}

//我的公司信息
function getBusinessByShopId_ShopPro(shop_id) {
	var json = {
		"shop_id": shop_id
	}
	var jsonAjax = {
		"url": "app_business_logistics_by_shop_id_index.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "getBusinessByShopId_ShopProResults",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getBusinessByShopId_ShopProResults(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	toid=data.user_id;
	$("#shop_names").text("");
	$("#shop_logo").attr("src", path_url_img + data.shop_logo);
	$("#shop_names").text(data.shop_name);
	$("#user_phone").val(data.user_phone);
	var ss = strToJson(data.shop_subject);
	var count = "";
	for(var k in ss) {
		count += '<span class="content-text2" >' + ss[k] + '</span>'
	}
	$("#shop_subject").html(count);
	var sr = strToJson(data.shop_range);
	var count_1 = "";
	for(var k in sr) {
		count_1 += sr[k] + ' '
	}
	$("#shop_range").html(count_1);
	var sse = strToJson(data.shop_service);
	var count_2 = "";
	for(var k in sse) {
		count_2 += '<span class="content-text5">' + sse[k] + '</span>'
	}
	$("#shop_service").html(count_2);
	$("#shop_profile").text('公司简介:' + data.shop_profile);
	if(data.shop_subject.indexOf("自营") != -1) {
		$("#ziyingma").html('自营');
	} else {
		$("#ziyingma").html('非自营');
	}
}

//回商家店铺界面
function openIBusinenss() {
	var shop_id = $("#shop_id").val();
	var page = plus.webview.getWebviewById("wodedianpu_xiangqing");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: '../../wodedianpu/wodedianpu_xiangqing.html',
		id: 'wodedianpu_xiangqing',
		extras: { //这是要传的数据
			"shop_id": shop_id
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
		}
	});
}
//获取商品评价
function getShopProEvaluation(product_id, isIndex) {
	var json = {
		"product_id": product_id,
		"isIndex": isIndex
	}
	var jsonAjax = {
		"url": "app_shop_evaluation_index.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "getShopProEvaluationResutl",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getShopProEvaluationResutl(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	$("#UserEvaluation").html("");
	var count = 0;
	$.each(data, function(e, obj) {
		//截取时间
		var date = obj.lrsj;
		if(!isUndefinedAndEmpty(date)) {
			var timearr = date.replace(" ", ":").replace(/\:/g, "-").split("-");
			for(i = 0; i < timearr.length; i++) {
				date = timearr[i] + "-" + timearr[i + 1] + "-" + timearr[i + 2];
				break;
			}
		}
		//截取图片
		var counts = "";
		if(!isUndefinedAndEmpty(obj.product_comment_img)) {
			var ss = strToJson(obj.product_comment_img);
			if(!isUndefinedAndEmpty(date)) {
				for(var k in ss) {
					counts += '<span><img src="' + path_url_img + ss[k] + '" style="width: 5.21rem; height:5.21rem" /> </span>';
				}
			}
		}
		if(obj.is_anonymous == 1) {
			$("#UserEvaluation").before('<div class="top_05">' +
				'			<span class="text_08" id="user_name">匿名评价</span>' +
				'			<span class="text_09" id="EvaluationDate">' + date + '</span>' +
				'		</div>' +
				'		<div style="width: 92vw;font-size: 0.87rem;" id="EvaluationContent">' + obj.product_comment + ' </div>' +
				'		<div style="margin-top: 0.75rem;" id="EvaluationImg">' +
				counts +
				'			<div style="height: 0.75rem;"></div>' +
				'			<div style="width: 92vw; height: 1px;background: #dfdfdf;margin-top: 0.5rem;"></div>' +
				'		</div>');
		} else {
			$("#UserEvaluation").before('<div class="top_05">' +
				'			<span><img id="user_img" src="' + path_url_img + obj.user_img + '"style="width: 1.81rem; height:2rem; vertical-align: middle;" /></span>' +
				'			<span class="text_08" id="user_name">' + obj.user_name + '</span>' +
				'			<span class="text_09" id="EvaluationDate">' + date + '</span>' +
				'		</div>' +
				'		<div style="width: 92vw;font-size: 0.87rem;" id="EvaluationContent">' + obj.product_comment + ' </div>' +
				'		<div style="margin-top: 0.75rem;" id="EvaluationImg">' +
				counts +
				'			<div style="height: 0.75rem;"></div>' +
				'			<div style="width: 92vw; height: 1px;background: #dfdfdf;margin-top: 0.5rem;"></div>' +
				'		</div>');
		}
		count = obj.count;
	});
	$("#EvaluationCount").text(count);
}

//打开商品全部 评价
function openshopProAllEvaluation() {
	var product_id = $("#product_id").val();
	var page = plus.webview.getWebviewById("shop_02");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "shop_02.html",
		id: "shop_02",
		extras: { //这是要传的数据
			"product_id": product_id
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
		}
	});
}
/*打开购物车界面*/
function openShoppingCar() {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		var page = plus.webview.getWebviewById("shopping_edit");
		if(page) {
			page.evalJS("initData()");
		}
		mui.openWindow({
			url: "shop_car.html",
			id: "shop_car",
		});
	}
}

/**
 * 联系客服
 * */
function changeDelete() {
	var param={
		"id":getUserLocalData().user_id,
		"token":getUserLocalData().im_token,
		"toid":toid,
		"toname":$("#shop_names").text()
	}
	gotoIm(param);
}
//取消拨号
function changname_cancel() {
	$("#phoneTanKuang").css("display", "none");
}
//获取产品参数
function openOrderdetailVal() {
	var json = {
		"product_id": $("#product_id").val(),
	}
	var jsonAjax = {
		"url": "app_shop_pro_by_sku_id.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "getShopProBySkuIdResutl",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getShopProBySkuIdResutl(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	$("#shopPro_sku_name").html("");
	var counts = "";
	counts += '<div class="color Title">规格</div><span name="name_val_0">';
	$.each(data, function(e, obj) {
		if(e == 0) {
			unitPrice = obj.sku_money;
			$("#shop_pro_money_3").text(obj.sku_money);
			$("#shop_pro_money_1").text(obj.sku_money);
			$("#shop_pro_money_2").text(obj.sku_money);
		}
		if(e == 0) {
			$("#sku_id").val(obj.sku_id);
			counts += '<span class="color666 color_01" skuMoney="' + obj.sku_money + '" skuId="' + obj.sku_id + '" name="val_0" >' + obj.sku_name + '</span>';
		} else {
			counts += '<span class="color666" skuMoney="' + obj.sku_money + '" skuId="' + obj.sku_id + '" name="val_0" >' + obj.sku_name + '</span>';
		}
	});
	counts += '</span>';
	for(var s in attributeArr) {
		if(!isUndefinedAndEmpty(attributeArr[s])) {
			var name = new Array(); //属性
			name = attributeArr[s].split(":");
			var num = strToInt(s) + 1;
			counts += '<div class="color Title">' + name[0] + '</div><span name="name_val_' + num + '">';
			var val = new Array(); //值
			if(!isUndefinedAndEmpty(name[1])) {
				val = name[1].split(",");
				for(var i in val) {
					if(i == 0) {
						counts += '<span class="color666 color_01" name="val_' + num + '">' + val[i] + '</span>';
					} else {
						counts += '<span class="color666" name="val_' + num + '">' + val[i] + '</span>';
					}
				}
			}
			counts += '</span>';
		}
	}
	$("#guige1").html(counts);
	$("#guige2").html(counts);
	$("#guige3").html(counts);
	mui('body').on('tap', 'span[class=color666]', function() {
		var name = $(this).attr("name");
		$("span[name='name_" + name + "']").children("span.color666").removeClass("color_01");
		$(this).addClass("color_01");
		var money = $(this).attr("skuMoney");
		if(!isUndefinedAndEmpty(money)) {
			unitPrice = money;
			$("#sku_id").val($(this).attr("skuId"));
			var order_num = $("#shopProNum_1").val();
			$(".shop_money").html(parseFloat(order_num) * parseFloat(money));
		}
	})
}
//SUK单价
var unitPrice = '';
/*加入购物车*/
function get_car_shopisCZ() {
	var carNum = $("#shopProNum_1").val();
	if(parseInt(carNum) < 1) {
		mui.toast("商品数量不能为0");
		return;
	}
	//判断是否已添加过，添加过的修改数量
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		var orderdetail_val = '';
		$("#shopCar .color_01").each(function() {
			orderdetail_val += $(this).text() + ";";
		});
		var user_id = getUserLocalData().user_id;
		var sku_id = $("#sku_id").val();
		var product_id = $("#product_id").val();
		var json = {
			"user_id": user_id,
			"sku_id": sku_id,
			"join_id": product_id,
			"orderdetail_val": orderdetail_val,
			"car_num": carNum,
		}
		var jsonAjax = {
			"url": "app_get_car_shopisCZ.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "get_car_shopisCZResult"
		}
		getAjaxData(jsonAjax);
	};
	$(".mui-backdrop-action.mui-backdrop.mui-active").css('opacity', '0');
}

function get_car_shopisCZResult(jsonObj) {
	$("#shopCar").css('display', 'none');
	mui.toast("添加成功!");
}
//立即购买
function addOrderData() {
	var carNum = $("#shopProNum_2").val();
	if(parseInt(carNum) < 1) {
		alert("商品数量不能为0!");
		return;
	}
	if(isUserLogin()) { //未登录
		loginOut();
	} else { //color_01
		var orderdetail_val = '';
		$("#buy .color_01").each(function() {
			orderdetail_val += $(this).text() + ";";
		});
		var order_num = carNum;
		//商品名称
		var product_name = $("#product_name").text();
		//商品销售价
		var product_salesprice = unitPrice;
		var shop_logo = $("#shop_proImg_1").attr("src");
		shop_logo = shop_logo.substring(path_url_img.length, shop_logo.length);
		//总价
		//var order_cost = parseFloat(order_num) * parseFloat(product_salesprice);
		var newallJsonData = []; //订单集合
		var product_item = []; //存商品集合
		var jsonItem_1 = {
			"sku_id": $("#sku_id").val(),
			"product_id": $("#product_id").val(),
			"product_name": product_name,
			"sku_name": $("#sku_name").val(),
			"orderdetail_val": orderdetail_val,
			"car_num": order_num,
			"sku_money": product_salesprice,
			"product_logo": shop_logo,
		}
		product_item.push(jsonItem_1);
		var shop_message = {
			"shop_name": $("#shop_name").val(),
			"shop_id": $("#shop_id").val()
		}
		var jsonItem = {
			"shop_message": shop_message,
			"product_item": product_item
		}
		newallJsonData.push(jsonItem);
		mui.openWindow({
			url: "../../../shopping_cart/order/shopping_order.html",
			id: "shopping_order",
			extras: {
				"newallJsonData": newallJsonData
			}
		});
	};
	$(".mui-backdrop-action.mui-backdrop.mui-active").css('opacity', '0');
}

/*关闭弹框*/
function closeDiv_1() {
	$("#shopCar").css('display', 'none');
	$(".mui-backdrop").css('display', 'none');
}

function closeDiv_2() {
	$("#buy").css('display', 'none');
	$(".mui-backdrop").css('display', 'none');
}

function closeDiv_3() {
	$("#tuangou").css('display', 'none');
	$(".mui-backdrop").css('display', 'none');
}

//获取加减数量时的总价格，购物车
function getSumMoney_1(type) {
	var order_num = $("#shopProNum_1").val();
	if(order_num < 1 && type == 0) {
		$("#shopProNum_1").val(1);
		return;
	}
}

//获取加减数量时的总价格，订单
function getSumMoney_2(type) {
	var order_num = $("#shopProNum_2").val();
	if(order_num < 1 && type == 0) {
		$("#shopProNum_2").val(1);
		return;
	}
}
//收藏
//判断商品是否已收藏
function isCollections() {
	var user_id = getUserLocalData().user_id;
	var json = {
		"user_id": user_id,
		"product_id": $("#product_id").val()
	}
	var jsonAjax = {
		"url": "app_isCollection.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "isCollectionResult"

	}
	getAjaxData(jsonAjax);
}

function isCollectionResult(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var collection_id=data.collection_id;
	if(isUndefinedAndEmpty(collection_id)) {
		//未收藏
		$("#shouchang").html('<img id="collection_img" onclick=CollectionShop_pro("'+collection_id+'")' +
			' src="../../../util/img/shoucang001.png" style="width: 1.21rem;" />' +
			'<div class="color666"  isOpen="n" style="font-size: 0.68rem;color: #666666;">收藏</div>');
	} else {
		//已收藏
		$("#shouchang").html('<img id="collection_img" onclick=CollectionShop_pro("'+collection_id+'")' +
			' src="../../../util/img/selected.png" style="width: 1.21rem;"/> ' +
			' <div class="color666" isOpen="n" style="font-size: 0.68rem;color: #666666;">收藏</div>');
	}
}
//添加或取消收藏
function CollectionShop_pro(id) {
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		if(isUndefinedAndEmpty(id)) {
			//添加收藏
			var user_id = getUserLocalData().user_id;
			var json = {
				"user_id": user_id,
				"product_id": $("#product_id").val()
			}
			var jsonAjax = {
				"url": "app_addCollection.do",
				"jsonData": json,
				"methodName": "updateOver_back",
				"overMethodName": "isCollections"
			}
			getAjaxData(jsonAjax);
		} else {
			//取消收藏
			var json = {
				"collection_id": id
			}
			var jsonAjax = {
				"url": "app_deleteUserCollection.do",
				"jsonData": json,
				"methodName": "updateOver_back",
				"overMethodName": "isCollections"

			}
			getAjaxData(jsonAjax);
		}
	}
}
document.getElementById('fenxiang').addEventListener('tap', function() {
	updateSerivces();
	if(plus.os.name == "Android") {
		main = plus.android.runtimeMainActivity();
		Intent = plus.android.importClass("android.content.Intent");
		File = plus.android.importClass("java.io.File");
		Uri = plus.android.importClass("android.net.Uri");
		main = plus.android.runtimeMainActivity();
	}
})
var shares = null;
var Intent = null,
	File = null,
	Uri = null,
	main = null;
/**
 *
 * 更新分享服务
 */
function updateSerivces() {
	plus.share.getServices(function(s) {
		shares = {};
		for(var i in s) {
			var t = s[i];
			shares[t.id] = t;
		}
	}, function(e) {
		alert("获取分享服务列表失败");
	});
}
/**  
 * 分享操作  
 * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)  
 * @param {Boolean} bh 是否分享链接  
 */
function shareAction(sb, bh,index) {
	var sharehrefDes = getUserLocalData().user_name + '邀请您！'; //内容
	var sharehrefTitle = '易找砖';
	var sharehref = path_url + "app_user.do";
	var ua = navigator.userAgent.toLowerCase();
	if(!ua.match(/iPhone/i) == "iphone") {
		var params = {
			"sharehrefDes" : sharehrefDes,
			"sharehrefTitle" : sharehrefTitle,
			"shareHref" : sharehref,
			"shareImg":'http://www.kexingzhineng.com/Tile_Web/file/logo.png',
			"index":index
		}
		androidShare(params);
		return;
	}
	if(!sb || !sb.s) {
		console.log("无效的分享服务！");
		return;
	}
	var msg = {
		content: sharehrefDes,
		extra: {
			scene: sb.x
		}
	};
	if(bh) {
		msg.href = sharehref;
		if(sharehrefTitle != "") {
			msg.title = sharehrefTitle;
		}
		if(sharehrefDes != "") {
			msg.content = sharehrefDes;
		}
		msg.thumbs = ["_www/form_mobile/util/img/huashishenghuo.png"];//
		msg.pictures = ["_www/form_mobile/util/img/huashishenghuo.png"];
	} else {
		if(pic && pic.realUrl) {
			msg.pictures = [pic.realUrl];
		}
	}
	// 发送分享  
	if(sb.s.authenticated) {
		console.log("---已授权---");
		shareMessage(msg, sb.s);
	} else {
		console.log("---未授权---");
		sb.s.authorize(function() {
			shareMessage(msg, sb.s);
		}, function(e) {
			console.log("认证授权失败：" + e.code + " - " + e.message);

		});
	}
}
/**  
 * 发送分享消息  
 * @param {JSON} msg  
 * @param {plus.share.ShareService} s  
 */
function shareMessage(msg, s) {
	s.send(msg, function() {
		console.log("分享到\"" + s.description + "\"成功！ ");
	}, function(e) {
		console.log("分享到\"" + s.description + "\"失败: " + JSON.stringify(e));
	});
}
// 分析链接  
function shareHref(index) {
	var shareBts = [];
	// 更新分享列表  
	var ss = shares['weixin'];
	ss && ss.nativeClient && (shareBts.push({
			title: '微信朋友圈',
			s: ss,
			x: 'WXSceneTimeline'
		}),
		shareBts.push({
			title: '微信好友',
			s: ss,
			x: 'WXSceneSession'
		}));
	ss = shares['qq'];
	ss && ss.nativeClient && shareBts.push({
		title: 'QQ',
		s: ss
	});
	ss = shares['sinaweibo'];
	ss && ss.nativeClient && shareBts.push({
		title: '新浪微博',
		s: ss
	});
	shareAction(shareBts[index], true,index);
}

/*********************************************发起团购**********************************************/
/*发起团购*/
function openUser_group() {
	var sku_id;
	//判断是否已添加过，添加过的修改数量
	if(isUserLogin()) { //未登录
		loginOut();
	} else {
		sku_id = $("div#guige3 .color_01").attr("skuId");
		var orderdetail_val = '';
		$("#buy .color_01").each(function() {
			orderdetail_val += $(this).text() + ";";
		});
		var page = plus.webview.getWebviewById("faqituangou_three");
		if(page) {
			page.evalJS("initData()");
		}
		mui.openWindow({
			url: "../../../mine/tuangou/faqituangou_three.html",
			id: "faqituangou_three",
			extras: { //这是要传的数据
				"sku_id": sku_id,
				"orderdetail_val": orderdetail_val,
			},
		});
	};
	$(".mui-backdrop-action.mui-backdrop.mui-active").css('opacity', '0');
}