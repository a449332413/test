// ==UserScript==
// @name         pupudy 灯开关插件
// @namespace    undefined
// @version      0.1
// @description  pupudy 播放页面去除右侧烂，右下角增加 灯开关 按钮
// @author       You
// @match        *://pupudy.com/play?*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle("#playshow_mask {display: none;z-index: 20099;position: fixed;_position: absolute;top: 0;left: 0;background: #101010;width: 100%;height: 100%;}"+
               "#sideToolDark {display: block;z-index: 20100;position: fixed;bottom: 70px;right: 0;width: 40px;height: 40px;_position: absolute;_zoom: 1;background: #323232;color:#FFF;line-height:20px;cursor:pointer;text-align: center;}"
               );
    $(".sidebar").remove();
    $(".content-wrap .content").css("margin","0px 0px");
    $("body").append("<div id='playshow_mask'></div><div id='sideToolDark'>开/关灯</div>");
    $(".bofangdiv").css({"position":"relative","z-index":"20100"});
    $("#xlu").css({"position":"relative","z-index":"20100"});
    $("#sideToolDark").click(function(){
        $("#playshow_mask").toggle();
    });
    // Your code here...
})();
