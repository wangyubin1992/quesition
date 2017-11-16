
function getSetTest(){


          var json = {
               "activity":"https://testhuodong.xnsudai.com/",              //日常活动相关   获奖轮播 | 获奖记录 .....
               "app_login_register":"https://testuser.xnsudai.com/",       //登录，注册接口
               "locationUrl":"https://testgjh5.xnsudai.com/",							//当前所有页面跳转访问域名
               "productUrl":"https://testloan.xnsudai.com/", 							//列表
               "countRootUrl":"https://testapi.xnsudai.com/"
           }  
             /* var json = {
                 "activity":"https://huodong.xnsudai.com/",
                  "app_login_register":"https://user.xnsudai.com/",
                  "locationUrl":"https://gjh5.xnsudai.com/",
          		  "productUrl":"https://loan.xnsudai.com/",
          		  "countRootUrl":"https://api.xnsudai.com/"
             }*/
    
    return json
}

    //获取url中所传过来的属性值；
    function getWinHash(index){

        var winStr = window.location.href.split("?")[1];

        if ( typeof(winStr) == "undefined" ) {

            console.log("未带参数id")
            $("#"+index+"").val("");

        }else if( hashJson(winStr)[index] == "undefined" ){

            console.log("未带参数index")
            $("#"+index+"").val("");
        }else{

            $("#"+index+"").val( hashJson(winStr)[index] );
            
        }
    }
		var other = {
			/**
			 * 获取URL后的参数
			 */
			getRequest: function() {
				var url = location.search; //获取url中"?"符后的字串   
				var theRequest = new Object();
				if(url.indexOf("?") != -1) {
					var str = url.substr(1);
					strs = str.split("&");
					for(var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					}
				}
				return theRequest;
			}
		}	
    //hash转json
    function hashJson(hash){
       
        hash = hash.substring(0);   
        var arr= hash.split('&');
        var json={};
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('='); 
            json[arr2[0]]=arr2[1];
        }
        return json;
    }

//json转hash 
function jsonHash(json){
    var arr=[];
    for(var key in json){
        arr.push(key+'='+json[key]);    
    }
    window.location.hash='#'+arr.join('&');
};
export { //很关键
  getSetTest
}