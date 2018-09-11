mui.plusReady(function() {
	getNotice1();
});
document.getElementById('getNotice2').addEventListener('tap', function() {
	goToScanIDCardByIdPusherByList(getUserLocalData().user_id,getUserLocalData().im_token);
})
function getNotice1() {
	var json = {
		"notice_type": "1",
		"user_id":getUserLocalData().user_id
	}
	var jsonAjax = {
		"url": "app_getNoticeByUserId.do",
		"jsonData": json,
		"methodName": "getNotice1_back",
	}
	getAjaxData(jsonAjax);
}

function getNotice1_back(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var content = '<div style="height: 56px;background: #F0F0F0;"></div>';
	if(data.length == 0) {
		content += '<div class="shopping_cart"><img src="../../util/img/xiaoxi.png" style="width: 3.5rem;"/></div>';
		content += '<div class="text4"><span class="text_4">暂无消息哦</span></div>';
	} else {
		$.each(data, function(e, obj) {
			content += '<div class="text-01"><span>' + obj.gxsj + '</span></div><div class="activity" onclick=openActivity("' + obj.activity_id + '")>';
			content += '<span class="img"><img src="' + path_url_img + obj.activity_logo + '" style="width: 21.18rem; height:8.75rem; margin-top: 0.625rem;"/></span>';
			content += '<span class="text2">' + obj.activity_title + '</span>';
			content += '<span class="text3">查看详情</span><span class="right"><img src="../../util/img/jiantou.png" style="width: 0.53rem;position: absolute;bottom: 1.8rem;right: 0.5rem;"/></span></div>';
		});
	}
	$("#notice").html(content);
}
/*消息*/
function showChatList_back(jsonObj){
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var content = '';
	if(data.length == 0) {
		content += '<div class="shopping_cart"><img src="../../util/img/xiaoxi.png" style="width: 3.5rem;"/></div>';
		content += '<div class="text4"><span class="text_4">暂无消息哦</span></div>';
	} else {
		$.each(data, function(e, obj) {
			var time = new Date(strToInt(obj.gxsj));
			content += '<div class="shop_kefu" onclick=openChat("'+obj.id+'","'+obj.name+'")>';
			content += '<img src="'+path_url_img+obj.img+'" style="width: 3rem;" />';
			content += '<span class="text_2">'+obj.name+'</span>';
			if(obj.type=="1"){
				content += '<span class="text_3 dianpu">店铺</span>';
			}
			content += '<span class="text_4">'+obj.lastText+'</span>';
			content += '<span class="text_5">' + time.getHours() + ':' + time.getMinutes() + '</span>';
			content += '</div>';
		});
	}
	$("#notice2").html(content);
}

function openChat(toid,toname){
	var param={
		"id":getUserLocalData().user_id,
		"token":getUserLocalData().im_token,
		"toid":toid,
		"toname":toname
	}
	gotoIm(param);
}

function openActivity(activity_id) {
	mui.openWindow({
		url: 'wodexiaoxi_detail.html',
		id: 'wodexiaoxi_detail',
		extras: { //这是要传的数据
			"activity_id": activity_id,
		},
	});
}

function openShop(id) {
	mui.openWindow({
		url: '../../index/wodedianpu/wodedianpu_xiangqing.html',
		id: 'wodedianpu_xiangqing',
		extras: { //这是要传的数据
			"shop_id": id,
		},
	});
}