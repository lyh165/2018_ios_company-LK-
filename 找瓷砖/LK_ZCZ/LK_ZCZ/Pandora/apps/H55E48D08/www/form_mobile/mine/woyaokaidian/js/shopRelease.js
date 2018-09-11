mui.plusReady(function(){
	var self=plus.webview.currentWebview();
	$('#shopType').val(self.flag);
});
mui("body").on('tap','.fabuwuliu',function(){//物流
	var type = $('#shopType').val();
	if(type!="1"){
		mui.openWindow({
			url : "chuangjianwuliu.html",
			id : "chuangjianwuliu",
			waiting : {
				autoShow : false
			}
		})
	}else{mui.toast("请申请物流店");}
});
mui("body").on('tap','.fabucizhuan',function(){//瓷砖
	var type = $('#shopType').val();
	if(type!="2"){
		mui.openWindow({
			url : "woyaofabucizhuan.html",
			id : "woyaofabucizhuan",
			waiting : {
				autoShow : false
			}
		})
	}else{mui.toast("请申请店铺");}
});
mui("body").on('tap','.fabuzhaopin',function(){//招聘
	var type = $('#shopType').val();
	if(type!="2"){
		mui.openWindow({
			url : "woyaofabuzhaopin.html",
			id : "woyaofabuzhaopin",
			waiting : {
				autoShow : false
			}
		})
	}else{mui.toast("请申请店铺");}
});
mui("body").on('tap','.fabufuwu',function(){//服务
	var type = $('#shopType').val();
	if(type!="2"){
		mui.openWindow({
			url : "woyaofabufuwu.html",
			id : "woyaofabufuwu",
			waiting : {
				autoShow : false
			}
		})
	}else{mui.toast("请申请店铺");}
});
mui("body").on('tap','.fabuzhaopin2',function(){//加工厂
	var type = $('#shopType').val();
	if(type!="2"){
		mui.openWindow({
			url : "userProcess.html",
			id : "woyaofabucizhuan",
			waiting : {
				autoShow : false
			}
		})
	}else{mui.toast("请申请店铺");}
});