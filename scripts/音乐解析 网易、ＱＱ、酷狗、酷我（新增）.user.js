// ==UserScript==
// @name         [timerd] 音乐解析 网易、ＱＱ、酷狗、酷我（新增）、(定期更新增加新的解析网站)(2019-09-20)更新
// @namespace    http://timerd.ml
// @version      0.0.12
// @description  音乐解析 网易、ＱＱ音乐解析 欢迎收听！
// @author       timerd
// @include      *://music.163.com/*song*
// @include      *://y.qq.com/*/song/*
// @include      *://*.kugou.com/song/*
// @include      *://*.kuwo.cn/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @icon         http://timerd.me/favicon.ico
// @run-at       document-end
// @grant        unsafeWindow
// @license      MIT2.0
// ==/UserScript==


(function () {

    'use strict';
    function addInfrastructure() {
        let style = document.createElement("style");
      
        style.appendChild(document.createTextNode(`
              #mywidget a {
              position: absolute;
              left: -75px;
              transition: 0.3s;
              padding: 15px 30px 15px 15px; 
              text-decoration: none;
              color: white!important;
              border-radius: 0 8px 8px 0;
              font: 20px "Microsoft YaHei",SimHei,helvetica,arial,verdana,tahoma,sans-serif;
              min-width: 80px;
              text-align:right;
              white-space:nowrap;             
            }


            #mywidget a:hover {
                left: 0;
             }    
   
             #vparse {
               background-color: #f44336;
             }

             #myplaybutton {
                 position:absolute; 
                 right:-8px;
                 top: 14px; 
                 width:0px;
                 height:0px;
                 margin:0px;
                 border-width: 16px;
                 border-style: solid;
                 border-color:transparent transparent transparent white;
             }

             #mywidget a img {
             width: 28px;
             height:34px;
             position: absolute;
             top:12px;
             right: 5px;
             align-items: center;
       }`));        

        document.head.appendChild(style);
    }


    let playurl = window.location.href;
    let rArray = playurl.split('?');
    let cWeb = rArray[0];
 

    const musicSites = new Array();
    musicSites[0]=/163(.*)song/i;
    musicSites[1]=/QQ(.*)song/i;
    musicSites[2]=/(.*)kugou.com/i;
    musicSites[3]=/(.*)kuwo.cn/i;
   
    musicSites.every((item) => {
        if (item.test(cWeb)) {
            addInfrastructure();
            var jumpButton = $(`
            <div id="mywidget" href='javascript:void(0)' target='_blank' style="z-index:9999; position:fixed;left:0px;top:280px;">    
                <a href="#" id="vparse">❀音乐解析<div id="myplaybutton"></div></a>
            </div>
            `);
           
            $("body").append(jumpButton);
    
            // bind onclick event
            $("#mywidget").click(function () {
                var openUrl = window.location.href;
                window.open('https://timerd.me/static/m.html?zxm=' + encodeURIComponent(openUrl));
            });
            return false;
        }
        return true;
    });
})()