(function($) {
	if (typeof($.fn.lc_switch) != 'undefined') {
		return false;
	} // prevent dmultiple scripts inits

	$.fn.lc_switch = function(on_text, off_text) {

		// destruct
		$.fn.lcs_destroy = function() {

			$(this).each(function() {
				var $wrap = $(this).parents('.lcs_wrap');

				$wrap.children().not('input').remove();
				$(this).unwrap();
			});

			return true;
		};


		// set to ON
		$.fn.lcs_on = function() {

			$(this).each(function() {
				var $wrap = $(this).parents('.lcs_wrap');
				var $input = $wrap.find('input');

				if (typeof($.fn.prop) == 'function') {
					$wrap.find('input').prop('checked', true);
				} else {
					$wrap.find('input').attr('checked', true);
				}

				$wrap.find('input').trigger('lcs-on');
				$wrap.find('input').trigger('lcs-statuschange');
				$wrap.find('.lcs_switch').removeClass('lcs_off').addClass('lcs_on');

				// if radio - disable other ones 
				if ($wrap.find('.lcs_switch').hasClass('lcs_radio_switch')) {
					var f_name = $input.attr('name');
					$wrap.parents('form').find('input[name=' + f_name + ']').not($input).lcs_off();
				}
			});

			return true;
		};

		// set to OFF
		$.fn.lcs_off = function() {

			$(this).each(function() {
				var $wrap = $(this).parents('.lcs_wrap');

				if (typeof($.fn.prop) == 'function') {
					$wrap.find('input').prop('checked', false);
				} else {
					$wrap.find('input').attr('checked', false);
				}

				$wrap.find('input').trigger('lcs-off');
				$wrap.find('input').trigger('lcs-statuschange');
				$wrap.find('.lcs_switch').removeClass('lcs_on').addClass('lcs_off');
			});

			return true;
		};


		// construct
		return this.each(function() {

			// check against double init
			if (!$(this).parent().hasClass('lcs_wrap')) {

				// default texts
				var ckd_on_txt = (typeof(on_text) == 'undefined') ? 'ON' : on_text;
				var ckd_off_txt = (typeof(off_text) == 'undefined') ? 'OFF' : off_text;

				// labels structure
				var on_label = (ckd_on_txt) ? '<div class="lcs_label lcs_label_on">' + ckd_on_txt + '</div>' : '';
				var off_label = (ckd_off_txt) ? '<div class="lcs_label lcs_label_off">' + ckd_off_txt + '</div>' : '';


				// default states
				var disabled = ($(this).is(':disabled')) ? true : false;
				var active = ($(this).is(':checked')) ? true : false;

				var status_classes = '';
				status_classes += (active) ? ' lcs_on' : ' lcs_off';
				if (disabled) {
					status_classes += ' lcs_disabled';
				}


				// wrap and append
				var structure =
					'<div class="lcs_switch ' + status_classes + '">' +
					'<div class="lcs_cursor"></div>' +
					on_label + off_label +
					'</div>';

				if ($(this).is(':input') && ($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio')) {

					$(this).wrap('<div class="lcs_wrap"></div>');
					$(this).parent().append(structure);

					$(this).parent().find('.lcs_switch').addClass('lcs_' + $(this).attr('type') + '_switch');
				}
			}
		});
	};
	// handlers
	$(document).ready(function() {
		// on click
		$(document).delegate('.lcs_switch:not(.lcs_disabled)', 'click tap', function(e) {

			if ($(this).hasClass('lcs_on')) {
				if (!$(this).hasClass('lcs_radio_switch')) { // not for radio
					$(this).lcs_off();
				}
			} else {
				$(this).lcs_on();
			}
		});
		// on checkbox status change
		$(document).delegate('.lcs_wrap input', 'change', function() {

			if ($(this).is(':checked')) {
				$(this).lcs_on();
			} else {
				$(this).lcs_off();
			}
		});

	});

})(jQuery);
if (window.localStorage.hiddenPlugin) {
	$("#hiddenPlugin").attr("checked", window.localStorage.hiddenPlugin == "true" ? true : false);
}
else{
	window.localStorage.hiddenPlugin = false;
}
//点击
$("#hiddenPlugin").change(function() {
	if ($(this).is(':checked')) {
		window.localStorage.hiddenPlugin = true;
	} else {
		window.localStorage.hiddenPlugin = false;
	}
	chrome.storage.local.remove('tqqCode',function() {});
});
window.localStorage.applyReason=window.localStorage.applyReason.replace('【淘鹊桥】','');
$("#applyReason").val(window.localStorage.applyReason);
$("#applyReason").on('keyup paste', function() {
	if ($(this).val()){
		window.localStorage.applyReason = $(this).val();
	}
});
var cfurl='';
$("#keyPlugin").val(String.fromCharCode(window.localStorage.keyPlugin));
$("#tbname").val(window.localStorage.tbname);
$("#tbpwd").val(window.localStorage.tbpwd);
/*$("#keyTrend").val(String.fromCharCode(window.localStorage.keyTrend));
$("#keyTaoke").val(String.fromCharCode(window.localStorage.keyTaoke));
$("#keyQueqiao").val(String.fromCharCode(window.localStorage.keyQueqiao));
$("#keyLogin").val(String.fromCharCode(window.localStorage.keyLogin));*/
if(typeof window.localStorage.keyQueqiaoUrl=='undefined'){
	window.localStorage.keyQueqiaoUrl='';
}
cfurl=window.localStorage.keyQueqiaoUrl;
$("#keyQueqiaoUrl").val(cfurl);

$(".zimuinput").on('keyup paste', function(event) {
	var id = $(this).attr('data-id');
	var keyCode = event.keyCode;
	var patrn=/^[a-zA-Z]+$/; 
	if (!patrn.test($(this).val())){
		$(this).val('');
		return false;
	}else{
		if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)){
			if (id=='1'){
				window.localStorage.keyPlugin = keyCode;
			}
			/*else if (id=='2'){
				window.localStorage.keyLogin = keyCode;
			}else if (id=='3'){
				window.localStorage.keyTrend = keyCode;
			}else if (id=='4'){
				window.localStorage.keyTaoke = keyCode;
			}else if (id=='5'){
				window.localStorage.keyQueqiao = keyCode;
			}*/
		}
	}
});
$("textarea,input").focus(function() {
	$(this).css('background','#FFF');
});
$("textarea,input").blur(function() {
	$(this).css('background','#F4F4F4');
});
$('#keyQueqiaoUrl').blur(function(){
	keyCode=$(this).val();
	keyCode=keyCode.replace('http://','');
	keyCode=keyCode.replace(/\/$/,'');
	cfurl=window.localStorage.keyQueqiaoUrl = keyCode;
	$(this).val(cfurl);
});
$('#tbname').blur(function(){
	window.localStorage.tbname = $(this).val();
	chrome.storage.local.set({'tbname': $(this).val()}, function() {});
});
$('#tbpwd').blur(function(){
	window.localStorage.tbpwd = $(this).val();
	chrome.storage.local.set({'tbpwd': $(this).val()}, function() {});
});

