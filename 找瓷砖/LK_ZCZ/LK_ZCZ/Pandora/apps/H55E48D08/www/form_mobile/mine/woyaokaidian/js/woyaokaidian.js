var shop_id;

function back() {
	mui.back();
}
/**
 * 多选框 值拼接
 * @param {Object} name
 */
function getCheckBoxVal(name) {
	var checkVal = [];
	var a = document.getElementsByName(name);
	for(var i = 0; i < a.length; i++) {
		if(a[i].checked) {
			checkVal.push(a[i].value);
		}
	}
	return checkVal.join(",");
}

/**
 * 多图地址拼接
 * @param {Object} name 元素id
 */
function getSrcVal(name) {
	var element = $("#" + name);
	var srcVal = [];
	for(var i = 0; i < element.length; i++) {
		var eq = element.eq(i).attr("src");
		if(eq != "") {
			srcVal.push(imgUrlRep(eq));
		}
	}
	return srcVal.toString();
}

/**
 * 图片路径截取
 * @param {Object} urlStr 图片路径
 */
function imgUrlRep(urlStr) {
	if(!isUndefinedAndEmpty(urlStr)&&urlStr.indexOf("../")==-1) {
		return urlStr.substring(urlStr.indexOf('/Tile'), urlStr.length);
	}
}
/**
 * 多选勾选赋值
 * 
 */
function checkBoxBtn(elementId, inpId, className) {
	var obj = $("#" + elementId);
	var inpObj = $("#" + inpId);
	if(obj.hasClass(className)) {
		obj.removeClass(className)
		inpObj.prop("checked", false);
	} else {
		obj.addClass(className);
		inpObj.prop("checked", true);
	}
}

//mui(".img01").on('tap', '#idcardOb', function() {
//	getImage(setImgOb);
//});
//mui(".img01").on('tap', '#idcardRe', function() {
//	getImage(setImgRe);
//});

function setImgOb(jsonObj) {
	$(".obverse").attr("src", path_url_img + jsonObj.data);
}

function setImgRe(jsonObj) {
	$(".reserver").attr("src", path_url_img + jsonObj.data);
}

function setLicense(jsonObj) {
	$("#shop_img3").attr("src", path_url_img + jsonObj.data);
}

function showImg1(jsonObj) {
	$("#showImg1").attr("src", path_url_img + jsonObj.data);
}

function showImg2(jsonObj) {
	$("#showImg2").attr("src", path_url_img + jsonObj.data);
}

function showImg3(jsonObj) {
	$("#showImg3").attr("src", path_url_img + jsonObj.data);
}

function showImg4(jsonObj) {
	$("#showImg4").attr("src", path_url_img + jsonObj.data);
}

function showImg5(jsonObj) {
	$("#showImg5").attr("src", path_url_img + jsonObj.data);
}

function warehouseImg1(jsonObj) {
	$("#warehouseImg1").attr("src", path_url_img + jsonObj.data);
}

function warehouseImg2(jsonObj) {
	$("#warehouseImg2").attr("src", path_url_img + jsonObj.data);
}

function warehouseImg3(jsonObj) {
	$("#warehouseImg3").attr("src", path_url_img + jsonObj.data);
}

function warehouseImg4(jsonObj) {
	$("#warehouseImg4").attr("src", path_url_img + jsonObj.data);
}

function warehouseImg5(jsonObj) {
	$("#warehouseImg5").attr("src", path_url_img + jsonObj.data);
}

function factoryImg1(jsonObj) {
	$("#factoryImg1").attr("src", path_url_img + jsonObj.data);
}

function factoryImg2(jsonObj) {
	$("#factoryImg2").attr("src", path_url_img + jsonObj.data);
}

function factoryImg3(jsonObj) {
	$("#factoryImg3").attr("src", path_url_img + jsonObj.data);
}

function factoryImg4(jsonObj) {
	$("#factoryImg4").attr("src", path_url_img + jsonObj.data);
}

function factoryImg5(jsonObj) {
	$("#factoryImg5").attr("src", path_url_img + jsonObj.data);
}

function setLogo(jsonObj) {
	$("#shop_logo").attr("src", path_url_img + jsonObj.data);
}

