/**
 * 邮箱验证
 * @param {Object} str
 */
export function IsEmail (str) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return reg.test(str)
}

/**
 * 手机验证
 * @param {Object} str
 */
export function isPhoneNumber (str) {
  const regAee = /^(13\d[1]{0,9}|14\d[1]{0,9}|15\d[1]{0,9}|17\d[1]{0,9}|18\d[1]{0,9})\d{8}$/
  return regAee.test(str)
}

/**
 * 身份证验证
 * @param {Object} str
 */
export function isIdCard (str) {
  var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
  return reg.test(str)
}

/**
 * 判断输入的字符是否为中文 
 */
export function IsChinese (str) {
	if(str.length != 0) {
		var reg = /^[\u0391-\uFFE5]+$/
		if(!reg.test(str)) {
			return false
		}
	}
	return true
}

/**
 * 获取URL后的参数
 */
export function getRequest () {
	var url = location.search
	var theRequest = new Object()
	if(url.indexOf("?") != -1) {
		var str = url.substr(1)
		strs = str.split("&")
		for(var i = 0; i < strs.length; i++) {
			if(theRequest[strs[i].split("=")[0]] == null) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
			}
		}
	}
	return theRequest
}

/**
 * android终端,ios终端
 */
export function secondClick () {
	var u = navigator.userAgent
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
	if(isAndroid) {
		return "android"
	} else {
		return "ios"
	}
}

/**
 * 微信端
 */
export function isWeiXin () {
	var ua = window.navigator.userAgent.toLowerCase()
	if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true
	} else {
		return false
	}
}