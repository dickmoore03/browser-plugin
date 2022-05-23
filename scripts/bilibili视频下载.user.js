// ==UserScript==
// @name         bilibili视频下载
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  用于下载哔哩哔哩(bilibili)视频，一键跳转至下载网页
// @author       forMyself
// @match        *://www.bilibili.com/video/av*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    function parseDom(arg) {
        console.log(arg);
        let objE = document.createElement("div");
        objE.innerHTML = arg;
        return objE.childNodes[0];
    };
    let cssStyle = document.createElement("style");
    cssStyle.setAttribute('data-owner','bilibili-downloader');
    cssStyle.innerHTML = `#bilibili-download{position:fixed;left:10px;bottom:200px;width:40px;height:40px;background:#99CCFF;border-radius:50%;border:1px white solid;cursor:pointer;color:white;text-align:center;line-height:40px;box-shadow:0 0 8px #e5e9ef;transition:all 0.5s ease}
#bilibili-download:hover{transform:scale(1.1)}`
    let innerHTML = `<div id="bilibili-download">下载</div>`;
    let container = parseDom(innerHTML);
    document.body.appendChild(cssStyle);
    document.body.appendChild(container);
    container.onclick = function(){
        let downloadUrl = window.location.href.replace('bilibili','ibilibili')
        window.open(downloadUrl);
    }
})();