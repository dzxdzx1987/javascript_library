fn_CheckDate_search = function(objname,objname2)  {

	var stateDate = $(objname).attr("value");
	var endDate = $(objname2).attr("value");
	
	if(stateDate > endDate){
		alert("시작일보다 종료일이 이전입니다. 조회기간을 확인해주세요.");
		return false;
	}else{
		return true;
	}
}

blankcheckboxCheck = function(objname, cnt, msg) {
    try {
        if (cnt<=0) {
            alert(msg);
            $(objname).focus();
            return false;
        } else {
            return true;
        }
    } catch (e) { alert(e); }
};

fn_limitCheck = function(objname,objname2)  {

	var min = $(objname).attr("value");
	var max = $(objname2).attr("value");
	
	if(min > max){
		alert("최대 갯수보다 최소 갯수가 많습니다. 설정을 다시 확인 해 주세요.");
		return false;
	}else{
		return true;
	}
}

blankCheck = function(objname, formname, msg) {
    try {
        var str = $(objname, formname).attr("value");
        str = $.trim(str);

        if( str =="") {
            $(objname, formname).focus();
            alert(msg);
            return false;
        } else {
            return true;
        }
    } catch (e) { alert(e); }
};

isEmptyCheck = function(object,msg){
	try{
		var str = $(object).attr("value");
		str = $.trim(str);
		if(str == ''){
			if(msg != null && '' != msg){
				alert(msg);
			};
			$(object).focus();
			return false;
		}else{
			return true;
		}
	}catch (e) {
		alert(e);
	}	
}

/*정규식을 이용 id검사(관리자) */
adm_CheckId= function (objname)  {
	try	{		
		var reg_exp =  /^[a-z0-9_]{3,15}$/;
		
		var id = $(objname).attr("value");
		id = $.trim(id);
		
		var match = reg_exp.test(id);
		
		if(!isEmptyCheck(objname,"아이디를 입력해주세요")){return false;};	
		if(!fn_StrLenChk(objname, 15, 3,"아이디는 3자리 이상 15자리 미만으로 입력해 주세요.")) {
			return false;
		}
		if(!match){
			alert("아이디는 영문소문자와 숫자만 가능합니다.");
			return false;
		}
		return true;
	} catch (e) { alert(e);	}

}

/*입력길이 체크 
 * function(objname, max, min ) 
 * @objname form객체 Element id
 * @formname form객체 id
 * @max 최대 입력 허용 값 
 * @min 최소 허용값
 * */
fn_StrLenChk = function (objname, max, min, msg) {
	var val = $(objname).attr("value");
	var val_len = 0;

	val_len = fn_inputLen(val);
	
	if(val_len == 0) {
		if(msg != null){alert(msg);}
		return false;	
	}
	/*최대 길이  체크*/
	if(min == null && min == 0) {
		if(val_len>max) {if(msg != null || "" != msg){alert(msg);} return false;}
	}
	/*최소 길이  체크*/
	if(max == null && max == 0) {
		if(val_len<min) {if(msg != null || "" != msg){alert(msg);} return false;}
	}
	/*최대, 최소 길이  체크*/
	if(max > min) {
		if(val_len < min || val_len > max) {if(msg != null || "" != msg){alert(msg);} return false;}
	}else
	{
		return false;
	}
	
	return true;
}

/*
 * 유니코드 문자열 length 길이 체크
 * val - 객체의 value 값
 */
fn_inputLen = function(val) {
	// 입력받은 문자열을 escape() 를 이용하여 변환한다.
	// 변환한 문자열 중 유니코드(한글 등)는 공통적으로 %uxxxx로 변환된다.
	var temp_estr = escape(val);
	var s_index = 0;
	var e_index = 0;
	var temp_str = "";
	var cnt = 0;
	// 문자열 중에서 유니코드를 찾아 제거하면서 갯수를 센다.
	while ((e_index = temp_estr.indexOf("%u", s_index)) >= 0) // 제거할 문자열이 존재한다면
	{
		temp_str += temp_estr.substring(s_index, e_index);
		s_index = e_index + 6;cnt ++;
	}
	temp_str += temp_estr.substring(s_index);
	temp_str = unescape(temp_str); // 원래 문자열로 바꾼다.
	
	// 유니코드는 2바이트 씩 계산하고 나머지는 1바이트씩 계산한다.
	return ((cnt * 2) + temp_str.length) + "";
}


checkValue = function(object, type, msg) {  
	var regExp1 = /[ㄱ-힣]+/g;			//한글
	var regExp2 = /[A-Z]+/g;			//영어 대문자
	var regExp3 = /^[\d\.]+$/;				//숫자로만 된 조합 소숫점 포함
	var regExp4 = /\s/;					//공백
	var regExp5 = /[a-zA-Z]+/g;			//영어 대소문자
	var regExp6 = /[~!@\#$%^&*\()\=+|\\/:;?"<>']/gi; //특수문자
	var regExp7 = /^([a-zA-Z0-9])/;	//비밀번호 패턴
	var regExp8 = /^[0-9]{2,5}-[0-9]{3,5}-[0-9]{5}$/;	//전화번호 패턴
    var regExp9 = /^[0-9]{5}-[0-9]{3,5}-[0-9]{5}$/; 	//핸드폰 번호 패턴
    var regExp10 = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;	//이메일 패턴
    var regExp11 = /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/;	//사업자 번호 패턴
	var regExp12 =  /^[_a-zA-Z0-9-\.]+/g;	//영문+숫자 패턴
	
	var str = $(object).attr("value");
	var rtn = false;

	if(type=="1" || type=="ALL") {	// 한글만 체크
		if (regExp1.test(str)) { rtn = true; }
	}

	if(type=="2" || type=="ALL") {	// 영어 대문자 체크
		if (regExp2.test(str)) { rtn = true; }
	}

	if(type=="3" || type=="ALL") {	// 숫자만 체크
		if (regExp3.test(str)) { rtn = true; }
	}

	if(type=="4" || type=="ALL") {	// 공백만 체크
		if (!regExp4.test(str)) { rtn = true; }
	}

	if(type=="5" || type=="ALL") {	// 영어 대소문자만 체크
		if (regExp5.test(str)) { rtn = true; }
	}

	if(type=="6" || type=="ALL") {	// 특수문자만 체크
		if (!regExp6.test(str)) { rtn = true; }
	}

	if(type=="7" || type=="ALL") {	// 비밀번호 패턴 체크
		if (regExp7.test(str)) { rtn = true; }
	}

	if(type=="8" || type=="ALL") {	// 전화번호 패턴 체크
		if (regExp8.test(str)) { rtn = true; }
	}

	if(type=="9" || type=="ALL") {	// 핸드폰번호 패턴 체크
		if (regExp9.test(str)) { rtn = true; }
	}

	if(type=="10" || type=="ALL") {	// 이메일패턴 체크
		if (regExp10.test(str)) { rtn = true; }
	}
	
	if(type=="11" || type=="ALL") {	// 이메일패턴 체크
		if (regExp11.test(str)) { rtn = true; }
	}
	
	if(type=="12" || type=="ALL") {	// 영문/숫자패턴 체크
		if (regExp12.test(str)) { rtn = true; }
	}

	if(!rtn) {
		if(msg != "" && msg != null) {  alert(msg); }
		$(object).focus();
		return false;
	} else {
		return true;
	}
}


