var firstInstall = window.localStorage.firstInstall;
if(typeof firstInstall == 'undefined'){
	chrome.tabs.create({url:"http://vip.taoqueqiao.com/help/index-5.html#77",selected:true});
	window.localStorage.firstInstall = "true";
}

if (typeof window.localStorage.keyPlugin == 'undefined') {
	window.localStorage.keyPlugin = 68;
}
if (typeof window.localStorage.keyTrend == 'undefined') {
	window.localStorage.keyTrend = 81;
}
if (typeof window.localStorage.keyTaoke == 'undefined') {
	window.localStorage.keyTaoke = 87;
}
if (typeof window.localStorage.keyQueqiao == 'undefined') {
	window.localStorage.keyQueqiao = 69;
}
if (typeof window.localStorage.keyLogin == 'undefined') {
	window.localStorage.keyLogin = 65;
}
if (typeof window.localStorage.applyReason == 'undefined') {
	window.localStorage.applyReason = '网站会员申请推广计划，望贵店通过，祝合作愉快！谢谢！';
}
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		var resOK = {
			hidden: window.localStorage.hiddenPlugin,
			reason: window.localStorage.applyReason,
			keyPlugin: window.localStorage.keyPlugin,
			keyTrend: window.localStorage.keyTrend,
			keyTaoke: window.localStorage.keyTaoke,
			keyQueqiao: window.localStorage.keyQueqiao,
			keyLogin: window.localStorage.keyLogin,
			tbname: window.localStorage.tbname,
			tbpwd: window.localStorage.tbpwd,
			version: chrome.app.getDetails().version
		};
		sendResponse(resOK);
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){//alert(request.url);
    if(request.type == 'gajax'){
        $.ajax({
            type:'GET',
            url:request.url,
            success:function(data){
                sendResponse({
                    msg: 'ok',
                    data: data
                });
            },
            error:function(){
                sendResponse({
                    msg: 'error'
                });
            }
        });
    }else if(request.type == 'ggajax'){
        $.ajax({
            type:'GET',
            url:request.url,
            success:function(data){
                sendResponse({
                    msg: 'ok',
                    data: data
                });
            },
            error:function(data){
                sendResponse({
                    msg: 'ok',
                    data: data.responseText
                });
            }
        });
    }else if(request.type == 'pajax'){
		var data={
            type:'POST',
            url:request.url,
            data:request.postdata,
			dataType: "json",
            success:function(data){
                sendResponse({
                    msg: 'ok',
                    data: data
                });
            },
            error:function(){
                sendResponse({
                    msg: 'error'
                });
            }
        };
		if(typeof request.headers!='undefined'){
			data.headers=request.headers;
		}
        $.ajax(data);
    }else if(request.type == 'cookie'){
		if(typeof request.name=='undefined' || request.name==''){
			chrome.cookies.getAll({
				url: request.url
			},function(cookies){
				if (cookies != null) {
					sendResponse({
						msg: 'ok',
						data: cookies
					});
				} else {
					sendResponse({
						msg: "error"
					});
				}
			});
		}
		else{
			chrome.cookies.get({
				url: request.url,
				name: request.name
			},function(cookies){
				if (cookies != null) {
					sendResponse({
						msg: 'ok',
						data: cookies.value
					});
				} else {
					sendResponse({
						msg: "error"
					});
				}
			});	
		}
    }
});