// ==UserScript==
// @name         自动展开豆瓣、站长之家、米坛、cnbeta、知乎、慕课网、Awesomes、喜马拉雅、CSDN博客、CSDN下载、道客88、百度文库、百度知道、回形针、人民日报客户端、凤凰网页面的隐藏内容
// @namespace    http://tampermonkey.net/
// @version      0.1.6
// @description  自动展开一些PC网站的隐藏内容；个人觉得手机端不需要做，故只在PC端有用；为了更好的上网体验，不兼容低版本浏览器和IE浏览器。大家如有发现类似需要手动点开隐藏内容的网站，请至以下网址反馈吧https://greasyfork.org/zh-CN/forum/discussion/72571/x
// @author       life0001
// @match        *blog.csdn.net/*
// @match        *bbs.csdn.net/*
// @match        *download.csdn.net/download/*/*
// @match        *www.doc88.com/*
// @match        *wenku.baidu.com/view/*
// @match        *zhidao.baidu.com/question*
// @match        *www.ipaperclip.net/doku.php?id=*
// @match        *wap.peopleapp.com/article/*
// @match        *ishare.ifeng.com/c/s/*
// @match        *www.ximalaya.com/*
// @match        *www.awesomes.cn/*
// @match        *www.imooc.com/article/*
// @match        *www.zhihu.com/question/*
// @match        *www.bandbbs.cn/*
// @match        *www.cnbeta.com/*
// @match        *www.chinaz.com/*
// @match        *www.douban.com/note/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const btns = Array(
        '.btn-readmore',
        '.show-hide-btn',
        '.down-arrow',
        '.paperclip__showbtn',
        '.expend',
        '.shadow-2n5oidXt',
        '.read_more_btn',
        '.QuestionRichText-more',
        '.QuestionMainAction',
        '.ContentItem-expandButton',
        '.js_show_topic',
        '.tbl-read-more-btn',
        '.more-intro-wrapper',
        '.showMore',
        '.unfoldFullText',
        '.taboola-open',
    ),
        asyncBtns = Array(
            '#continueButton',
            '.read-more-zhankai',
            '.wgt-answers-showbtn',
            '.wgt-best-showbtn',
            '.bbCodeBlock-expandLink'
        ), delay = 500;
    let timer;

    function showFull(btns, fn, isDone) {
        for (let i = 0; i < btns.length; i++) {
            try {
                continue
            }
            finally {
                const d = btns[i], dom = document.querySelectorAll(d);
                if (!!dom[0]) {
                    fn(dom, d);
                }
            }
        }
        clearTimeout(timer);
        if (!isDone) timer = setTimeout(() => showFull(btns, fn, false), delay);
    }

    function doShow(dom, d) {
        if (d === '.paperclip__showbtn') {
            dom.forEach(item => item.click());
        } else if (d === '.showMore') {
            dom[0].querySelector('span').click();
        } else {
            dom[0].click();
        }
    }

    function doAsyncShow(dom, d) {
        dom[0].click();
    }

    showFull(btns, doShow, false);
    window.addEventListener("load", () => {
        clearTimeout(timer);
        setTimeout(() => showFull(asyncBtns, doAsyncShow, true), delay);
    });
})();