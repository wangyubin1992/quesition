var url = window.location.href
var loc = url.substring(0,url.indexOf('/xiaomu'))
var javaApis=''
if(loc == ''){
	/*javaApis = 'http://192.168.89.199:8080'*/
	javaApis = 'http://testwx.xnsudai.com'	
}else if(loc == 'http://testgjh5.xnsudai.com'){
	javaApis = 'http://testwx.xnsudai.com'		
}else{
	javaApis = 'http://wx.xnsudai.com'
}
const javaApi = javaApis

module.exports = javaApi
