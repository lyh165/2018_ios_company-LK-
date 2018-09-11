$(function() {
	getPrize();
})

function getPrize() {
	var jsonAjax = {
		"url": "app_getPrize.do",
		"methodName": "getPrize_back",
	}
	getAjaxData(jsonAjax);
}

function getPrize_back(jsonObj) {
	var jsondata = strToJson(jsonObj.data);
	var data = strToJson(jsondata.data);
	content_name = '';
	content_img = '';
	$.each(data, function(e, obj) {
		if(obj.prize_id == '1') {
			content_name += '<li class="rules_content1">连续签到7天，获赠' + obj.prize_name + '一个</li>'
			content_img += '<span><img src="' + path_url_img + obj.prize_img + '"/></span>'
		} else if(obj.prize_id == '2') {
			content_name += '<li class="rules_content1">连续签到30天，获赠' + obj.prize_name + '一个</li>'
			content_img += '<span class="selfie_stick1"><img src="' + path_url_img + obj.prize_img + '"/></span>'
		} else if(obj.prize_id == '3') {
			content_name += '<li class="rules_content1">连续签到90天，获赠' + obj.prize_name + '一个</li>'
			content_img += '<span><img src="' + path_url_img + obj.prize_img + '"/></span>'
		}
	});
	$("#prize_name").html(content_name);
	$("#prize_img").html(content_img);
	getTodaySign();
}

function getTodaySign() {
	var json = {
		"user_id": getUserLocalData().user_id,
	}
	var jsonAjax = {
		"url": "app_getUserSignToday.do",
		"jsonData": json,
		"methodName": "getTodaySign_back"
	}
	getAjaxData(jsonAjax);
}

function getTodaySign_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var signDay = data.sign_day;
	content = '';
	if(isUndefinedAndEmpty(signDay)) { //今天还没签到
		$('#qiandao').removeAttr("disabled");

	} else { //今天已签到
		$("#qiandao").html("已签到");
		$("#qiandao").attr('disabled', "true");
		var day = parseInt(signDay);
		if(day == 7) {
			content = '恭喜你！你已连续签到<span class="color">7</span>天,请等待客服发放专属奖励'
		} else if(day == 30) {
			content = '恭喜你！你已连续签到<span class="color">30</span>天,请等待客服发放专属奖励'
		} else if(day == 90) {
			content = '恭喜你！你已连续签到<span class="color">90</span>天,请等待客服发放专属奖励'
		} else if(day < 7) {
			var poor = 7 - day;
			content = '你已签到<span class="color">' + day + '</span>天,距连续签到7天<br />还有<span class="color">' + poor + '</span>天就可以等待客服领取奖励哦'
		} else if(day < 30) {
			var poor = 30 - day;
			content = '你已签到<span class="color">' + day + '</span>天,距连续签到30天<br />还有<span class="color">' + poor + '</span>天就可以等待客服领取奖励哦'
		} else if(day < 90) {
			var poor = 90 - day;
			content = '你已签到<span class="color">' + day + '</span>天,距连续签到90天<br />还有<span class="color">' + poor + '</span>天就可以等待客服领取奖励哦'
		}
		$("#qiandaDay").html(content);
		$("#bg1").css("display", "none");
		$("#dayNum").text(day);
	}
}
//签到
function sign() {
	getInitData('3', 'addSign');
}

function addSign(jsonObj) {
	var json = {
		"sign_num_7": jsonObj.init_key,
		"user_id": getUserLocalData().user_id,
	}
	var jsonAjax = {
		"url": "app_addSignTody.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "addSign_back",
	}
	getAjaxData(jsonAjax);
}

function addSign_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	$("#qiandao").html("已签到");
	$("#qiandao").attr('disabled', "true");
	var day = parseInt(data.sign_day);
	if(day == 7) {
		content = '恭喜你！你已连续签到<span class="color">7</span>天,请等待客服发放专属奖励'
	} else if(day == 30) {
		content = '恭喜你！你已连续签到<span class="color">30</span>天,请等待客服发放专属奖励'
	} else if(day == 90) {
		content = '恭喜你！你已连续签到<span class="color">90</span>天,请等待客服发放专属奖励'
	} else if(day < 7) {
		var poor = 7 - day;
		content = '你已签到<span class="color">' + day + '</span>天,距连续签到7天<br />还有<span class="color">' + poor + '</span>天就可以等待客服领取奖励哦'
	} else if(day < 30) {
		var poor = 30 - day;
		content = '你已签到<span class="color">' + day + '</span>天,距连续签到30天<br />还有<span class="color">' + poor + '</span>天就可以等待客服领取奖励哦'
	} else if(day < 90) {
		var poor = 90 - day;
		content = '你已签到<span class="color">' + day + '</span>天,距连续签到90天<br />还有<span class="color">' + poor + '</span>天就可以等待客服领取奖励哦'
	}
	$("#qiandaDay").html(content);
	$("#bg1").css("display", "block");
	$("#dayNum").text(day);
}
document.getElementById('sure').addEventListener('tap', function() {
	$("#bg1").css("display", "none");
});
