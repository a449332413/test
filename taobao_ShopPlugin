// ==UserScript==
// @name         淘宝天猫店铺装修插件
// @namespace    undefined
// @version      0.1
// @description  编辑窗口支持最大化
// @author       You
// @match        *://siteadmin.tmall.com/design.htm*
// @match        *://siteadmin.taobao.com/design.htm*
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    var tb_siteCategoryId=Number($("input[name='siteCategoryId']:first").val());//1=旺铺基础班，2=旺铺专业版，3=旺铺天猫版，
    
    var modulelists=new Array();
    
    modulelists.push({
        id:"1",
        name:"全屏图/热点图",
        contpl:function(setconfig){
            var _config={isfullscreen:false,width:1920,height:100,modmap:0,imgsrc:"",usemap:"map"+new Date().getTime(),maplist:{}};
            $.extend(_config,setconfig);
            
            var tpl_html="";
            tpl_html+="<img src='"+imgsrc+"' usemap='#"+usemap+"'>";
            tpl_html+="<map name='"+usemap+"'>";
            for(var i in maplist){
                tpl_html+="<area shape='rect' coords='"+maplist[i]["x"]+","+maplist[i]["y"]+","+maplist[i]["width"]+","+maplist[i]["height"]+"' href='"+maplist[i]["href"]+"' target='_blank'>";
            }
            tpl_html+="</map>";
            return tpl_html;
        },
        settpl:"123",
    });
    modulelists.push({
        id:"2",
        name:"全屏轮播图",
        content:function(setconfig){
            var _config={isfullscreen:false,width:1920,height:100,modmap:0,imgsrc:"",usemap:"map"+time(),maplist:{}};
            $.extend(_config,setconfig);
        },
        tpl:"",
    });
    

    var dialog_change=function(tb_d,ischange){//修改编辑框窗口大小
        var tb_jwidth=Number(tb_d.parent().width());
        var tb_jheight=Number(tb_d.parent().height())-70;
        var tb_dwidth=ischange?Math.round(tb_jwidth*0.9):880;
        var tb_dheight=ischange?Math.round(tb_jheight*0.9):570;

        tb_d.width(tb_dwidth);
        tb_d.css("left", (Math.round(tb_jwidth/2)-Math.round(tb_dwidth/2))+"px");

        tb_d.find("div.tb-dialog-body iframe").each(function(){
            $(this).css("min-height",tb_dheight+"px");
            $(this).height(tb_dheight);
            $(this).attr("data-init-height",tb_dheight);
            $(this).contents().find("div.content form").each(function(){
                if($(this).attr("name")=="editform"){//自定义内容区
                    $(this).find("div.setting-mod-custom table").each(function(){
                        $(this).width("97%");
                        $(this).find("div.ks-editor").each(function(){
                            $(this).width("100%");
                            $(this).height("");
                            $(this).find("div.ks-editor-textarea-wrap").height(tb_dheight-210);
                            $(this).find("div.ks-editor-textarea-wrap textarea.ks-editor-textarea").height(tb_dheight-210);
                        });
                    });
                }else if($(this).attr("name")=="customSetForm"){//自定义招牌
                    $(this).find("div.ks-editor").each(function(){
                        $(this).width("97%");
                        $(this).height("");
                        $(this).find("div.ks-editor-textarea-wrap").height(tb_dheight-290);
                        $(this).find("div.ks-editor-textarea-wrap textarea.ks-editor-textarea").height(tb_dheight-290);
                    });
                }
            });
        });
    };
    $(document).on("mouseenter","div.J_DialogWrapper",function(){
        $(this).find("div.tb-dialog[Plugin-status!='0']").each(function(){
            $(this).attr("Plugin-status","0");
            $(this).append("<a href='javascript:void(0);' class='tb-dialog-close tb-overlay-close Plugin-enlarge' style='display:none;right:47px;background-image:url(https://a449332413.github.io/test/img/tb_enlarge.gif);'></a>");
            $("a.Plugin-enlarge").on("click",function(){
                 var tb_d=$(this).parent();
                 if(tb_d.attr("dialog-status")=="1"){
                     tb_d.attr("dialog-status","0");
                     dialog_change(tb_d,false);
                 }else{
                     tb_d.attr("dialog-status","1");
                     dialog_change(tb_d,true);
                 }
            });
            var tb_iframe=$(this).find("div.tb-dialog-body iframe");
            tb_iframe.attr("scrolling","auto");
            tb_iframe.on("load",function(){
                $(this).contents().find("body").each(function(){
                 //$(this).append("<div class='Plugin-dialog-wrapper'></div>");
                 // $(this).append("<style>div.Plugin-dialog-wrapper{display: none;z-index: 20099;position: fixed;_position: absolute;top: 0;left: 0;background: #101010;width: 100%;height: 100%;}</style>");
                 $(this).find("div.content form").each(function(){
                    if($(this).attr("name")=="editform"){//自定义内容区
                        $("a.Plugin-enlarge").show();//等待加载完毕后再显示按钮
                        var tb_cg=$(this).find("div.control-group");
                        var p_html="<label class='control-label'>插入模块：</label><div class='control Plugin-module'><a href='javascript:void(0);' class='Plugin-module-select'>选择<span>◢</span></a><div class='Plugin-module-dialog'><ul>";
                        for( var i in modulelists){
                            p_html+="<li data-moduleindex='"+i+"'><b>"+modulelists[i].name+"</b></li>";
                        }
                        tb_cg.append(p_html+"</ul></div></div>");
                        tb_cg.append("<style>"+
                                     "a.Plugin-module-select{display: inline-block;border: 1px solid #d9d9d9;line-height: 23px;padding: 0px 10px;color: #000;text-decoration:none;position:absolute;z-index:20002;}"+
                                     "a.Plugin-module-select span{margin-left:25px;}"+
                                     "div.Plugin-show a.Plugin-module-select{background-color:#FFF;border-bottom:0;}"+
                                     "div.Plugin-module-dialog{display:none;background-color: #fff;min-width: 100px;position: absolute;z-index: 20001;padding: 10px;border: 1px solid #d9d9d9;top: 23px;max-width:411px;}"+
                                     "div.Plugin-show div.Plugin-module-dialog{display:block;}"+
                                     "div.Plugin-module-dialog li{display: inline-block;margin:5px;width:90px;border: 1px solid #dee1e7;background: #ebedf3 url(https://a449332413.github.io/test/img/tb_module.gif) no-repeat 10px center;float: left;text-align: center;cursor:pointer;padding: 5px 10px 5px 25px;}"+
                                     "div.Plugin-module-dialog li:hover{background-color:#FFF;}"+
                                     "</style>");
                        tb_cg.find("div.control").css({"float":"left","margin":"0px 15px 0px 5px"});
                        tb_cg.find("div.Plugin-module").on("mouseenter",function(){
                            $(this).addClass("Plugin-show");
                        });
                        tb_cg.find("div.Plugin-module").on("mouseleave",function(){
                            $(this).removeClass("Plugin-show");
                        });
                        tb_cg.find("div.Plugin-module-dialog li").on("click",function(){
                            if(confirm("插入新模块：\n自定义内容区-现有内容将被替换成新模块（替换后不可恢复），是否继续操作？")){
                                var tb_div=$(this).parents("div.control-group").siblings("div.setting-mod-custom");
                                if(tb_div.length>0){
                                    
                                    //$(this).parent().
                                    //tb_div.hide();
                                    var i= Number($(this).attr("data-moduleindex"));
                                    tb_div.before("<div class='Plugin-module-setting'>"+modulelists[i].settpl+"</div>");
                                    tb_div.find("div.ks-editor div.ks-editor-tools div#ks-component136").click();
                                    tb_div.find("div.ks-editor-textarea-wrap textarea.ks-editor-textarea").val(modulelists[i].contpl({}));
                                }
                            }
                        });
                    }else if($(this).attr("name")=="customSetForm"){//自定义招牌
                        $("a.Plugin-enlarge").show();
                    }
                 });
                });
            });
        });
    });
    $(window).resize(function(){
        $("div.J_DialogWrapper").find("div.tb-dialog[dialog-status='1']").each(function(){
            dialog_change($(this),true);
        });
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    


    
    // Your code here...
})();
