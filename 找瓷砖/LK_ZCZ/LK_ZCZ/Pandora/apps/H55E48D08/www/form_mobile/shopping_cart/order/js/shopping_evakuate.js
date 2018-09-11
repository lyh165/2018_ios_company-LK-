//var mainImage = document.getElementById("user_img");
//document.getElementById('user_img').addEventListener('tap', function() {
//	if(mui.os.plus) {
//		var a = [{
//			title: "拍照"
//		}, {
//			title: "从相册选取图片"
//		}];
//		plus.nativeUI.actionSheet({
//			title: "上传头像",
//			cancel: "取消",
//			buttons: a
//		}, function(b) { /*actionSheet 按钮点击事件*/
//			switch(b.index) {
//				case 0:
//					break;
//				case 1:
//					//	 			 
//					getImage('updateImg');
//					break;
//				case 2:
//					galleryImg('updateImg');
//					//					 
//					break;
//				default:
//					break;
//			}
//		})
//	}
//}, false);
//var imgs = [];
//function updateImg(jsonObj) {
//	var data = jsonObj.data;
//	var img = "/CleanOA_Web/" + data;
//	imgs.push(img);
//	reFreshImg();
//	console.log(jsonToStr(imgs));
//}