function skip(){
	mui.openWindow({
		url: "future_occupation.html",
		id: "future_occupation"
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
	if(xiaoshou=='none'){
		occupation='销售';
	}
	if(gendan=='none'){
		occupation='跟单';
	}
	if(zhanshi=='none'){
		occupation='展示';
	}
	if(wenan=='none'){
		occupation='文案';
	}
	if(cehua=='none'){
		occupation='策划';
	}
	if(peixun=='none'){
		occupation='培训';
	}
	if(pingmian=='none'){
		occupation='平面';
	}
	if(xingzheng=='none'){
		occupation='行政';
	}
	if(kuaiji=='none'){
		occupation='会计';
	}
	if(chanpinkaifa=='none'){
		occupation='产品开发';
	}
	if(daqujinli=='none'){
		occupation='大区经理';
	}
	if(shejizongjian=='none'){
		occupation='设计总监';
	}
	if(shichangzongjian=='none'){
		occupation='市场总监';
	}
	if(xiaoshouzongjian=='none'){
		occupation='销售总监';
	}
	var json = {
		"position_name": occupation,
		"user_id":getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_updateUserProfessional.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "start_back",
	};
	getAjaxData(jsonAjax);
}
function start_back(jsonObj){
	if(isUndefinedAndEmpty(getUserLocalData().position_future)){
		mui.openWindow({
			url: "future_occupation.html",
			id: "future_occupation"
		});
		return;
	}else{
		mui.openWindow({
			url: "../index/index.html",
			id: "index"
		});
		return;
	}
}
