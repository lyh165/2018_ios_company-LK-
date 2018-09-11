function skip(){
	mui.openWindow({
		url: "../index/index.html",
		id: "index"
	});
}
function start(){
	var occupation='';
	var xiaoshou = $("#xiaoshou").css("display");
	var gendan = $("#gendan").css("display");
	var zhanshi = $("#zhanshi").css("display");
	var wenan = $("#wenan").css("display");
	var cehua = $("#cehua").css("display");
	var peixun = $("#peixun").css("display");
	var pingmian = $("#pingmian").css("display");
	var xingzheng = $("#xingzheng").css("display");
	var kuaiji = $("#kuaiji").css("display");
	var chanpinkaifa = $("#chanpinkaifa").css("display");
	var daqujinli = $("#daqujinli").css("display");
	var shejizongjian = $("#shejizongjian").css("display");
	var shichangzongjian = $("#shichangzongjian").css("display");
	var xiaoshouzongjian = $("#xiaoshouzongjian").css("display");
	if(xiaoshouzongjian=='none'){
		occupation+='销售总监|';
	}
	if(shichangzongjian=='none'){
		occupation+='市场总监|';
	}
	if(shejizongjian=='none'){
		occupation+='设计总监|';
	}
	if(daqujinli=='none'){
		occupation+='大区经理|';
	}
	if(chanpinkaifa=='none'){
		occupation+='产品开发|';
	}
	if(kuaiji=='none'){
		occupation+='会计|';
	}
	if(xingzheng=='none'){
		occupation+='行政|';
	}
	if(pingmian=='none'){
		occupation+='平面|';
	}
	if(peixun=='none'){
		occupation+='培训|';
	}
	if(cehua=='none'){
		occupation+='策划|';
	}
	if(wenan=='none'){
		occupation+='文案|';
	}
	if(zhanshi=='none'){
		occupation+='展示|';
	}
	if(gendan=='none'){
		occupation+='跟单|';
	}
	if(xiaoshou=='none'){
		occupation+='销售|';
	}
	occupation=occupation.substr(0,occupation.length-1);
	var json = {
		"position_future": occupation,
		"user_id":getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_updateUserFutureProfessional.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "start_back",
	};
	getAjaxData(jsonAjax);
}
function start_back(jsonObj){
	mui.openWindow({
		url: "../index/index.html",
		id: "index"
	});
}