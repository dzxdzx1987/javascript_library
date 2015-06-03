
$(document).ready(function(){

	/* close 버튼 기능  */
	$('#close').click(function(){
		if ( $('#visual_img').css('display')=='none'){
			 $('#visual_img').show();
			 
			 $('#page_info').removeClass('page_info_hide');
			 $('#page_info').addClass('page_info');

			 $('#title').removeClass('title_hide');
			 $('#title').addClass('title');

			 $('#close_wrap').removeClass('close_wrap_hide');
			 $('#close_wrap').addClass('close_wrap');
			 
			 
		}else{
			 $('#visual_img').hide();

			 $('#page_info').removeClass('page_info');
			 $('#page_info').addClass('page_info_hide');
			 
			 $('#title').removeClass('title');
			 $('#title').addClass('title_hide');
			 
			 $('#close_wrap').removeClass('close_wrap');
			 $('#close_wrap').addClass('close_wrap_hide');
			 
		};
    });
    
});

// get -> post
function post_to_url(path, params, method) {
	method = method || "post"; // Set method to post by default, if not
								// specified.
	// The rest of this code assumes you are not using a library.
	// It can be made less wordy if you use one.
	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);
	for ( var key in params) {
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", key);
		hiddenField.setAttribute("value", params[key]);
		form.appendChild(hiddenField);
	}
	document.body.appendChild(form);
	form.submit();
}

// 화폐 format() 함수 추가
Number.prototype.format = function() {
	if (this == 0)
		return 0;
	var reg = /(^[+-]?\d+)(\d{3})/;
	var n = (this + '');
	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');
	return n;
};

// 공통 팝업
function commonPopUp(width, height, url) {
	var cw = screen.availWidth; // 화면 넓이
	var ch = screen.availHeight; // 화면 높이
	// 화면보다 창 크기가 클경우 화면 사이즈 보다 50작게 지정
	if (width > cw)
		width = cw - 50;
	if (height > ch)
		height = ch - 50;
	var ml = (cw - width) / 2; // 가운데 띄우기위한 창의 x위치
	var mt = (ch - height) / 2; // 가운데 띄우기위한 창의 y위치
	var popOption = '';
	popOption += "width=" + width;
	popOption += ", height=" + height;
	popOption += ", top=" + mt;
	popOption += ", left=" + ml;
	popOption += ", toolbar=no";
	popOption += ", location=no ";
	popOption += ", directories=no";
	popOption += ", status=no";
	popOption += ", menubar=no";
	popOption += ", scrollbars=yes";
	popOption += ", resizable=no";
	window.open(url, "", popOption);
}

// 팝업창 닫기
function closePopup() {
	window.close();
}

/**
 * 화면 새로고침
 */
function reLoad() {
	window.location.reload();
}

// value check
function checkValue(param, message) {
	if (param == '') {
		alert(message);
	} else {
		return param;
	}
}
