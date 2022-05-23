// ==UserScript==
// @name         百度网盘视频倍速播放+完美去广告(2020/9/3更新）
// @namespace    http://tampermonkey.net/
// @version      1.11
// @description  去除百度云盘视频播放页产生的烦人的广告,考虑增加倍速播放按键放哪里，有利于用户体验，大家也可以给点意见
// @author       Shawsw  我的美文微信公众号  潇潇书旅   欢迎你！！！
// @grant        none
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @require      https://code.jquery.com/jquery-latest.js
// @include      *://pan.baidu.com/disk/home*
// @include      *://yun.baidu.com/disk/home*
// @include      *://pan.baidu.com/s*
// @include      *://yun.baidu.com/s*
// @include      *://pan.baidu.com/play*

// ==/UserScript==
//var videoElement = document.getElementById("html5player_html5_api");


var bbsInterval = 500; // 在AD之后运行

(function() {
    'use strict';


    window.onload=function(){

     
        var btn_only_video = document.createElement("li");
        var btn_only_video_node=document.createTextNode("Only Video");
        btn_only_video.id='Only_Video_li';
        btn_only_video.className ='Only_Video_li_class';
        btn_only_video.appendChild(btn_only_video_node);

        var setpoint=document.getElementsByClassName("tips-ul")[0];
        if(setpoint)
        setpoint.appendChild(btn_only_video);



        //倍速播放标签
        var quick_ddiv = "<div > <font face='微软雅黑' color='#238E23' size=4>更多倍速选择： </font><select class='select_class_name'><option value=1 id ='select_option_1id' class='select_option_1'>1</option><option value=1.25 id ='select_option_1id' class='select_option_125'>1.25（慢推荐）</option><option value=1.3 id ='select_option_1id' class='select_option_1'>1.3</option><option value=1.5 id ='select_option_1id' class='select_option_1'>1.5</option><option value=1.8 id ='select_option_1id' class='select_option_1'>1.8</option><option value=2 class='select_option_2'>2</option><option value=2.6 class='select_option_25'>2.6（快推荐）</option><option value=3 class='select_option_3'>3</option><option value=4 class='select_option_4'>4</option></select></div>";

        //登录页面没了
        var login_div="<form id='TANGRAM__PSP_4__form' class='pass-form pass-form-normal' method='POST' autocomplete='off'><p class='pass-form-logo'>帐号密码登录</p><p id='TANGRAM__PSP_4__errorWrapper' class='pass-generalErrorWrapper'><span id='TANGRAM__PSP_4__error' class='pass-generalError pass-generalError-error'></span></p><p id='TANGRAM__PSP_4__MakeTextWrapper' class='pass-make-text' style='display:none;'></p><p id='TANGRAM__PSP_4__hiddenFields' style='display:none'><input type='hidden' id='TANGRAM__PSP_4__codeString' name='codeString' value=''><input type='hidden' id='TANGRAM__PSP_4__safeFlag' name='safeFlag' value='0'><input type='hidden' id='TANGRAM__PSP_4__u' name='u' value='https://pan.baidu.com/disk/home'><input type='hidden' id='TANGRAM__PSP_4__isPhone' name='isPhone' value=''><input type='hidden' id='TANGRAM__PSP_4__detect' name='detect' value='1'><input type='hidden' id='TANGRAM__PSP_4__gid' name='gid' value='35ED3CB-F3C6-4E2F-BFD8-A0BD595E1FA5'><input type='hidden' id='TANGRAM__PSP_4__staticPage' name='staticPage' value='https://pan.baidu.com/res/static/thirdparty/pass_v3_jump.html'><input type='hidden' id='TANGRAM__PSP_4__quick_user' name='quick_user' value='0'><input type='hidden' id='TANGRAM__PSP_4__logintype' name='logintype' value='basicLogin'><input type='hidden' id='TANGRAM__PSP_4__logLoginType' name='logLoginType' value='pc_loginBasic'><input type='hidden' id='TANGRAM__PSP_4__subpro' name='subpro' value='netdisk_web'><input type='hidden' id='TANGRAM__PSP_4__idc' name='idc' value=''><input type='hidden' id='TANGRAM__PSP_4__loginMerge' name='loginMerge' value='true'><input type='hidden' id='TANGRAM__PSP_4__mkey' name='mkey' value=''></p><p id='TANGRAM__PSP_4__userNameWrapper' class='pass-form-item pass-form-item-userName' style='display:'><input type='text' style='display:none;'><input id='TANGRAM__PSP_4__userName' type='text' name='userName' class='pass-text-input pass-text-input-userName' autocomplete='off' value='' placeholder='手机/邮箱/用户名'><span id='TANGRAM__PSP_4__userName_clearbtn' class='pass-clearbtn pass-clearbtn-userName' style='display: block; visibility: visible; opacity: 1;'></span><span id='TANGRAM__PSP_4__userNameTip' class='pass-item-tip pass-item-tip-userName' style='display:none'><span id='TANGRAM__PSP_4__userNameTipText' class='pass-item-tiptext pass-item-tiptext-userName'></span></span></p><p id='TANGRAM__PSP_4__passwordWrapper' class='pass-form-item pass-form-item-password' style='display:'><input type='password' style='display: none;'><input id='TANGRAM__PSP_4__password' type='password' name='password' class='pass-text-input pass-text-input-password' autocomplete='off' value='' placeholder='密码'><span id='TANGRAM__PSP_4__password_clearbtn' class='pass-clearbtn pass-clearbtn-password' style='display: block; visibility: visible; opacity: 1;'></span><span id='TANGRAM__PSP_4__passwordTip' class='pass-item-tip pass-item-tip-password' style='display:none'><span id='TANGRAM__PSP_4__passwordTipText' class='pass-item-tiptext pass-item-tiptext-password'></span></span></p><p id='TANGRAM__PSP_4__verifyCodeImgWrapper' class='pass-form-item pass-form-item-verifyCode' style='display: none; visibility: hidden;'><input id='TANGRAM__PSP_4__verifyCode' type='text' name='verifyCode' class='pass-text-input pass-text-input-verifyCode' maxlength='6' placeholder='验证码'><span id='TANGRAM__PSP_4__verifyCode_clearbtn' class='pass-clearbtn pass-clearbtn-verifyCode' style='display:none;'></span><span id='TANGRAM__PSP_4__verifyCodeImgParent' class='pass-verifyCodeImgParent'><img id='TANGRAM__PSP_4__verifyCodeImg' class='pass-verifyCode' src='https://passport.baidu.com/passApi/img/small_blank.gif'></span><a id='TANGRAM__PSP_4__verifyCodeChange' href='#' class='pass-change-verifyCode'>换一张</a><span id='TANGRAM__PSP_4__verifyCodeError' class='pass-error pass-error-verifyCode'></span><span id='TANGRAM__PSP_4__verifyCodeTip' class='pass-tip pass-tip-verifyCode'></span><span id='TANGRAM__PSP_4__verifyCodeSuccess' class='pass-success pass-success-verifyCode'></span></p><p id='TANGRAM__PSP_4__memberPassWrapper' class='pass-form-item pass-form-item-memberPass'><input id='TANGRAM__PSP_4__memberPass' type='checkbox' name='memberPass' class='pass-checkbox-input pass-checkbox-memberPass' checked='checked'><label for='TANGRAM__PSP_4__memberPass' id='TANGRAM__PSP_4__memberPassLabel' class=''>下次自动登录</label></p><p id='TANGRAM__PSP_4__submitWrapper' class='pass-form-item pass-form-item-submit'><input id='TANGRAM__PSP_4__submit' type='submit' value='登录' class='pass-button pass-button-submit'><a class='pass-fgtpwd pass-link' href='https://passport.baidu.com/?getpassindex&amp;tt=1574223519942&amp;gid=35ED3CB-F3C6-4E2F-BFD8-A0BD595E1FA5&amp;tpl=netdisk&amp;u=https%3A%2F%2Fpan.baidu.com%2Fdisk%2Fhome' target='_blank'>忘记密码？</a></p></form>"
        var login__div="<div id='login-middle' class='tang-pass-login' style='display: block; visibility: visible; opacity: 1;'><form id='TANGRAM__PSP_4__form' class='pass-form pass-form-normal' method='POST' autocomplete='off'><p class='pass-form-logo'>帐号密码登录</p><p id='TANGRAM__PSP_4__errorWrapper' class='pass-generalErrorWrapper'><span id='TANGRAM__PSP_4__error' class='pass-generalError pass-generalError-error'></span></p><p id='TANGRAM__PSP_4__MakeTextWrapper' class='pass-make-text' style='display:none;'></p><p id='TANGRAM__PSP_4__hiddenFields' style='display:none'><input type='hidden' id='TANGRAM__PSP_4__codeString' name='codeString' value=''><input type='hidden' id='TANGRAM__PSP_4__safeFlag' name='safeFlag' value='0'><input type='hidden' id='TANGRAM__PSP_4__u' name='u' value='https://pan.baidu.com/disk/home'><input type='hidden' id='TANGRAM__PSP_4__isPhone' name='isPhone' value=''><input type='hidden' id='TANGRAM__PSP_4__detect' name='detect' value='1'><input type='hidden' id='TANGRAM__PSP_4__gid' name='gid' value='35ED3CB-F3C6-4E2F-BFD8-A0BD595E1FA5'><input type='hidden' id='TANGRAM__PSP_4__staticPage' name='staticPage' value='https://pan.baidu.com/res/static/thirdparty/pass_v3_jump.html'><input type='hidden' id='TANGRAM__PSP_4__quick_user' name='quick_user' value='0'><input type='hidden' id='TANGRAM__PSP_4__logintype' name='logintype' value='basicLogin'><input type='hidden' id='TANGRAM__PSP_4__logLoginType' name='logLoginType' value='pc_loginBasic'><input type='hidden' id='TANGRAM__PSP_4__subpro' name='subpro' value='netdisk_web'><input type='hidden' id='TANGRAM__PSP_4__idc' name='idc' value=''><input type='hidden' id='TANGRAM__PSP_4__loginMerge' name='loginMerge' value='true'><input type='hidden' id='TANGRAM__PSP_4__mkey' name='mkey' value=''></p><p id='TANGRAM__PSP_4__userNameWrapper' class='pass-form-item pass-form-item-userName' style='display:'><input type='text' style='display:none;'><input id='TANGRAM__PSP_4__userName' type='text' name='userName' class='pass-text-input pass-text-input-userName' autocomplete='off' value='' placeholder='手机/邮箱/用户名'><span id='TANGRAM__PSP_4__userName_clearbtn' class='pass-clearbtn pass-clearbtn-userName' style='display: block; visibility: visible; opacity: 1;'></span><span id='TANGRAM__PSP_4__userNameTip' class='pass-item-tip pass-item-tip-userName' style='display:none'><span id='TANGRAM__PSP_4__userNameTipText' class='pass-item-tiptext pass-item-tiptext-userName'></span></span></p><p id='TANGRAM__PSP_4__passwordWrapper' class='pass-form-item pass-form-item-password' style='display:'><input type='password' style='display: none;'><input id='TANGRAM__PSP_4__password' type='password' name='password' class='pass-text-input pass-text-input-password' autocomplete='off' value='' placeholder='密码'><span id='TANGRAM__PSP_4__password_clearbtn' class='pass-clearbtn pass-clearbtn-password' style='display: block; visibility: visible; opacity: 1;'></span><span id='TANGRAM__PSP_4__passwordTip' class='pass-item-tip pass-item-tip-password' style='display:none'><span id='TANGRAM__PSP_4__passwordTipText' class='pass-item-tiptext pass-item-tiptext-password'></span></span></p><p id='TANGRAM__PSP_4__verifyCodeImgWrapper' class='pass-form-item pass-form-item-verifyCode' style='display: none; visibility: hidden;'><input id='TANGRAM__PSP_4__verifyCode' type='text' name='verifyCode' class='pass-text-input pass-text-input-verifyCode' maxlength='6' placeholder='验证码'><span id='TANGRAM__PSP_4__verifyCode_clearbtn' class='pass-clearbtn pass-clearbtn-verifyCode' style='display:none;'></span><span id='TANGRAM__PSP_4__verifyCodeImgParent' class='pass-verifyCodeImgParent'><img id='TANGRAM__PSP_4__verifyCodeImg' class='pass-verifyCode' src='https://passport.baidu.com/passApi/img/small_blank.gif'></span><a id='TANGRAM__PSP_4__verifyCodeChange' href='#' class='pass-change-verifyCode'>换一张</a><span id='TANGRAM__PSP_4__verifyCodeError' class='pass-error pass-error-verifyCode'></span><span id='TANGRAM__PSP_4__verifyCodeTip' class='pass-tip pass-tip-verifyCode'></span><span id='TANGRAM__PSP_4__verifyCodeSuccess' class='pass-success pass-success-verifyCode'></span></p><p id='TANGRAM__PSP_4__memberPassWrapper' class='pass-form-item pass-form-item-memberPass'><input id='TANGRAM__PSP_4__memberPass' type='checkbox' name='memberPass' class='pass-checkbox-input pass-checkbox-memberPass' checked='checked'><label for='TANGRAM__PSP_4__memberPass' id='TANGRAM__PSP_4__memberPassLabel' class=''>下次自动登录</label></p><p id='TANGRAM__PSP_4__submitWrapper' class='pass-form-item pass-form-item-submit'><input id='TANGRAM__PSP_4__submit' type='submit' value='登录' class='pass-button pass-button-submit'><a class='pass-fgtpwd pass-link' href='https://passport.baidu.com/?getpassindex&amp;tt=1574223519942&amp;gid=35ED3CB-F3C6-4E2F-BFD8-A0BD595E1FA5&amp;tpl=netdisk&amp;u=https%3A%2F%2Fpan.baidu.com%2Fdisk%2Fhome' target='_blank'>忘记密码？</a></p></form></div>"
        //if($(".header-login").length > 0){ $(".header-login").append(login__div); }




      

        //增加倍速播放按键vjs-control-bar
        $(".video-title-left").append(quick_ddiv);
        $(".select_class_name").change(function() {
            //获取下拉框选中项的value属性值
            window.videojs.getPlayers("video-player").html5player.tech_.setPlaybackRate($(this).val());
        });


        //除烦人的标签广告
        setTimeout(function () {
            document.getElementsByClassName("privilege-box")[0].remove(); // 按键处广告
            $(".app-download").remove();       // 右上角app下载提醒
            $(".video-title-right").remove();//视频上边角广告
            $(".dis-footer").remove(); //尾部广告的剔除
            $(".top-right-box").remove();//开通会员广告
            $(".gOIbzPb").remove();//好书推荐广告
            $(".video-title-right-open-mobile").remove();//新的css div遮挡了我的倍速
            //$(".video-toolbar").remove();//分享下载等等



        }, bbsInterval);


        $(".Only_Video_li_class").click(function(){
            if($(".other-video-box").is(':hidden')){
                //如果隐藏时。。。
                //$(".module-header-wrapper").show(); // 顶部菜单栏
                $(".video-toolbar-buttonbox").show(); // 视频下部菜单栏
                $(".other-video-box").show(); // 视频下部菜单栏
                $(".Only_Video_li_class").text("Only Video");
                $(".video-toolbar").remove();

            }else{
                //如果显示时。。。
                $(".module-header-wrapper").hide(); // 顶部菜单栏
                $(".video-toolbar-buttonbox").hide(); // 视频下部菜单栏
                $(".other-video-box").hide(); // 视频下部菜单栏
                $(".Only_Video_li_class").text("Other");



            }
        });


   //window.onload=function

    $(document).keydown(function(event){
        console.log("Key: "+event.keyCode);
        if (event.keyCode === 97) {

           down(1)
        }
        else if (event.keyCode === 98) {

            // 二倍

            return false;

        } else if (event.keyCode === 99) {

            // 三倍
            window.videojs.getPlayers("video-player").html5player.tech_.setPlaybackRate(3);
            return false;

        }


    });


    
    }

    // Your best code ...
})();