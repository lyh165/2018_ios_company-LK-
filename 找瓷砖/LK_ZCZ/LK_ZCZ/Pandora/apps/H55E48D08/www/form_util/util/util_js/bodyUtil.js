/***********body操作JS 李飞  2016年4月3日 23:59:22 *************/

/***********************其他JS操作*****************************/
/**
 * 得到当前目录
 * @return root
 */
function getRoot() {
	return $('#root').val();
}

/***********************checkbox公用操作*****************************/
/**
 * 根据IDS将对应的checkbox选中
 * @param ids 已选中的checkbox的ID集合
 */
function checkboxChecked(ids){
	if(isUndefinedAndEmpty(ids)){
		return ;
	}
	var idArray = ids.split(",");
	for (var i in idArray) {
		$("#checkbox"+idArray[i]).attr("checked",true);
	}
}

/***********************获得浏览器高度和宽度*****************************/
/**
 * 得到当前浏览器的可视化高度 不包含滚动条一下的高度
 * @return 高度
 */
function getBodyHeight(){  
    if(window.innerHeight!= undefined){  
        return window.innerHeight;  
    }  
    else{  
        var B= document.body, D= document.documentElement;  
        return Math.min(D.clientHeight, B.clientHeight);  
    }  
}

/**
 * 选择与全部选 
 * @param obj
 * @param checkboxName
 */
function selectAll(obj,checkboxName){
	var fal = obj.checked ;
	if(fal){
		$('.chooseF').addClass('chooseT');
		$('.chooseF').removeClass('chooseF');
	}else{
		$('.chooseT').addClass('chooseF');
		$('.chooseT').removeClass('chooseT');	
	}
	$('input[name=' + checkboxName + ']').each(function(){
		if(isUndefinedAndEmpty($(this).attr('disabled'))){
			//如果使用attr("checked",fal) 第一次正常  第二次就不顶用了
			$(this).prop("checked",fal);
		}
	});
}

/**
 * 得到所有选中的checkbox值 返回一个由id组成的字符串
 * 
 * @param checkboxName
 *            checkbox
 * @return str
 */
function getCheckboxVal(checkboxName) {
	var chk_values = null;
	$('input[name=' + checkboxName + ']:checked').each(function() {
		var val = $(this).val();
		if (val != "" && val != null) {
			if(null==chk_values){
				chk_values = val+",";
			}else{
				chk_values += val+",";
			}
		}
	});
	return chk_values;
}


