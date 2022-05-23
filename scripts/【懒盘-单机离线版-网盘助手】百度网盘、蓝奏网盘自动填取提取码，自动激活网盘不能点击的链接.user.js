// ==UserScript==
// @name         【懒盘-单机离线版-网盘助手】百度网盘、蓝奏网盘自动填取提取码，自动激活网盘不能点击的链接
// @namespace    https://www.lzpan.com/v2_single
// @version      1.0.1
// @description  自动提取前一页面的网盘提取码，然后到网盘填写密码页面时，进行密码填写；另外，自动激活页面中不能点击的网盘链接；
// @author       无道

// @note           2020-06-28 09:08:48 修复蓝奏网盘后面一位的问题，以及蓝奏新域名lanzoux的问题
// 支持的网盘
// @include			http*://pan.baidu.com/s/*
// @include			http*://pan.lanzou.com/*
// @include         http*://www.lanzous.com/*
// @include         http://*
// @include			https://*
// 白名单
// @exclude			http*://*.pcs.baidu.com/*
// @exclude			http*://*.baidupcs.com/*
// @exclude			http*://*:8666/file/*
// @exclude			http*://index.baidu.com/*
// @exclude			http*://*.pcs.baidu.com/*
// @exclude			http*://*.baidupcs.com/*
// @exclude			http*://*:8666/file/*
// @exclude			http*://index.baidu.com/*
// @exclude			http*://*.gov/*
// @exclude			http*://*.gov.cn/*
// @exclude			http*://*.taobao.com/*
// @exclude			http*://*.tmall.com/*
// @exclude			http*://*.alimama.com/*
// @exclude			http*://*.jd.com/*
// @exclude			http*://*.zol.com.cn/*
// @exclude			http*://*.ctrip.com/*
// @exclude			http*://*.evernote.com/*
// @exclude			http*://*.yinxiang.com/*
// @exclude			http*://*.gov/*
// @exclude			http*://*.gov.cn/*
// @exclude			http*://*.taobao.com/*
// @exclude			http*://*.tmall.com/*
// @exclude			http*://*.alimama.com/*
// @match           http://*/*
// @require			http://cdn.staticfile.org/jquery/2.1.4/jquery.min.js
// @grant           unsafeWindow
// @note            2020年5月7日15:06:45 发布离线单机版
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_deleteValue
// @grant           GM_listValues
// @grant           GM_xmlhttpRequest
// @grant           GM_info


// @icon            https://www.lzpan.com/apple-touch-icon.png
// ==/UserScript==


