$(function() {
	//这里以后要换成传入user_id
	getAllGroup();

})

function getAllGroup(){
	
	var jsonAjax={
		"url":"app_getUtilBulletin.do",
		"methodName":"addAllGroup_back"
	}
	getAjaxData(jsonAjax);
	
}
function addAllGroup_back(jsonObj){
	var json=strToJson(jsonObj.data);
	var data=strToJson(json.data);
	var content='';
	if (data=='') {
		content+='<span class="content-text">没查询到相关数据</span>';
	} else{
		$.each(data, function(e,obj) {
			num++;
		content+='<div class="content_product" onclick=openGroupDetail("'+obj.bulletin_id+'") style="height: 7.2rem;">';
		content+='<span class="content-text1">'+obj.bulletin_title+'</span>';
		content+='<div class="content-img"><img src="'+path_url_img+obj.bulletin_logo+'" style="width: 7.75rem;height: 5.3rem"/></div>';
		content+='<span class="content-text2">'+obj.bulletin_num+'人浏览</span></div>';
		});
	}
	
	$("#groupList").html(content);
}	

function openGroupDetail(bulletin_id){
	mui.openWindow({
		url:"cizhuankuaibao_detail.html",
		id:"cizhuankuaibao_detail",
		extras:{
			"bulletin_id":bulletin_id
		},
		waiting:{
			autoShow:true,
		}
	});
}