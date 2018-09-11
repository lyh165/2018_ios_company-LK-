$(function() {
	testTheLength();
})

function testTheLength(){
	alert("?");
	var s = document.getElementById("opinionText").value.length;
	var len = 200;
	if(s>len){
					alert("字数已经超过200");
	}
}