(function (t) {
    var a = {};

    function __webpack_require__(e) {
        if (a[e]) {
            return a[e].exports
        }
        var n = a[e] = {
            i: e,
            l: false,
            exports: {}
        };
        t[e].call(n.exports, n, n.exports, __webpack_require__);
        n.l = true;
        return n.exports
    }
    __webpack_require__.m = t;
    __webpack_require__.c = a;
    __webpack_require__.d = function (e, n, t) {
        if (!__webpack_require__.o(e, n)) {
            Object.defineProperty(e, n, {
                enumerable: true,
                get: t
            })
        }
    };
    __webpack_require__.r = function (e) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            })
        }
        Object.defineProperty(e, "__esModule", {
            value: true
        })
    };
    __webpack_require__.t = function (n, e) {
        if (e & 1) n = __webpack_require__(n);
        if (e & 8) return n;
        if (e & 4 && typeof n === "object" && n && n.__esModule) return n;
        var t = Object.create(null);
        __webpack_require__.r(t);
        Object.defineProperty(t, "default", {
            enumerable: true,
            value: n
        });
        if (e & 2 && typeof n != "string") for (var a in n) __webpack_require__.d(t, a, function (e) {
            return n[e]
        }.bind(null, a));
        return t
    };
    __webpack_require__.n = function (e) {
        var n = e && e.__esModule ?
            function getDefault() {
                return e["default"]
            } : function getModuleExports() {
                return e
            };
        __webpack_require__.d(n, "a", n);
        return n
    };
    __webpack_require__.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 1)
})([function (e, n) {
    var l = {
        info_start: "懒盘："
    },
        r = {
            baidu: /(被取消了|分享文件已过期|已经被删除|分享内容可能因为|啊哦，你来晚了|取消分享了)/gi,
            lanzou: /(被取消了|分享文件已过期|已经被删除|分享内容可能因为|啊哦，你来晚了|取消分享了)/gi
        },
        t = [/password[:： ]?([^\n]+)/gim, /解压[:： ]?(\w+)/gm, /【解压密码】\s*[:： ]?\s*([^\n]+)/gim, /\[解压密码\]\s*[:： ]?\s*([a-z\d\.:/@]+)/gim, /(?:解[压壓]密?[码碼])\s*[:： ]?\s*([a-z\d\.:/@]+)/gim, /(?:解[压壓]密?[码碼])(?:都?是|为)?\s*[:： ]?\s*([\w\.:/@]+)[^$\r\n]/gim, /(?:[解激][活压壓]密?[码碼])(?:都?是|为)?\s*[:： ]?\s*([^\w]+)[^$\r\n]/gim, /【?压缩密码】?\s*[:： ]?\s*([^\n]+)/gim, /【?[資资]源密[码碼]】?：(\w+)/];
    var i = [];

    function compute_info() {
        var e = location.href;
        var n = location.hash;
        var t = location.hostname.replace(/^www\./i, "").toLowerCase();
        var a = {};
        a.href = e;
        a.hash = n;
        a.host = t;
        return a
    }
    function element_info() {
        return {
            input_aim_el: {
                baidu: "form input",
                eyun_pwd: "input.share-access-code",
                lanzou: "#pwd",
                lanzou2: "#pwd"
            },
            notice_aim_el: {
                baidu: "form",
                eyun_pwd: "p.share-access-tip",
                lanzou: "#info",
                lanzou2: "#pwderr"
            },
            click_aim_el: {
                baidu: ".input-area > div > a > span",
                eyun_pwd: ".share-access a",
                lanzou: "#passwddiv > div > div.passwddiv-input > div",
                lanzou2: "#sub"
            }
        }
    }
    function get_disk_id(e) {
        var n;
        n = /https?:\/\/(?:pan|eyun)\.baidu\.com\/share\/init\?surl=([a-zA-Z0-9_\-]{5,25})/gi.exec(e);
        if (n && n.length === 2) {
            return n[1]
        }
        n = /https?:\/\/(?:pan|eyun)\.baidu\.com\/s\/[\d]([a-zA-Z0-9_\-]{5,25})/gi.exec(e);
        if (n && n.length === 2) {
            return n[1]
        }
        n = /https?:\/\/(?:\w+)?\.?lanzou.?\.com\/([\w-_]{6,13})/gi.exec(e);
        if (n && n.length === 2) {
            return n[1]
        }
        return null
    }
    function check_host() {
        var e = compute_info();
        var n = {
            lanzou: /(\w+)?\.?lanzou.?\.com\/.*/gim,
            baidu_pwd: /(pan|yun)\.baidu\.com\/share\/init\?surl/gi,
            baidu: /(pan|yun)\.baidu\.com\/s\/.*/gim,
            eyun_pwd: /eyun\.baidu\.com\/enterprise\/share\/init/gim
        };
        if (n.baidu_pwd.test(e.href)) {
            return "baidu_pwd"
        } else if (n.baidu.test(e.href)) {
            return "baidu"
        } else if (n.lanzou.test(e.href)) {
            return "lanzou"
        } else if (n.eyun_pwd.test(e.href)) {
            return "eyun_pwd"
        }
        return "other"
    }
    function get_pass(e, n, t, a) {
        if (!e) return;
        var r = GM_getValue(e + n);
        if (r) {
            t(r)
        } else {
            a()
        }
    }
    function unique(e) {
        for (var n = 0; n < e.length; n++) {
            for (var t = n + 1; t < e.length; t++) {
                if (e[n] === e[t]) {
                    e.splice(t, 1);
                    t--
                }
            }
        }
        return e
    }
    function get_compress_pass() {
        var e = /[【\[激活解压壓提取密码碼：:\]】]{3,}\s*([\w+\.\-\~]+)/gi;
        var n = document.body.innerText.match(e);
        var t = [];
        if (!n) return "";
        for (var a = 0; a < n.length; a++) {
            t.push(n[a]);
            i.push(n[a])
        }
        t = unique(t);
        return t.join("~~")
    }
    function do_baidu() {
        var e = compute_info();
        var n = document.referrer;
        var t = get_disk_id(e.href);
        var a = document.body.innerText;
        if (r.baidu.test(a)) {
            console.log("BDY---\x3e>>检测到失效页面.....")
        }
    }
    function do_baidu_pwd() {
        var e = compute_info();
        var t = get_disk_id(e.href);
        console.log("BDY----\x3e>>>disk_id：", t);
        var n = null;
        var a = null;
        var r = null;
        var i = element_info();
        n = $(i.input_aim_el.baidu);
        a = $(i.click_aim_el.baidu);
        r = $(i.notice_aim_el.baidu);
        var o = null;
        get_pass(t, "BDY", function (e) {
            n.val(e);
            r.siblings("div").show().text(l.info_start + "已找到密码，尝试输入。");
            a.click()
        }, function () {
            r.siblings("div").show().text(l.info_start + "未找到密码，请输入")
        });
        n.on("input", function (e) {
            var n = e.target.value.replace("*", "").trim();
            GM_setValue(t + "BDY", n)
        })
    }
    function is_lanzou_pass(e, n) {
        if (e.length !== 0 && e.css("display") !== "none") return 1;
        if (n.length !== 0 && n.css("display") !== "none") return 2;
        return 0
    }
    function do_lanzou() {
        var e = compute_info();
        var t = get_disk_id(e.href);
        console.log("LZY----\x3e>>>disk_id：", t);
        var n = element_info();
        var a = $("#passwddiv");
        var r = $("#pwdload");
        var i = null;
        var o = null;
        var u = null;
        var _ = is_lanzou_pass(a, r); //!=0 是密码页面
        if (_ !== 0) {
            if (_ === 1) {
                i = $(n.input_aim_el.lanzou);
                o = $(n.click_aim_el.lanzou);
                u = $(n.notice_aim_el.lanzou)
            } else {
                i = $(n.input_aim_el.lanzou2);
                o = $(n.click_aim_el.lanzou2);
                u = $(n.notice_aim_el.lanzou2)
            }
            get_pass(t, "LZY", function (e) {
                u.show().text(l.info_start + "已找到密码，将自动填入");
                i.val(e);
                o.click()
            }, function () {
                u.show().text(l.info_start + "未找到密码，请输入")
            });
            i.on("input", function (e) {
                var n = e.target.value.trim();
                GM_setValue(t + "LZY", n)
            })
        }
    }
    function do_eyun_pwd() {
        var e = compute_info();
        var t = get_disk_id(e.href);
        console.log("EYUN----\x3e>>>disk_id：", t);
        var n = null;
        var a = null;
        var r = null;
        var i = element_info();
        n = $(i.input_aim_el.eyun_pwd);
        a = $(i.click_aim_el.eyun_pwd);
        r = $(i.notice_aim_el.eyun_pwd);
        get_pass(t, "EYUN", function (e) {
            n.val(e);
            r.show().text(l.info_start + "已找到密码，尝试输入。");
            a.click()
        }, function () {
            r.show().text(l.info_start + "未找到密码，请输入")
        });
        n.on("input", function (e) {
            var n = e.target.value.replace("*", "").trim();
            GM_setValue(t + "EYUN", n)
        })
    }
    function do_others() {
        var c = get_compress_pass();
        document.body.addEventListener("click", function (e) {
            if (/^http/i.test(e.target.innerHTML)) return;
            var n = /(https?:\/\/(?:yun|pan|eyun).baidu.com\/s[hare]*\/[int?surl=]*[\w-_]{5,25})/gi;
            var t = /(https?:\/\/(?:\w+)?\.?lanzou.?.com\/[\w\-_]{6,13})/gi;
            if (!/<a/gi.test(e.target.innerHTML) && e.path.length > 4) {
                if (e.target.innerText.match(n)) {
                    e.target.innerHTML = e.target.innerHTML.replace(n, '<a target="_blank" href="$1" style="text-decoration:none;border: 1px solid #e74c3c;color: #c0392b;">$1</a>')
                }
                if (e.target.innerText.match(t)) {
                    e.target.innerHTML = e.target.innerHTML.replace(t, '<a target="_blank" href="$1" style="text-decoration:none;border: 1px solid #e74c3c;color: #c0392b;">$1</a>')
                }
            }
        });
        var e = /((?:https?:\/\/)?(?:yun|pan|eyun).baidu.com\/s[hare]*\/[int?surl=]*[\w-_]{5,25})/gi;
        var n = /(href=["']?https?:\/\/(yun|pan|eyun).baidu.com\/s[hare]*\/[int?surl=]*[\w-_]{5,25})/gi;
        _active_link(e, n);
        var t = /((?:https?:\/\/)?(?:\w+)?\.?lanzou.?.com\/[\w\-_]{6,13})/gi;
        var a = /(href=["']?https?:\/\/(\w+)?\.?lanzou.?.com\/[\w\-_]{6,13})/gi;
        _active_link(t, a);
        _analyze_links();

        function _active_link(a, r) {
            $(".t_f").each(function () {
                if ($(this).html().match(r)) return;
                var e = $(this).html().match(a);
                if (e) {
                    var n = $(this).html();
                    var t = a.exec(n);
                    if (t && t[0]) {
                        if (t[0].indexOf("http") === -1) {
                            n = n.replace(a, '<a target="_blank" href="http://$1" style="padding: 0 1px;color: rgb(232, 67, 147); text-decoration:none; border: 1px solid">$1</a>')
                        } else {
                            n = n.replace(a, '<a target="_blank" href="$1" style="padding: 0 1px;color: rgb(232, 67, 147); text-decoration:none; border: 1px solid">$1</a>')
                        }
                        $(this).html(n)
                    }
                }
            })
        }
        function _analyze_links() {
            var e = /(https?:\/\/(?:pan|yun|eyun)\.baidu\.com\/s\/[\w-_]{8,25})[&\w=]*[^\w]*(?:密码|授权码|提取码)*[：:]*[^\w]*([\w]{4})*/gim;
            var n = /(https?:\/\/(?:\w+)?\.?lanzou.?\.com\/[\w-_]{6,13})\/?[&\w=]*[^\w]*(?:密码|授权码|提取码)*[：:]*[^\w]*([\w]{4})*/gim;
            _analyze_public(e, "BDY");
            _analyze_public(n, "LZY")
        }
        function get_p_from_compress() {
            if (i[0]) {
                var e = /(\w+)/gi.exec(i[0]);
                return e[0] || ""
            }
            return ""
        }
        function _analyze_public(e, n) {
            var t = /.*[驗證提取密碼码：:"']+[^\w]*([\w]{3,})/gim;
            var a = document.body.innerText;
            var r = matchAll(a, e);
            for (var i = 0; i < r.length; i++) {
                var o = r[i];
                if (o.length === 3) {
                    var u = o[1];
                    var _ = o[2] || get_p_from_compress();
                    var l = get_disk_id(u);
                    if (c) {
                        GM_setValue(l + "PASS", c)
                    }
                    GM_setValue(l + n, _);
                    console.log("Find Pass:" + l + "---\x3e>>" + _ + "---\x3e>>" + n)
                }
            }
        }
        function matchAll(e, n) {
            var t = [];
            var a;
            while (a = n.exec(e)) {
                t.push(a)
            }
            return t
        }
    }
    n.compute_info = compute_info;
    n.get_disk_id = get_disk_id;
    n.check_host = check_host;
    n.do_baidu = do_baidu;
    n.do_baidu_pwd = do_baidu_pwd;
    n.do_lanzou = do_lanzou;
    n.do_others = do_others;
    n.do_eyun_pwd = do_eyun_pwd
}, function (e, n, t) {
    t(2)
}, function (e, n, t) {
    "use strict";
    t.r(n);
    var a = t(0);
    var r = t.n(a);
    var i = r.a.compute_info();
    var o = r.a.check_host();
    console.log("now page:" + o);
    switch (o) {
        case "baidu":
            r.a.do_baidu();
            break;
        case "baidu_pwd":
            r.a.do_baidu_pwd();
            break;
        case "lanzou":
            r.a.do_lanzou();
            break;
        case "eyun_pwd":
            r.a.do_eyun_pwd();
            break;
        default:
            r.a.do_others();
            break
    }
}]);