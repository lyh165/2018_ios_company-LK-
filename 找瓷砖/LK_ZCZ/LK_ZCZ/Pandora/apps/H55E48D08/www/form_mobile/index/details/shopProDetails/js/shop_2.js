mui.init();
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	getShopProEvaluationAll(self.product_id, "n");
});

function initData() {
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		getShopProEvaluationAll(self.product_id, "n");
	});
}

//获取商品评价
function getShopProEvaluationAll(product_id, isIndex) {
	var json = {
		"product_id": product_id,
		"isIndex": isIndex
	}
	var jsonAjax = {
		"url": "app_shop_evaluation_index.do",
		"jsonData": json,
		"methodName": "getShopProEvaluationAllResutl",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getShopProEvaluationAllResutl(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	$("#UserEvaluation").html("");
	var count = 0;
	$.each(data, function(e, obj) {
		//截取时间
		var date = obj.lrsj;
		var timearr = date.replace(" ", ":").replace(/\:/g, "-").split("-");
		for(i = 0; i < timearr.length; i++) {
			date = timearr[i] + "-" + timearr[i + 1] + "-" + timearr[i + 2];
			break;
		}
		//截取图片
		var counts = "";
		if(!isUndefinedAndEmpty(obj.product_comment_img)) {
			var ss = strToJson(obj.product_comment_img);
			for(var k in ss) {
				counts += '<span><img src="' + path_url_img + ss[k] + '" style="width: 5.21rem; height:5.21rem" /> </span>';
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

document.getElementById('fenxiang').addEventListener('tap', function() {
	plus.nativeUI.showWaiting();
	setInterval("plus.nativeUI.closeWaiting();",1000);
	updateSerivces();
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