function submitBtn() {
	var shop_name = $("#shopName").val();
	var shop_add = $("#shop_add").val();
	var shop_logo = $(".obverse").attr("src");
	var shop_range = getCheckBoxVal("shop_range"); //经营范围
	var shop_range_other = $("#shop_range_other").val();
	var shop_subject = getCheckBoxVal("shop_subject"); //经营主体
	var shop_subject_other = $("#shop_subject_other").val();
	var shop_logo = $("#shop_logo").attr("src");
	var shop_profile = $(".yaoqiu").val();
	var shop_img1 = $(".obverse").attr("src");
	var shop_img2 = $(".reserver").attr("src");
	var shop_img3 = $("#shop_img3").attr("src");
	var show_img = getSrcVal("show_img img");
	var shop_show_add = $("#shop_show_add").val();
	var warehouse_img = getSrcVal("warehouse_img img");
	
	var warehouse_add = '';
	for(var i = 0 ; i<jQuery('.ckAddress input').length;i++){
		
		if(jQuery('.ckAddress input').length==1){
			warehouse_add = jQuery('.ckAddress input').val();
		} else{
			
			if(jQuery.trim(jQuery('.ckAddress input').eq(i).val())==''){
				continue;
			}
			
			if(i==0){
				warehouse_add =  jQuery('.ckAddress input').eq(i).val();
			} else{
				warehouse_add = warehouse_add + ',' + jQuery('.ckAddress input').eq(i).val();
			}
		}
	}
	
	var factory_img = getSrcVal("factory_img img");
	var factory_add = $("#factory_add").val();
	var shop_service = getCheckBoxVal("shop_service");
	var shop_service_other = $("#service_other").val();
	var shop_type = $('#shop_inf').val();
	if(isUndefinedAndEmpty(shop_name)) {
		mui.toast('请输入店铺名称！');
		return;
	} else if(isUndefinedAndEmpty(shop_add)) {
		mui.toast('请输入店铺地址！');
		return;
	} else if(isUndefinedAndEmpty(shop_range)) {
		mui.toast('请选择经营范围');
		return;
	} else if(isUndefinedAndEmpty(shop_subject)) {
		mui.toast('请选择经营主体！');
		return;
	} else if(isUndefinedAndEmpty(shop_logo)) {
		mui.toast('请上传店铺logo');
		return;
	} else if(isUndefinedAndEmpty(shop_img1)) {
		mui.toast('请上传身份证正面');
		return;
	} else if(isUndefinedAndEmpty(shop_img2)) {
		mui.toast('请上传身份证反面');
		return;
	} else if(isUndefinedAndEmpty(shop_img3)) {
		mui.toast('请上传营业执照照片');
		return;
	}
	var json = {
		"user_id": getUserLocalData().user_id,
		"shop_name": shop_name,
		"shop_add": shop_add,
		"shop_logo": imgUrlRep(shop_logo),
		"shop_range": shop_range,
		"shop_range_other": shop_range_other,
		"shop_subject": shop_subject,
		"shop_subject_other": shop_subject_other,
		"shop_profile": shop_profile,
		"shop_img1": imgUrlRep(shop_img1),
		"shop_img2": imgUrlRep(shop_img2),
		"shop_img3": imgUrlRep(shop_img3),
		"shop_show_img": show_img,
		"shop_show_add": shop_show_add,
		"shop_warehouse_img": warehouse_img,
		"shop_warehouse_add": warehouse_add,
		"shop_factory_img": factory_img,
		"shop_factory_add": factory_add,
		"shop_service": shop_service,
		"shop_service_other": shop_service_other,
		"shop_type": shop_type
	}
	var jsonAjax = {
		"url": "set_up_shop.do",
		"jsonData": json,
		"methodName": "setUpShop_back",
	}
	getAjaxData(jsonAjax);
}

function setUpShop_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	if(jsonInfo.code == "success") {
		mui.toast("申请成功！");
		mui.back();
	} else {
		mui.toast(jsonInfo.info)
	}
}

/******************************************以下是修改的********************************************************/

$(function() {
	var json = {
		"user_id": getUserLocalData().user_id
	}
	var jsonAjax = {
		"url": "app_shop_getMyShop.do",
		"jsonData": json,
		"methodName": "getShopById_back"
	}
	getAjaxData(jsonAjax);
})