function tongzhi(name,callback,obj){
	var data={type : name,url:cfurl};
	if(typeof obj=='object'){
		for(var i in obj){
			data[i]=obj[i];
		}
	}
	chrome.tabs.query({active : true,currentWindow : true}, function(tabs) {
		chrome.tabs.sendRequest(tabs[0].id, data, function(response) {
			callback(response);
		});
	});
}

window.ddalert = function(text,cb) {
	var time=2500;
	$('body').append('<div style="position: fixed;	top:0;	left:0;	width:100%;	height:100%;background:rgba(0, 0, 0, 0.7);	display:none;z-index:20000;" id="mcover" onClick="document.getElementById(\'mcover\').style.display=\'\';"><div style="z-index:20001; margin:auto; text-align:center;" class="rongqi"><span style="background:#666; padding:0.5em 1em; color:#FFF;border-radius:0.5em;">'+text+'</span></div></div>');
	var h=$(window).height();
	$('#mcover').show().find('.rongqi').css('margin-top',(h*0.4)+'px');
	setTimeout(function(){
		document.getElementById('mcover').style.display='none';
		$('#mcover').remove();
		if(cb && typeof cb == 'function'){
			cb();
		}
		else if(cb){
			window.location.href=cb;
		}
	},time);
}

function errorHtml(s){
	ddalert(s);
}

