
mui.plusReady(function() {
	getAttribute();
	get_shop_pro__All();
	cartNum();
	$("#diwei").text(localStorage.getItem("city_name"));
	var self = plus.webview.currentWebview();
	if(!isUndefinedAndEmpty(self.search_val)) {
		$("#sousuo").click().focus();
		$("#sousuo").val(self.search_val).blur();
	}
});

function initData(search_val) {
	cartNum();
	if(!isUndefinedAndEmpty(search_val)) {
		$("#sousuo").click().focus();
		$("#sousuo").val(search_val).blur();
		getSearchShopPro(search_val);
	}
}
//查询全部的商品
function get_shop_pro__All() {
	var jsonAjax = {
		"url": "app_shop_info_All.do",
		"methodName": "bindShopProData",
	}
	getAjaxData(jsonAjax);
}

function bindShopProData(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	if(isUndefinedAndEmpty(data)) {
		mui.toast("没有相关商品信息");
		$("#searchData_1").html('<li class="li_deta">暂时没有数据，请搜索别的条件试试~</li>');
		return;
	} else {
		var datas = "";
		$.each(data, function(e, obj) {
			var productAttributeVal = obj.product_attribute_val;
			var ssu = strToJson(obj.shop_subject);
			var shop_subject = "";
			for(var k in ssu) {
				if(ssu[k] == "自营") {
					shop_subject = "自营";
				} else {
					shop_subject = "非自营";
				}
			}
			datas += '<li class="li_1">' +
				'	<a href="#" style="right: 5px;">' +
				'	<div class="mui-media-object_1"><img  id=pid_' + obj.product_id + '   src="' + path_url_img + obj.product_logo + '" /></div>' +
				'	</a><div class="mui-media-body_1">' +
				'	<span class="ziying_1">' + shop_subject + '</span>' +
				'	<span class="mui-media-body-text_1">' + obj.product_name + '</span></div>' +
				'	<span class="specifications_1">' + productAttributeVal + '</span>' +
				'	<div class="price1_1">' +
				'	<span class="price_1"><small>￥</small>' + obj.sku_money + '</span>' +
				'	<span class="shopping_1">库存' + obj.product_inventory + '</span>' +
				'	</div></li>';
		});
		$("#searchData_1").html(datas);
		$.each(data, function(e, obj) {
			document.getElementById("pid_" + obj.product_id).addEventListener('tap', function() {
				var page = plus.webview.getWebviewById("shop");
				if(page) {
					page.evalJS("initData()");
				}
				mui.openWindow({
					url: "../index/details/shopProDetails/shop.html",
					id: "shop",
					extras: {
						"shop_id": obj.shop_id,
						"product_id": obj.product_id,
					}
				});
			});
		});
	}
}
/**
 * 获得商品属性
 */
function getAttribute() {
	var jsonAjax = {
		"url": "app_getProAttribute.do",
		"methodName": "getAttribute_back",
	}
	getAjaxData(jsonAjax);
}

function getAttribute_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	var content = '';
	$.each(data, function(e, obj) {
		content += '<div class="shangpinxuanze">' + obj.attribute_name;
		content += '<span class="mui-pull-right mui-navigate-right attribute_val"';
		content += 'val_id="' + obj.attribute_id + '" val_name="' + obj.attribute_name + '")>选择</span>';
		content += '<div class="title_text_12" id="val_' + obj.attribute_id + '"></div>'
		content += '</div>';
	});
	$("#box1").append(content);
	$('.attribute_val').on('tap', function() {
		getAttributeVal($(this).attr("val_id"), $(this).attr("val_name"));
	});
}
//
function getAttributeVal(attribute_id, attribute_name) {
	var json = {
		"attribute_id": attribute_id
	}
	var jsonAjax = {
		"url": "app_getProAttributeValById.do",
		"methodName": "getAttributeVal_back",
		"attribute_name": attribute_name,
		"attribute_id": attribute_id,
		"jsonData": json,
	}
	getAjaxData(jsonAjax);
}

