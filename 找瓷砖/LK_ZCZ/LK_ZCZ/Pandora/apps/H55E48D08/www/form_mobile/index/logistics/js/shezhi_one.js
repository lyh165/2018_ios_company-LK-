//mui初始化
mui.init({
	swipeBack: true //启用右滑关闭功能
});
main();
(function($) {
	$.init();
	var btns = $('.btn');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var _self = this;
			if(_self.picker) {
				_self.picker.show(function(rs) {
					document.getElementById("user_birthday").innerHTML = rs.text;

					var user = getUserLocalStorage();
					user.user_birthday = rs.text;
					setUserLocalStorage(jsonToStr(user));
					saveUserData();

					_self.picker.dispose();
					_self.picker = null;
				});
			} else {
				var optionsJson = this.getAttribute('data-options') || '{}';
				var options = JSON.parse(optionsJson);
				var id = this.getAttribute('id');

				_self.picker = new $.DtPicker(options);
				_self.picker.show(function(rs) {

					document.getElementById("user_birthday").innerHTML = rs.text;

					var user = getUserLocalStorage();
					user.user_birthday = rs.text;
					setUserLocalStorage(jsonToStr(user));
					saveUserData();

					_self.picker.dispose();
					_self.picker = null;
				});
			}

		}, false);
	});

})(mui);

function main() {
	initView();
}

function initView() {
//
////	if(!isUndefinedAndEmpty(getUserLocalStorage().user_name)) {
////		document.getElementById("user_name").innerHTML = getUserLocalStorage().user_name;
////	}
	if(!isUndefinedAndEmpty(getUserLocalStorage().user_phone)) {
		document.getElementById("user_phone").innerHTML = getUserLocalStorage().user_phone;
	}

	if(!isUndefinedAndEmpty(getUserLocalStorage().user_img)) {
		document.getElementById("user_img").src = pic_url + getUserLocalStorage().user_img;
	}

	if(!isUndefinedAndEmpty(getUserLocalStorage().user_sex)) {
		if(getUserLocalStorage().user_sex == 0) {
			document.getElementById("user_sex").innerHTML = "男";
		} else {
			document.getElementById("user_sex").innerHTML = "女";
		}
	}
	if(!isUndefinedAndEmpty(getUserLocalStorage().user_birthday)) {
		document.getElementById("user_birthday").innerHTML = getUserLocalStorage().user_birthday;
	}
	if(!isUndefinedAndEmpty(getUserLocalStorage().user_area)) {
		document.getElementById("user_area").innerHTML = getUserLocalStorage().user_area;
	}
}
mui.plusReady(function() {

	plus.geolocation.getCurrentPosition(geoInf, function(e) {

	}, {
		geocode: true,
		provider: 'amap'
	});

})

function geoInf(position) {

	var codns = position.coords; //获取地理坐标信息；

	var longt = codns.longitude; //获取到当前位置的经度

	var lat = codns.latitude; //获取到当前位置的纬度；

	//提醒：position.address 获取的是地址集合包括省市县街道等.如果获取不到就返回undefined

	//country国家，province省，city城市，district区（县）名称，street街道和门牌信息

	//poiNamePOI信息。如“电子//城．国际电子总部”
	//document.getElementById("city").innerHTML
	//	console.log();
	var Position_user = position.address.province + "" + position.address.city;
	var user = getUserLocalStorage();
	user.user_area = Position_user;
	setUserLocalStorage(jsonToStr(user));
	document.getElementById("user_area").innerHTML = Position_user;
	saveUserData();

}

function back() {
	mui.back();
}

function changeDelete() {
	document.getElementById("bg1").style.display ="";
}

function changname_cancel() {
	document.getElementById("bg1").style.display = "none";
}

function changename_sure() {
	document.getElementById("bg1").style.display = "none";
	document.getElementById("add").style.display = "none";
}
function changeClear() {
	document.getElementById("bg2").style.display ="";
}
function changename_sure_1() {
	document.getElementById("bg2").style.display = "none";
}
//function changeClear() {
//	document.getElementById("bg2").style.display = "none";
//}

function onClickHander(obj) {
	if(obj.checked) {
		document.getElementById("id_girl").checked = false;
	} else {
		document.getElementById("id_girl").checked = true;
	}
}

function onClickHander2(obj) {
	if(obj.checked) {
		document.getElementById("id_man").checked = false;
	} else {
		document.getElementById("id_man").checked = true;
	}
}

function changSex_sure() {

	var user = getUserLocalStorage();
	if(document.getElementById("id_man").checked) {
		user.user_sex = "0";
	} else {
		user.user_sex = "1";
	}

	setUserLocalStorage(jsonToStr(user));

	document.getElementById("bg2").style.display = "none";

	if(user.user_sex == 0) {
		document.getElementById("user_sex").innerHTML = "男";
	} else {
		document.getElementById("user_sex").innerHTML = "女";
	}
	saveUserData();

}

var mainImage = document.getElementById("user_img");
document.getElementById('user_img').addEventListener('tap', function() {
	if(mui.os.plus) {
		var a = [{
			title: "拍照"
		}, {
			title: "从相册选取图片"
		}];
		plus.nativeUI.actionSheet({
			title: "上传头像",
			cancel: "取消",
			buttons: a
		}, function(b) { /*actionSheet 按钮点击事件*/
			switch(b.index) {
				case 0:
					break;
				case 1:
					//	 			 
					getImage('updateImg');
					break;
				case 2:
					galleryImg('updateImg');
					//					 
					break;
				default:
					break;
			}
		})
	}
}, false);

var imgData = "";

function updateImg(jsonObj) {
	var user = getUserLocalStorage();
	var data = jsonObj.data;
	user.user_img = "/CleanOA_Web/" + data;
	document.getElementById("user_img").src = pic_url + user.user_img;
	setUserLocalStorage(jsonToStr(user));
	saveUserData();
}

function saveUserData() {
	var user_jsonObj = getUserLocalStorage();

	var jsonAjax = {
		"url": "app_user_information_updateData.html",
		"jsonData": user_jsonObj,
		"methodName": "app_user_information_updateData"
	};
	getAjaxData(jsonAjax);
}

/**
 * 保存信息回调
 * @param {Object} jsonObj
 */
function app_user_information_updateData(jsonObj) {
	//	console.log("保存用户信息回调"+jsonObj.data);
	var data = strToJson(jsonObj.data);
	if(data.code == "success") { //获取验证成功，开始倒计时
		//		mui.toast("修改成功");
	} else { //获取失败       显示获取验证码失败的原因
		mui.toast(data.info);
	}

}