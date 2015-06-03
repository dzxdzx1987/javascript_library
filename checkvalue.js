function isLessLength(obj, len) {
	return !(obj.val().length < len);
}
/*
function isMoreLength(obj, len) {
	return !(obj.val().length > len);
}
*/
function isGreater(obj, num) {
	return obj.val() > num;
}

function isLessness(obj, num){
	return obj.val() < num;
}

function isEqual(obj,val) {
	return obj.val() == val;
}

function isNotEqual(obj,val) {
	return obj.val() != val;
}

function isEmpty(obj) {
	return obj.val() != "";
}

function eqVal(obj1 , obj2){
	return obj1.val() == obj2.val();
}

function notEqVal(obj1 , obj2){
	return obj1.val() != obj2.val();
}

function isNumber(obj){
	var reg = /^\d+$/;
	return reg.test(obj.val());
}
function isNumber2(obj) {
	return !isNaN(obj.val());
}

function isEmail(obj) {
	var reg = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
	return reg.test(obj.val());
}

function isPhoneNumber(obj) {
	var reg = /^0\d{1,2}-\d{3,4}-\d{4}$/;
	return reg.test(obj.val());
}

function isAlphaAndDigit(obj) {
	var filter = /^[A-Za-z0-9+]*$/;
	if(filter.test(obj.val())) {
		return true;
	} else {
		return false;
	}
}

function isAlphaOrDigit(obj) {
	var reg = /^[A-Za-z0-9]+$/;
	return reg.test(obj.val());
}

function isCheck(obj, obj2) {
	
	/*var check = '';
	
	// 브라우저 체크
	var browser = {
		    chk : navigator.userAgent.toLowerCase()
		};
		  
	// 현재 브라우저 정보 저장하기
	browser = {
		    ie : browser.chk.indexOf('msie') != -1,
		    ie6 : browser.chk.indexOf('msie 6') != -1,
		    ie7 : browser.chk.indexOf('msie 7') != -1,
		    ie8 : browser.chk.indexOf('msie 8') != -1,
		    ie9 : browser.chk.indexOf('msie 9') != -1,
		    ie10 : browser.chk.indexOf('msie 10') != -1,
		    opera : !!window.opera,
		    safari : browser.chk.indexOf('safari') != -1,
		    safari3 : browser.chk.indexOf('applewebkir/5') != -1,
		    mac : browser.chk.indexOf('mac') != -1,
		    chrome : browser.chk.indexOf('chrome') != -1,
		    firefox : browser.chk.indexOf('firefox') != -1
		};
		  
		// 익스플로러 6, 7, 8일 때
		if ((browser.ie6) || (browser.ie7) || (browser.ie8)) {
			check = document.getElementById(obj[0].name);
		} else {
			check = document.forms[obj2[0].name].elements[obj];
		}
	
	for (var i = 1; i < check.length; i += 1) 
        if (check[i].checked == true) 
        	return true;
	return false;*/
	var check = document.forms[obj2[0].name].elements[obj];
    for (var i = 0; i < check.length; i += 1) 
        if (check[i].checked === true) 
        	return true;
        
	return false;
}

function isSelect(obj, obj2) {
	
	var select = '';
	
	// 브라우저 체크
	var browser = {
		    chk : navigator.userAgent.toLowerCase()
		};
		  
	// 현재 브라우저 정보 저장하기
	browser = {
		    ie : browser.chk.indexOf('msie') != -1,
		    ie5 : browser.chk.indexOf('msie 5') != -1,
		    ie6 : browser.chk.indexOf('msie 6') != -1,
		    ie7 : browser.chk.indexOf('msie 7') != -1,
		    ie8 : browser.chk.indexOf('msie 8') != -1,
		    ie9 : browser.chk.indexOf('msie 9') != -1,
		    ie10 : browser.chk.indexOf('msie 10') != -1,
		    opera : !!window.opera,
		    safari : browser.chk.indexOf('safari') != -1,
		    safari3 : browser.chk.indexOf('applewebkir/5') != -1,
		    mac : browser.chk.indexOf('mac') != -1,
		    chrome : browser.chk.indexOf('chrome') != -1,
		    firefox : browser.chk.indexOf('firefox') != -1
		};
		// 익스플로러
		if ((browser.ie5) || (browser.ie6) || (browser.ie7) || (browser.ie8)) {
			select = document.getElementById(obj[0].name);
		} else {
			select = document.forms[obj2[0].name].elements[obj];
		}
	for (var i = 1; i < select.length; i += 1) {
		if (select[i].selected == true)  
			return true;
	}
	return false;
}

//function isDonate(obj, obj2) {
//	
//	alert(obj);
//	alert(obj2);
//	var check = document.forms[obj2[0].name].elements['donateChk'];
//    if (check[0].checked == true)  
//    	if(document.forms[obj2[0].name].elements[obj].value == "")
//    		return false;
//
//    return true;
//}

function isWrite(obj, obj2) {
	if(document.forms[obj2[0].name].elements[obj].value == "")
		return false;

    return true;
}

function validateForm(rule,message) {
	var rule_line = rule.split("@");
	
	var validate = true;
	$.each(rule_line, function(index1, line) {
		if(validate == false) {
			return false;
		}
		var element = line.split(":");
		
		var obj = $("#"+element[0]);
		var obj1 = element[0];
		var fn_list = element[1].split(",");
		var type = obj.attr("type");
		
		if(type == "TEXT" || type == "text" || type == "" || type == "undefined") {
			obj.val(jQuery.trim(obj.val()));
		}
		
		$.each(fn_list, function(index2, fn) {
			if(fn.indexOf("#") > -1) {
				var args = fn.split("#");
				var ar = args[1].split("$");
				var params = [];
				if(type == undefined)
					params.push(obj1);
				else
					params.push(obj);

				for(var i=0;i<ar.length;++i) {
					if(document.getElementById(ar[i])) {
						params.push($("#"+ar[i]));
					} else {
						params.push(ar[i]);
					}
				}

				validate = eval(args[0]).apply(null,params);
			} else {
				if(type == undefined)
					validate = eval(fn)(obj1);
				else
					validate = eval(fn)(obj);
			}
			
			if(validate == false) {
				alert(message[index1][index2]);
				obj.select();
				obj.focus();
				return false;
			}
		});
	});

	return validate;
}

function imageFileExtCheck(obj) {
	var obj = obj.val();
	var pathpoint = obj.lastIndexOf('.');
	var filepoint = obj.substring(pathpoint+1,obj.length);
	var filetype = filepoint.toLowerCase();
	if(filetype=='ZIP' || filetype=='zip') {
		return true;
	} else {
		return false;
    }
}