function getAttributeVal_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	var content = '';
	$("#attribute_name").text(jsonObj.attribute_name);
	$("#attribute_id").val("val_" + jsonObj.attribute_id);
	for(var i in data) {
		content += '<li data-group="' + i + '" class="mui-table-view-divider mui-indexed-list-group">' + i + '</li>';
//		var datas = data[i];
//		alert(jsonToStr(datas));
//		for(var k = 0; k < datas.length;k++) {
//			alert(datas[k]);
			content += '<li data-value="ZUH" data-tags="ZhuHaiSanZao" class="mui-table-view-cell mui-indexed-list-item" name="' + data[i].attribute_val + '">' + data[i].attribute_val + '</li>';
//		}
	}
	$("#attribute_ia_val").html(content);
	$("#box2").toggle();
	$("#box1").toggle();
	$(".footer-button").css('display', 'none');
	$('.mui-indexed-list-item').on('tap', function() {
		var name = $(this).attr("name");
		chooseVal(name);
	});
}
//选择属性值
function chooseVal(val) {
	var attribute_id = $("#attribute_id").val();
	var content = '<div class="title_titel_name">' + val + '</div>';
	$("#" + attribute_id).html(content);
	$("#box2").toggle();
	$("#box1").toggle();
	$(".footer-button").css('display', 'block');
}
//确定
function tijiao() {
	var val = '';
	$(".title_titel_name").each(function() {
		val += $(this).text() + ';';
	});
	if(isUndefinedAndEmpty(val)) {
		return;
	}
	var json = {
		"product_attribute_val": val,
	}
	var jsonAjax = {
		"url": "app_shop_info_search_zx.do",
		"jsonData": json,
		"methodName": "bindShopProData",
		"is_login": "n",
	}
	getAjaxData(jsonAjax);
}
//重置
function del() {
	$(".title_titel_name").each(function() {
		$(this).remove();
	});
}
//价格升降序
document.getElementById('jiage').addEventListener('tap', function() {
	var search_val = $("#sousuo").val();
	var orderby = $("#orderby").val();
	if(orderby == "1") {
		$("#orderby").val("0");
		getSearchShopPro_1(search_val, "y");
	} else {
		$("#orderby").val("1");
		getSearchShopPro_1(search_val, "n");
	}
});

function getSearchShopPro_1(search_val, byis) {
	var json = {
		"attribute_val": search_val,
		"orderBy": byis,
		"user_id": getUserLocalData().user_id,
	}
	var jsonAjax = {
		"url": "app_shop_info_search.do",
		"jsonData": json,
		"methodName": "bindShopProData",
		"is_login": "n",
	}
	getAjaxData(jsonAjax);
}
//销量
document.getElementById('xiaoliang').addEventListener('tap', function() {
	var search_val = $("#sousuo").val();
	getSearchShopPro(search_val);
})

function getSearchShopPro() {
	var search_val = $("#sousuo").val();
	var json = {
		"attribute_val": search_val,
		"user_id": getUserLocalData().user_id,
	}
	var jsonAjax = {
		"url": "app_shop_info_search.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "bindShopProData",
		"is_login": "n",
	}
	getAjaxData(jsonAjax);
}
//跳转消息页面
document.getElementById('wodexiaoxi').addEventListener('tap', function() {
	mui.openWindow({
		url: "../mine/wodexiaoxi/wodexiaoxi.html",
		id: "wodexiaoxi",

	});
});

