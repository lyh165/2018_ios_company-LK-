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
	shop_id=data.shop_id;
	$(".product").html('<img src="' + path_url_img + data.shop_logo + '" style="width: 4.37rem;" />');
	$(".content-text1").html(data.shop_name);
	$("#shopName").val(data.shop_name);
	$("#shopShowAdd").val(data.shop_show_add);
	$("#shopWarehouseAdd").val(data.shop_warehouse_add);
	$("#shopFactoryAdd").val(data.shop_factory_add);
	$("#shopAdd").val(data.shop_add);
	var sj = strToJson(data.shop_subject)
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
	var ss_html = '';
	for(var k in ss) {
		ss_html += '<span class="content-text4">' + ss[k] + '</span>';
	}

	$("#shopService").html(ss_html);
	$(".content-text7").html("公司简介：" + data.shop_profile);
	$(".zhenjian-1").html('<img src="' + path_url_img + data.shop_img1 + '" style="width: 9.15rem;"/>');
	$(".zhenjian-2").html('<img src="' + path_url_img + data.shop_img2 + '" style="width: 9.15rem;"/>');
	$(".zhenjian-3").html('<img src="' + path_url_img + data.shop_img3 + '" style="width: 9.15rem;"/>');

	//展厅图片
	var shopShowImg = strToJson(data.shop_show_img);
	var shopShow_html = '';
	for(var k in shopShowImg) {
		if(shopShowImg[k] == "/Tile_Admin/form_util/util/images/upload.png ") {} else {
			shopShow_html += '<div class="zhanting_1"><img src="' + path_url_img + shopShowImg[k] + '" style="width: 16vw; height: 16vw;"/></div>';
		}
	}
	$("#showroom").html(shopShow_html);
	$("#showroomAdd").html(data.shop_show_add);

	//仓库
	var warehouseImg = strToJson(data.shop_warehouse_img);
	var warehouse_html = '';
	for(var k in warehouseImg) {
		if(warehouseImg[k] == "/Tile_Admin/form_util/util/images/upload.png ") {} else {
			warehouse_html += '<div class="zhanting_1"><img src="' + path_url_img + warehouseImg[k] + '" style="width: 16vw; height: 16vw;"/></div>';
		}
	}
	$("#warehouse").html(warehouse_html);
//	$("#warehouseAdd").html(data.shop_warehouse_add);
	
	
	var ckAddress = data.shop_warehouse_add.split(',');
	for(var i = 0;i<ckAddress.length;i++){
		jQuery('.ckAddress').prepend('<div class="content-text10  mui-navigate-right"><div>'+ ckAddress[i] +'</div></div>')
	}
	
	

	//工厂
	var factoryImg = strToJson(data.shop_factory_img);
	var factory_html = '';
	for(var k in factoryImg) {
		if(factoryImg[k] == "/Tile_Admin/form_util/util/images/upload.png ") {} else {
			factory_html += '<div class="zhanting_1"><img src="' + path_url_img + factoryImg[k] + '" style="width: 16vw; height: 16vw;"/></div>';
		}
	}
	$("#factory").html(factory_html);
	$("#factoryAdd").html(data.shop_factory_add);
}

//展厅地址跳转
mui("body").on('tap', '#showroomAdd', function() {
	mui.openWindow({
		url: "Location.html",
		id:"Location",
		extras: {
			"shop_name": $("#shopName").val(), //工厂名
			"shop_add": $("#shopShowAdd").val(), //工厂地址
			"shop_id":shop_id
		},
	})
})
//仓库地址跳转
mui("body").on('tap', '.ckAddress div', function() {
	mui.openWindow({
		url: "Location.html",
		id:"Location",
		extras: {
			"shop_name": $("#shopName").val(), //工厂名
			"shop_add": $("#shopWarehouseAdd").val(), //工厂地址
			"shop_id":shop_id
		},
	})
})
//工厂地址跳转
mui("body").on('tap', '#factoryAdd', function() {
	mui.openWindow({
		url: "Location.html",
		id:"Location",
		extras: {
			"shop_name": $("#shopName").val(), //工厂名
			"shop_add": $("#shopFactoryAdd").val(), //工厂地址
			"shop_id":shop_id
		},
	})
})

function openUpdataBusiness() {
	mui.openWindow({
		url: '../woyaokaidian/woyaokaidian_two.html',
		id: 'woyaokaidian_two',
	});
}