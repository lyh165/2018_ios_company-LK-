//获取商家招聘
function getUserShopRecruit() {
	json = {
		"shop_id": $("#shop_id").val()
	}
	var jsonAjax = {
		"url": "app_business_recruit_index.do",
		"jsonData": json,
		"methodName": "getUserShopRecruitResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getUserShopRecruitResult(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var count = "";
	$("#recruitdata").html("");
	$.each(data, function(e, obj) {
		count += '<ul id="fuwu" class="content">' +
			'<div style="display: none;">' +
			'	<input  type="text" value="' + obj.recruit_phone + '" id="recruit_phone"/>' +
			'		<input  type="text" value="' + obj.recruit_id + '" id="recruit_id"/>' +
			'</div>' +
			'	<li class="wuliu"> ' +
			'	<div onclick="openRecruitDetails(&quot;' + obj.recruit_id + '&quot;)" >' +
			'	<span class="shop shop_zhaopin"><img src="' + path_url_img + obj.recruit_logo + '"/></span>' +
			'	<div class="xiangqing">						' +
			'			<span>' + obj.shop_name + '</span>' +
			'				<span class="bianju"></span>' +
			'					<p style="font-size: 0.75REM;">' + obj.recruit_name + '</p>' +
			'					<div class="didian didian_one" style="height: 0rem;">' +
			'						<span class="jiage">' + obj.recruit_treatment + '元/月</span>' +

			'						<span class="zhuanweifu"></span>' +
			'					</div>' +
			'						<span class="shenhe" style="margin-left: 0.9rem;"></span>' +
			'				</div>' +
			'				</div>' +
			'				<div class="phone">' +
			'					<div class="dianhua psa" onclick="getPhone(&quot;' + obj.recruit_phone + '&quot;)"><img src="../../util/img/dianhua.png" style="width: 1.31rem; vertical-align: middle;"/></div>' +
			'					<div class="fengexian psa"></div>' +	
			'				</div>' +
			'			</li>' +
			'		</ul>' +
			'		<div class="gongsi">' +
			'			<span><img src="../../util/img/u13.png" style="width: 0.68rem; vertical-align: middle;"/></span>' +
			'			<span class="gongsidizhi" onclick=openAddress("' + obj.shop_add + '","' + obj.shop_name + '")>' + obj.shop_add + '</span>' +
			'			<span class="jiantou_012"><img src="../../util/img/jiantou.png"/></span>' +
			'		</div>';

	});
	$("#recruitdata").html(count);
}

//拨号
function getPhone(phone) {
	if(!isUndefinedAndEmpty(phone)) {
		window.location.href = "tel:" + phone;
	} else {
		mui.toast("暂时未开通，敬请期待")
	}
}

/**
 * 打开工作详情页面
 * @param {Object} getId
 * @param {Object} up_id
 */
function openRecruitDetails(recruit_id) {
	var page = plus.webview.getWebviewById("recruitDetails");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "../details/recruitDetails/position.html",
		"id": "position",
		extras: {
			"recruit_id": recruit_id
		}
	});
}