var height = document.documentElement.clientHeight || document.body.clientHeight;
window.onresize = function() {
	var heightView = document.documentElement.clientHeight || document.body.clientHeight;
	if(heightView < height) {
		plus.webview.currentWebview().setStyle({
			height: height
		});
	}
}
////返回首页界面
//function getindex() {
//	var page = plus.webview.getWebviewById("index");
//	if(page) {
//		page.evalJS("initData()");
//	}
//	mui.openWindow({
//		url: '../index/index.html',
//		id: 'index'
//	});
//};
////获取全部的品牌
//function getShopProBrand() {
//	var jsonAjax = {
//		"url": "app_shop_pro_brand_list.do",
//		"methodName": "getShopProBrandResutl",
//		"is_login": "n",
//	}
//	getAjaxData(jsonAjax);
//}
//
//function getShopProBrandResutl(jsonObj) {
//	var jsonData = strToJson(jsonObj.data);
//	var data = strToJson(jsonData.data);
//	var datas = "";
//	var countdata = '';
//	var i = 0;
//	$.each(data, function(e, obj) {
//		i++;
//		if(i <= 5) {
//			datas += '<div class="title_titel_name" vals=b_' + obj.brand_name + '>' + obj.brand_name + '</div> ';
//		}
//	});
//	datas += '<span class="mui-pull-right mui-navigate-right whole" onclick="whole()">全部品牌<img src="" alt="" /></span>';
//	$("#BrandName").html(datas);
//
//	//全部      右箭头变动
//	$('#none').on('tap', function() {
//		$("#box2").css('display', 'none');
//	});
//	$('.whole').on('tap', function() {
//		$("#box2").toggle();
//		$("#box1").toggle();
//		$(".footer-button").css('display', 'none');
//
//	});
//	$('.queding').on('tap', function() {
//		$("#box2").toggle();
//		$("#box1").toggle();
//		$(".footer-button").css('display', 'block');
//
//	});
//	/**
//	 * 单选勾选赋值
//	 * 
//	 */
//	$('.title_text_12 div').on('tap', function() {
//		$(this).addClass("content-active").siblings('div').removeClass("content-active")
//		//获取选中的值
//		var vals = $(this).attr("vals");
//		if(vals.substr(0, 1) == "a") { //属性
//			var a_names = vals.substr(2);
//			var attribute_id = $(this).attr("attribute_id");
//			json[attribute_id] = a_names;
//		} else if(vals.substr(0, 1) == "b") { //品牌
//			b_name = vals.substr(2);
//		}
//	})
//	$('.button').on('tap', function() {
//		$(".mui-pull-right.mui-navigate-right").removeClass('tanfo');
//		$('.title_text_12').css('display', 'none');
//		$('.shangpinxuanze.dn').css('display', 'none');
//	});
//
//	//跳到全部品牌页面
//	$('.mui-pull-right.mui-navigate-right').on('tap', function() {
//		$(this).siblings('.title_text_12').toggle();
//		$(this).siblings('.dn').toggle();
//		if($(this).hasClass('tanfo')) {
//			$(this).removeClass('tanfo');
//		} else {
//			$(this).addClass('tanfo');
//		}
//	});
//	//侧滑选择
//	mui.ready(function() {
//		var header = document.querySelector('header.mui-bar');
//		var list = document.getElementById('list');
//		//calc hieght
//		list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
//		//create
//		window.indexedList = new mui.IndexedList(list);
//	});
//
//	//新加
//	//			$(function(){
//	//				jQuery('.mui-indexed-list-item').on('tap', function() {
//	//					jQuery(this).addClass("active").siblings('.mui-indexed-list-item').removeClass("active");
//	//					var vals= $(this).attr("vals");
//	//					b_name=vals.substr(2);
//	//					mui.toast("已选择品牌："+b_name)
//	//				});
//	//				
//	//			})
//
//	getb_nameByZMAll();
//}
//
//function getb_nameByZMAll() {
//	var jsonAjax = {
//		"url": "app_shop_pro_brand_All_list.do",
//		"methodName": "getb_nameByZMAllResutl",
//		"is_login": "n",
//	}
//	getAjaxData(jsonAjax);
//}
//
//function getb_nameByZMAllResutl(jsonObj) {
//	var jsonData = strToJson(jsonObj.data);
//	var data = strToJson(jsonData.data);
//	var countdata = '';
//	for(var i in data) {
//		countdata += '<li data-group="' + i + '" class="mui-table-view-divider mui-indexed-list-group">' + i + '</li>';
//		var datas = data[i]
//		for(var k in datas) {
//			countdata += '<li vals=b_' + datas[k].brand_name + ' class="mui-table-view-cell mui-indexed-list-item One_of_the_brands">' + datas[k].brand_name + '</li>';
//		}
//	}
//	mui.init()
//		(function($) {
//			$(".mui-scroll-wrapper").scroll({
//				//bounce: false,//滚动条是否有弹力默认是true
//				//indicators: false, //是否显示滚动条,默认是true
//			});
//		})(mui);
//
//	$("#table_1").html(countdata);
//	$('.One_of_the_brands').on('tap', function() {
//		var vals = $(this).attr("vals");
//		b_name = vals.substr(2);
//		mui.toast("已选择品牌：" + b_name)
//	});
//}
//
////获取全部的属性
//function getShopProAttribute() {
//	var jsonAjax = {
//		"url": "app_shop_pro_attribute_list.do",
//		"methodName": "getShopProAttributeResutl",
//		"is_login": "n",
//	}
//	getAjaxData(jsonAjax);
//}
//
//function getShopProAttributeResutl(jsonObj) {
//	var jsonData = strToJson(jsonObj.data);
//	var data = strToJson(jsonData.data);
//	var datas = "";
//	$.each(data, function(e, obj) {
//		var datas_1 = "";
//		var ss = obj.shop_attribute_val_database;
//		$.each(ss, function(i, item) {
//			datas_1 += '<div class="title_titel_name" vals=a_' + item.attribute_val + ' attribute_id =a_' + obj.attribute_id + '>' + item.attribute_val + '</div>';
//		});
//		datas += '<div class="shangpinxuanze">' + obj.attribute_name +
//			'				<span class="mui-pull-right mui-navigate-right">全部</span>' +
//			'				<div class="title_text_12">' + datas_1 + '</div></div>';
//	});
//	$("#ShopProAttributeData").html(datas);
//
//	/**
//	 * 单选勾选赋值
//	 * 
//	 */
//	jQuery('.title_text_12 div').on('tap', function() {
//		jQuery(this).addClass("content-active").siblings('div').removeClass("content-active")
//		//获取选中的值
//		var vals = $(this).attr("vals");
//		if(vals.substr(0, 1) == "a") { //属性
//			var a_names = vals.substr(2);
//			var attribute_id = $(this).attr("attribute_id");
//			json[attribute_id] = a_names;
//		} else if(vals.substr(0, 1) == "b") { //品牌
//			b_name = vals.substr(2);
//		}
//	})
//	$(function() {
//		jQuery('.button').on('tap', function() {
//			jQuery(".mui-pull-right.mui-navigate-right").removeClass('tanfo');
//			jQuery('.title_text_12').css('display', 'none');
//			jQuery('.shangpinxuanze.dn').css('display', 'none');
//		});
//	})
//
//	/*展示子级*/
//	$(function() {
//		jQuery('.mui-pull-right.mui-navigate-right').on('tap', function() {
//			jQuery(this).siblings('.title_text_12').toggle();
//			jQuery(this).siblings('.dn').toggle();
//			if(jQuery(this).hasClass('tanfo')) {
//				jQuery(this).removeClass('tanfo');
//
//			} else {
//				jQuery(this).addClass('tanfo');
//			}
//		});
//	});
//
//}
//