function rightHtml(s){
	ddalert(s);
}

function size(obj){
	var size = 0;
	for(var i in obj){
		size++;
	}
	return size;
}

var MM_PAGE=1;
var MM_LOGIN=0;

function huoqu(){
	/*if(MM_PAGE==0){
		ddalert('请先登录阿里妈妈');
		$('#logintip').show();
		$('#xuanpinku_p').hide();
		return false;
	}*/
	if(cfurl==''){
		return false;
	}
	
	if(MM_PAGE==0){
		var ddcfurl=cfurl.replace('http://','');
		ddcfurl=ddcfurl.replace(/\/$/,'');
		var url='http://cfip2.fanlicheng.com/?mod=api&act=click_url&site_url='+encodeURIComponent(ddcfurl);
		$.getJSON(url,function(data){
			if(data.s==1){
				ddalert('请先登录阿里妈妈!');
				$('#logintip').show();
				$('#xuanpinku_p').hide();
				$('#chaofantip').hide();
				$('#huoqu').html('获取('+size(data.r)+')');
			}
			else{
				ddalert(data.r);
				$('#chaofantip').show();
			}
		});
	}
	else{
		tongzhi('huoqu',function(data){
			if(data.s==0){
				ddalert(data.r);
				$('#chaofantip').show();
			}
			else{
				$('#huoqu').html('获取('+data.r+')');
				$('#chaofantip').hide();
				if(MM_LOGIN==1){
					$('#huoqutip').show().html('共个'+data.r+'商品，请 点击下面 导入');
				}
			}
		});
	}
}

function loginMM(){
	tongzhi('login',function(data){
		if(typeof data=='undefined'){
			/*ddalert('请先登录阿里妈妈');
			$('#logintip').show();
			$('#xuanpinku_p').hide();*/
			MM_PAGE=0;
			huoqu();
		}
		else if(data.s==0){
			//ddalert(data.r);
			$('#logintip').show();
			$('#xuanpinku_p').hide();
			//tongzhi('url',function(data){},{'location':'http://www.alimama.com/member/login.htm?forward=http%3A%2F%2Fwww.alimama.com'});
			huoqu();
		}
		else{
			$('#xuanpinku_span').html(data.r);
			$('#xuanpinku_p').show();
			$('#logintip').hide();
			MM_LOGIN=1;
			huoqu();
		}
	});
}

$('#huoqu').click(function(){
	if(cfurl==''){
		ddalert('请先设置推广网址');
		return false;
	}
	huoqu();
});

$('#daoru').click(function(){
	var groupId=$('#xuanpinku').val();
	if(typeof groupId=='undefined' || groupId==''){
		ddalert('请选择选品库');
		return false;
	}
	if(parseInt(groupId)!=groupId){
		ddalert('系统错误，请刷新');
		return false;
	}
	
	tongzhi('daoru',function(data){
		if(data.s==0){
			ddalert(data.r);
		}
		else{
			ddalert('导入完成，请导出',function(){
				tongzhi('url',function(data){},{'location':'http://pub.alimama.com/manage/selection/detail.htm?groupId='+groupId+'&dd=1'});
			});
		}
	},{groupId:groupId});
});

loginMM();

/*$('#loginmm').click(function(){
	tongzhi('url',function(data){},{'location':'http://www.alimama.com/member/login.htm?forward=http%3A%2F%2Fwww.alimama.com'});
});*/

$('#banben').html('版本：V '+chrome.app.getDetails().version);