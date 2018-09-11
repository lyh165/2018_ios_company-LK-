$(function() {
	getAllGroup();
})

function getAllGroup() {
	var jsonAjax = {
		"url": "app_getAllGroupList.do",
		"methodName": "addAllGroup_back"
	}
	getAjaxData(jsonAjax);
}

function addAllGroup_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '';
	if(data == '') {
		content += '<span class="content-text">没查询到相关数据</span>';
	} else {
		$.each(data, function(e, obj) {
			content += '<div class="content_product" onclick=openGroupDetail("' + obj.group_id + '") style="height: 7.2rem;">';
			content += '<span class="content-text1">' + obj.user_name + '发起团购了，快来围观啊，好货不等你哦</span>';
			content += '<div class="content-img"><img src="' + path_url_img + obj.product_logo + '" style="width: 7.75rem;height: 5.3rem"/></div>';
			content += '<span class="content-text2">' + obj.group_browse + '人浏览</span></div>';
		});
	}
	$("#groupList").html(content);
}

function openGroupDetail(groupId) {
	mui.openWindow({
		url: "tuanguoxiangqing.html",
		id: "tuanguoxiangqing",
		extras: {
			"groupId": groupId
		},
	});
}