function getShopById_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	shop_id = data.shop_id;
	$("#shopName").val(data.shop_name);
	$("#shop_add").val(data.shop_add);
	$(".yaoqiu").val(data.shop_profile);
	if (!isUndefinedAndEmpty(data.shop_logo)) {
		$("#shop_logo").attr("src", path_url_img + data.shop_logo);
	} 
	
	if (!isUndefinedAndEmpty(data.shop_img1)) {
		$(".obverse").attr("src", path_url_img + data.shop_img1);
	} 
	if (!isUndefinedAndEmpty(data.shop_img2)) {
		$(".reserver").attr("src", path_url_img + data.shop_img2);
	} 
	if (!isUndefinedAndEmpty(data.shop_img3)) {
		$("#shop_img3").attr("src", path_url_img + data.shop_img3);
	} 
	
	
	//加载展示厅图片
	$("#shop_show_add").val(data.shop_show_add);
	var shop_show_imgs = strToJson(data.shop_show_img);
	if(!isUndefinedAndEmpty(shop_show_imgs)) {
		var showImgNum = 0;
		for(var k in shop_show_imgs) {
			$("#showImg" + k).attr("src", path_url_img + shop_show_imgs[k]);
			showImgNum++;
		}
		if(showImgNum > 4) {
			$('.left').css('display', 'inline-block');
		}
	}
	//加载仓库图片
	var shop_warehouse_imgs = strToJson(data.shop_warehouse_img);
	if(!isUndefinedAndEmpty(shop_warehouse_imgs)) {
		var showImgNum = 0;
		for(var k in shop_warehouse_imgs) {
			$("#warehouseImg" + k).attr("src", path_url_img + shop_warehouse_imgs[k]);
			showImgNum++;
		}
		if(showImgNum > 4) {
			$('.cangku').css('display', 'inline-block')
		}
	}
	//加载仓库地址
	
	var ckAddress = data.shop_warehouse_add.split(',');
	
	for(var i = 0;i<ckAddress.length;i++){
		jQuery('.ckAddress').prepend('<input class="fuwumingcheng width90" type="text"  id="warehouse_add" placeholder="填写仓库详细地址" value="'+ ckAddress[i] +'" style="font-size: 1rem;"/>');
	}
	//加载工厂图片
	var shop_factory_imgs = strToJson(data.shop_factory_img);
	if(!isUndefinedAndEmpty(shop_factory_imgs)) {
		var showImgNum = 0;
		for(var k in shop_factory_imgs) {
			$("#factoryImg" + k).attr("src", path_url_img + shop_factory_imgs[k]);
			showImgNum++;
		}
		if(showImgNum > 4) {
			$('.gongchang').css('display', 'inline-block')
		}
	}
	//加载工厂地址
	$("#factory_add").val(data.shop_factory_add);

	//加载默认选中范围
	if(!isUndefinedAndEmpty(data.shop_range)) {
		if(data.shop_range.indexOf("瓷砖") != -1) {
			$("#checkbox1").attr('checked', 'true');
		}
		if(data.shop_range.indexOf("物流") != -1) {
			$("#checkbox2").attr('checked', 'true');
		}
		if(data.shop_range.indexOf("加工厂") != -1) {
			$("#checkbox4").attr('checked', 'true');
		}
		if(data.shop_range.indexOf("广告公司") != -1) {
			$("#checkbox3").attr('checked', 'true');
		}
		//		var shop_ranges = strToJson(data.shop_range);
		//		var StringRanges="";
		//		for(var k in shop_ranges) {
		//			StringRanges=shop_ranges[k]+','+StringRanges
		//		}
		//		StringRanges.replace(/广告公司/," ");
	}
	//加载默认选中的经营主体
	if(!isUndefinedAndEmpty(data.shop_subject)) {
		if(data.shop_subject.indexOf("个人") != -1) {
			$("#checkbox5").attr('checked', 'true');
		}
		if(data.shop_subject.indexOf("商铺") != -1) {
			$("#checkbox6").attr('checked', 'true');
		}
		if(data.shop_subject.indexOf("品牌") != -1) {
			$("#checkbox7").attr('checked', 'true');
		}
		if(data.shop_subject.indexOf("企业") != -1) {
			$("#checkbox8").attr('checked', 'true');
		}
		if(data.shop_subject.indexOf("展厅") != -1) {
			$("#checkbox9").attr('checked', 'true');
		}
		if(data.shop_subject.indexOf("工厂") != -1) {
			$("#checkbox10").attr('checked', 'true');
		}
		if(data.shop_subject.indexOf("仓库") != -1) {
			$("#checkbox11").attr('checked', 'true');
		}

	}
	//加载默认选中的服务
	if(!isUndefinedAndEmpty(data.shop_service)) {
		var services = new Array();
		services = data.shop_service.split(",");
		//for(var k in services) {
		if(data.shop_service.indexOf("代加工") != -1) {
			$("#shop_service_1").addClass("service_button_bkg");
		}
		if(data.shop_service.indexOf("代设计") != -1) {
			$("#shop_service_2").addClass("service_button_bkg");
		}
		if(data.shop_service.indexOf("免费打版") != -1) {
			$("#shop_service_3").addClass("service_button_bkg");
		}
	}

}