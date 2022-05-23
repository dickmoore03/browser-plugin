// ==UserScript==
// @name         百度文库破解加强、全网VIP视频破解,去广告,免费在线看、全网音乐直接下载、短视频去水印下载:支持抖音、快手等，知乎使用增强、CSDN使用增强等多功能脚本
// @namespace    congcongguoke_baiduwenku_script
// @version      2.1.14
// @description  【自用长期维护更新】1：百度文库文档免费下载、内容自由复制、广告过滤等；2：视频VIP破解去广告(支持自定义接口，综合线路电视剧免跳出选集)，支持爱奇艺、腾讯、优酷、哔哩哔哩等；3：短视频去水印下载(非调用第三方,无限制下载)支持：抖音、快手；4：知乎使用增强：外链接直接跳出、回答时间标注、内容自动展开等；5：CSDN功能重构，优化中；6：全网音乐和有声音频免客户端下载,支持网易云音乐、QQ音乐、酷狗、喜马拉雅等；7：优惠券查询：支持淘宝、天猫、京东等
// @author       匆匆过客
// @include      *://wenku.baidu.com/*
// @include      *music.163.com/*
// @include      *://y.qq.com/n/yqq/song/*
// @include      *://www.kugou.com/song/*
// @include      *://www.xiami.com/song/*
// @include      *://*.ximalaya.com/*
// @include      *://*.kugou.com/*
// @include      *://*.xiami.com/*
// @include      *://www.iesdouyin.com/share/video/*
// @include      *://*.zhihu.com/*
// @include      *://v.vzuu.com/video/*
// @include      *://video.zhihu.com/video/*
// @include      *://blog.csdn.net/*/article/details/*
// @include      *://*.blog.csdn.net/article/details/*
// @include      *://bbs.csdn.net/*
// @include      *://www.csdn.net/*
// @include      *://*.iteye.com/blog/*
// @include      *://*.youku.com/v_*
// @include      *://*.iqiyi.com/v_*
// @include      *://*.iqiyi.com/w_*
// @include      *://*.iqiyi.com/a_*
// @include      *://*.le.com/ptv/vplay/*
// @include      *://v.qq.com/x/cover/*
// @include      *://v.qq.com/x/page/*
// @include      *://*.tudou.com/listplay/*
// @include      *://*.tudou.com/albumplay/*
// @include      *://*.tudou.com/programs/view/*
// @include      *://*.mgtv.com/b/*
// @include      *://film.sohu.com/album/*
// @include      *://tv.sohu.com/v/*
// @include      *://*.acfun.cn/v/*
// @include      *://*.bilibili.com/video/*
// @include      *://*.bilibili.com/anime/*
// @include      *://*.bilibili.com/bangumi/play/*
// @include      *://*.baofeng.com/play/*
// @include      *://vip.pptv.com/show/*
// @include      *://v.pptv.com/show/*
// @include      *://item.taobao.com/*
// @include      *://*detail.tmall.com/*
// @include      *://*detail.tmall.hk/*
// @include      *://*product.suning.com/*
// @include      *://*item.jd.com/*
// @include      *://*detail.vip.com/*
// @include      *://*mobile.yangkeduo.com/goods*
// @include      *://video.kuaishou.com/*/*
// @include      *://www.eggvod.cn/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @connect      kuaishou.com
// @connect      ixigua.com
// @connect      zhihu.com
// @connect      vzuu.com
// @connect      douyinvod.com
// @connect      aweme.snssdk.com
// @connect      iesdouyin.com
// @connect      t.mimixiaoke.com
// @connect      t.jtm.pub
// @connect      cdn.jsdelivr.net
// @connect      pcw-api.iqiyi.com
// @grant        GM_info
// @grant        GM_download
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// @charset		 UTF-8
// ==/UserScript==

(function() {
	'use strict';
	
	/////***********************
	//true:开启  false:关闭，想关闭某个模块只需把对应的值改为false即可
	var isOpenWenkuModule = true;      //是否开启文库功能模块
	var iSOpenDouyinModule = true;     //是否开启抖音功能模块
	var iSOpenKuaishouModule = true;     //是否开启快手功能模块
	var isOpenVideoVipModule = true;   //是否开启视频解析模块
	var isOpenMusicVipModule = true;   //是否开启音乐解析模块
	var isOpenGoodsCouponModule = true;//是否开启优惠券模块
	var isOpenZhihuModule = true;      //是否开启知乎优化模块
	var isOpenCsdnModule = true;      //是否开启CSDN优化模块
	/////***********************
	
	var $ = $ || window.$;
	var window_url = window.location.href;
	var website_host = window.location.host;
	
	//自定义视频解析接口
	var customizeMovieInterface=[
		//{"name":"此处填接口名称","url":"此处填接口url"}
	];
	
	//--百度文库开始
	var baiduwenkuHelper={};
	baiduwenkuHelper.wenkudownloadUrl = "http://www.tool77.com/tampermonkey/doc/download?wenku_url=";
	baiduwenkuHelper.removeAD=function(){
    	if(website_host.indexOf("wenku.baidu.com") != -1){
		    setInterval(function(){
		    	$(".banner-ad").hide();
		    	$(".union-ad-bottom").hide();
		    	$("iframe").hide();
		    	
		    	//VIP去广告小按钮
		    	$(".ggbtm-vip-close").hide();
		    	$(".ad-vip-close-bottom").hide();
		    	$(".ad-vip-close").hide();
		    	
		    	//搜索页面
		    	$("#fengchaoad").hide();
		    	$(".search-aside-adWrap").hide();
		    },300);
	    }
	};
	baiduwenkuHelper.generateHtml=function(){
		var $that = this;
    	if(window_url.indexOf("wenku.baidu.com/view")==-1 || website_host!="wenku.baidu.com"){
    		return;
    	}
		
		this.openAllPage();  //折叠的文档全部展开
		
		var topBox = "<div style='position:fixed;z-index:999999;background-color:#ccc;cursor:pointer;top:40%;left:0px;'>"+
						"<div id='baiduwenku_helper_download_btn' style='font-size:12px;padding:8px 2px;color:#FFF;background-color:#25AE84;'>下载</div>"+
						"<div id='baiduwenku_helper_copyall_btn' style='font-size:12px;padding:8px 2px;color:#FFF;background-color:#FE8A23;'>复制</div>"+
				 	 "</div>";
		$("body").append(topBox);
		
		//解析下载
		$("body").on("click","#baiduwenku_helper_download_btn",function(){
			var wenkuUrl = $that.wenkudownloadUrl+encodeURIComponent(window_url);
			GM_openInTab(wenkuUrl, { active: true });
		});
		
		if($("#reader-container").length == 0){ //这是旧的文档展示页面
			var onePageCopyContentHtml = '<div class="baiduwenku_helper_copy_onepage" style="float:left;padding:3px 8px;background:green;z-index:999;position:relative;top:60px;color:#fff;background-color:#FE8A23;font-size:13px;cursor:pointer;">复制此页面内容</div>'; 
			$('.mod.reader-page.complex, .ppt-page-item, .mod.reader-page-mod.complex, .reader-page-wrap').each(function() {
				$(this).prepend(onePageCopyContentHtml);
			});
			//复制全部文档内容
			$("body").on("click","#baiduwenku_helper_copyall_btn",function(){
				$that.copybaiduWenkuAll();
			});
			//复制每一页内容
			$("body").on("click",".baiduwenku_helper_copy_onepage",function(){
				var $inner = $(this).parent(".mod").find(".inner")
				$that.copybaiduWenkuOne($inner, true);
			});
		}else{ //新的付费页面
			var onePageCopyContentHtml = '<div class="baiduwenku_helper_copy_onepage" style="float:left;padding:3px 8px;background:green;z-index:999;position:relative;top:60px;color:#fff;background-color:#FE8A23;font-size:13px;cursor:pointer;">复制此页面内容</div>'; 
			setInterval(function(){  //添加复制按钮
				$('.reader-page').each(function() {
					if($(this).find(".baiduwenku_helper_copy_onepage").length==0){
						$(this).prepend(onePageCopyContentHtml);
					}
				});
			},200);
			//复制全部文档内容
			$("body").on("click","#baiduwenku_helper_copyall_btn",function(){
				$that.copybaiduWenkuAll_VIP();
			});
			//复制每一页内容
			$("body").on("click", ".baiduwenku_helper_copy_onepage", function(){
				$that.copybaiduWenkuOne_VIP($(this).parents(".reader-page"), true);
			});
		}		
   	};
    baiduwenkuHelper.showBaiduCopyContentBox=function(str){
    	var ua = navigator.userAgent;
    	var opacity = '0.95';
		if (ua.indexOf("Edge") >= 0) {
		    opacity = '0.6';
		} else{
		    opacity = '0.95';
		}
    	var copyTextBox = '<div id="baiduwenku_helper_copy_text_box" style="width:100%;height:100%;position: fixed;z-index: 9999;display: block;top: 0px;left: 0px;background:rgba(255,255,255,' + opacity + ');-webkit-backdrop-filter: blur(20px);display: flex;justify-content:center;align-items:center;">'+
    						'<div id="baiduwenku_helper_copy_box_close" style="width:100%;height:100%;position:fixed;top:0px;left:0px;"><div style="font-size:16px;margin-top:20px;text-align:center;"><b>点击文本外关闭弹框</b></div></div>'+
    					  	'<pre id="baiduwenku_helper_copy_text_content" style="padding:20px;border:1px solid #CCC;border-radius:4px;width:60%;font-size:16px;line-height:22px;z-index:10000;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;word-break:break-all;max-height:70%;overflow:auto;"></pre>'+
    					  '</div>"';
    	$('#baiduwenku_helper_copy_text_box').remove();
	    $('body').append(copyTextBox);
	    $('#baiduwenku_helper_copy_text_content').html(str);
	    $('#baiduwenku_helper_copy_box_close').click(function() {
	       $('#baiduwenku_helper_copy_text_box').remove();
	    });
   	};
   	baiduwenkuHelper.showDialog=function(str){
   		var dialogHtml = '<div id="baiduwenku_helper_dialog" style="margin:0px auto;opacity:0.8;padding:5px 10px;position:fixed;z-index: 10001;display: block;bottom:30px;left:44%;color:#fff;background-color:#CE480F;font-size:13px;border-radius:3px;">'+str+'</div>';
   		$('#baiduwenku_helper_dialog').remove();
	    $('body').append(dialogHtml);
	    setTimeout(function(){
	    	$('#baiduwenku_helper_dialog').remove();
	    }, 1500);
   	};
	baiduwenkuHelper.openAllPage=function(){
		var readall = $(".read-all");
		if(readall.length!=0){
			setTimeout(function(){
				readall.click();
			},100);
		};
		
		var bannerMoreBtn = $(".banner-more-btn");
		if(bannerMoreBtn.length!=0){
			setTimeout(function(){
				bannerMoreBtn.click();
			},100);
		}
	};
	
	/*** 新页面内容提取 ****/
	baiduwenkuHelper.copybaiduWenkuAll_VIP=function(){
		var contentHtml = "";
		var that = this;
		$(".reader-page").each(function(){
			contentHtml += that.copybaiduWenkuOne_VIP($(this), false);
		});
		if(!!contentHtml){
			this.showBaiduCopyContentBox(contentHtml);
		}else{
			this.showDialog("提取文档内容失败了");
		}
	};
	baiduwenkuHelper.copybaiduWenkuOne_VIP=function($page, isappend){
		var $that = this;
		var contentHtml = "";  //提取文字
		var picNum = 0;        //图片数目
		var picTemplate = "<div style='margin:10px 0px;text-align:center;'><img src='@' width='90%'><div>____图(#)____</div></div>";
		
		//word，xlsx类型的文档
		$page.find(".reader-pic-layer,.reader-txt-layer").each(function(){
			if($(this).hasClass("reader-pic-layer")){
				$(this).find("img").each(function(){
					var imageurl = $(this).attr("src");
					if(!!imageurl){
						picNum++;
						var imageHtml = picTemplate;
						imageHtml = imageHtml.replace(/#/g,picNum);
						imageHtml = imageHtml.replace(/@/g,imageurl);
						contentHtml += imageHtml;
					}
				});
			}else{
				$(this).find(".reader-word-layer").each(function(){
					contentHtml += $(this).text().replace(/\u2002/g, ' ');
				});
			}
		});
		
		//txt类型的文档
		$page.find(".p-txt").each(function(){
			contentHtml += $(this).text().replace(/\u2002/g, ' ');
		});
		
		contentHtml = contentHtml.replace(/。\s/g, '。\r\n');
		if(!!contentHtml){
			if(isappend){
				$that.showBaiduCopyContentBox(contentHtml);
			}
			return contentHtml;
		}else{
			if(isappend){
				$that.showDialog("提取文档内容失败了");
			}
			return "";
		}
	}
	
	/*** 旧页面内容提取 ****/
    baiduwenkuHelper.copybaiduWenkuAll=function(){
		var contentHtml = "";
		var that = this;
		$(".inner").each(function(){
			contentHtml += that.copybaiduWenkuOne($(this), false);
		});
		if(!!contentHtml){
			this.showBaiduCopyContentBox(contentHtml);
		}else{
			this.showDialog("提取文档内容失败了");
		}
    };
    baiduwenkuHelper.copybaiduWenkuOne=function($inner, isappend){
    	var $that = this;
		var str = "";  //提取文字
		
		$inner.find('.reader-word-layer').each(function(){
			str += $(this).text().replace(/\u2002/g, ' ');
		});
		$inner.find('.p-txt').each(function(){
			str += $(this).text().replace(/\u2002/g, ' ');
		});
		str = str.replace(/。\s/g, '。\r\n');
		
		//提取css中的图片
		var picHtml = "";
		var picUrlReg = /\(((\'|\")?https.*?)\)/i;
		var cssUrl = "";
		var picNum = 0;
		var picUrlLengthMin = 65;
		var picTemplate = "<div style='margin:10px 0px;text-align:center;'><img src='@' width='90%'><div>____图(#)____</div></div>";
		$inner.find('.reader-pic-item').each(function(){
			cssUrl= $(this).css("background-image");
			if(!!cssUrl && (cssUrl.indexOf("https")!=-1 || cssUrl.indexOf("HTTPS")!=-1)){
				var array = cssUrl.match(picUrlReg);
				if(array.length>1){
					cssUrl = array[1].replace(/\"/g, "");
					if(!!cssUrl && cssUrl.length>picUrlLengthMin){
						picNum ++;
						var onePic = picTemplate;
						onePic = onePic.replace(/#/g,picNum);
						onePic = onePic.replace(/@/g,cssUrl);
						picHtml += onePic;
					}
				}
			}
			
		});
		
		var srcUrl = "";
		$inner.find('img').each(function(){
			srcUrl = $(this).attr("src");
			if(!!srcUrl && srcUrl.length>picUrlLengthMin && srcUrl.indexOf("https://wkretype")!=-1){
				picNum ++;
				var onePic = picTemplate;
				onePic = onePic.replace(/#/g,picNum);
				onePic = onePic.replace(/@/g,srcUrl);
				picHtml += onePic;
			}
		});
		
		//追加内容
		var contentHtml = str+picHtml;
		if(!!contentHtml && contentHtml.length>0){
			if(isappend){
				$that.showBaiduCopyContentBox(contentHtml);
			}
			return contentHtml;
		}else{
			if(isappend){
				$that.showDialog("提取文档内容失败了");
			}
			return "";
		}
    };
	baiduwenkuHelper.start=function(){
		this.generateHtml();
		this.removeAD();
	};
	if(isOpenWenkuModule){
		baiduwenkuHelper.start();
	}

	//音乐下载：无损音乐、封面、歌词
	var musicvip={};
	musicvip.eleId = Math.ceil(Math.random()*100000000);
	musicvip.judgeVipWebsite=function(){
		var musicurls=[
			"music.163.com","y.qq.com","www.kugou.com","www.kuwo.cn","www.xiami.com","music.taihe.com","music.migu.cn","lizhi.fm","qingting.fm","ximalaya.com"
		];
		for(var i=0; i<musicurls.length;i++){
			if(window.location.host.indexOf(musicurls[i])!=-1){
				return true;
			}
		}
		return false;
	};
	musicvip.addStyle=function(){
		var innnerCss = 
		"#plugin_kiwi_analysis_vip_music_box_"+this.eleId+" {position:fixed; top:290px; left:0px; width:35px; background-color:#BC2405;z-index:9999999899999;}"+
		"#plugin_kiwi_analysis_vip_music_box_"+this.eleId+" >.plugin_item{cursor:pointer; width:33px; padding:10px 0px; text-align:center;}"+
		"#plugin_kiwi_analysis_vip_music_box_"+this.eleId+" >.plugin_item >img{width:23px; display:inline-block; vertical-align:middle;}";
		$("body").prepend("<style>"+innnerCss+"</style>");
	};
	musicvip.generateHtml=function(){
		var html="";
		var vipImgBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC2UlEQVRoQ+2ZT4hNYRjGf8+CoiyUDZIpSmSh2CmZYoqNPwsWIkkpzYJSshkz2UihMGIyC7FQiij5MwujbPyLlEgWhCxorCysXn2n996+Od2rc+45d+5Mc77V/d7z3ed9n/d53+/7zr1iig9N8fipCHRawUqBSaWAmT3udEAZ/Q9IGg1rx5WQmVlGgE4v654WBAZypDkoF6uZnueAarr0ePQkkwKhzvrL8FwGRqq8KwJlJDUXRqVArnS1YXGlQBuSmgtyeitgZi+ANZ6yYUn74/SZ2SBw0G23JW03s3CG1A8fSclBl7ZHOGPAQ2BU0lBankIKmNl5oNdB3wGrJf2tOTGzJ8A6n/dKGmyBQBzzK0m1hCX2ogR2AdcjDz2SRhx4PvAZmOnPl0v6UJBAgBqSdCBKUnzRzHcSm9kS4DUwxwH7JJ1wAhuAhEwYzUqliT1ciWt3rqXAOWBWlKhNkh4UVsABHgEbHfy+pM1uPwScdft7SSsa1XozApK6U/0UZ/qkpGNlEQiZ6nNnv4Flkn6a2S1gm9uvStpbkEDc/KGhE4KFesABQsbvRdnaIemmmYXdY67b90i6VpDAN2Ch452WdKQsAvOAl8BiB78InAE+RaQWSPrRCgEz6/JtN1HQR5KkUgg4yA1gp4O/AS4AV3z+RVIIIhkl7EL18imTwGHPei3OUC67fXJH0tYSCYQe+xjhtb6NRiBrgaeRxF+BRT7vl1R/DW1Rge+hz+L9v2wCM4DnwKqIRO3jFkl3cyoQnwNjkt42wK2VZHEFvBYvAfUT0h3+Arok/clLIH0OTASBfcBwytGIpJ7YlrGExjVqs+BLa2IHWgk8A2ZHDk9JOjolCDiJ9E+QlyWFLbY+Jq0C/5O5nc8KXyXaGVwW7IpAliy1c01LCoT303YGlRM73jgyvZHlxJ/Q5RWBCU13A2dNFVjf6ciy+m/4F1PWL0+mddX/xJ1Wo1Kg0wr8A+MVb0/64L+RAAAAAElFTkSuQmCC";
		html+= "<div id='plugin_kiwi_analysis_vip_music_box_"+this.eleId+"'>";
		html+= "<div class='plugin_item jump_analysis_website' title='VIP音乐破解，免客户端下载！'><img src='"+vipImgBase64+"'></div>";
		html+= "</div>";
		$("body").append(html);
	};
	musicvip.operation=function(){
		var that = this;
		$("#plugin_kiwi_analysis_vip_music_box_"+this.eleId+"").on("click", function(){
			var currentHost = window.location.host;
			var currentUrl = window.location.href;
			var playUrl = "";
			if(currentUrl.match(/music\.163\./)){
				var playUrl=";"
				if(currentUrl.match(/^https?:\/\/music\.163\.com\/#\/(?:song|dj)\?id/)) {
					playUrl = 'https://music.liuzhijin.cn/?url='+encodeURIComponent(currentUrl);
				}else if(currentUrl.match(/^https?:\/\/y\.music\.163\.com\/m\/(?:song|dj)\?id/)) {
					playUrl = 'https://music.liuzhijin.cn/?url='+encodeURIComponent('https://music.163.com/song?id='+getQueryString('id'));
				}
			}else if(currentUrl.match(/y\.qq\.com/)){
                var qqSong = currentUrl.match(/\/n\/yqq\/song\/(\S*).html/);
				var playUrl = 'https://music.liuzhijin.cn/?id='+qqSong[1]+'&type=qq';
            }
			else if(currentUrl.match(/kugou\.com/)){
				var kgSong = currentUrl.match(/hash=(\S*)&album/);
				var playUrl = 'https://music.liuzhijin.cn/?id='+kgSong[1]+'&type=kugou';
			}else if(currentUrl.match(/kuwo\.cn/)){
				var kwSong = currentUrl.match(/play_detail\/(\S*)/);
				var playUrl = 'https://music.liuzhijin.cn/?id='+kwSong[1]+'&type=kuwo';
			}else if(currentUrl.match(/www\.xiami\.com/)){
                var xmSong = currentUrl.match(/song\/(\S*)/);
				var playUrl = 'https://music.liuzhijin.cn/?id='+xmSong[1]+'&type=xiami';
            }else if(currentUrl.match(/www\.ximalaya\.com/)){
                var xmlyUrlArr = currentUrl.split("/");
                for(var xuaIndex =0;xuaIndex<xmlyUrlArr.length;xuaIndex++){
                    if(xuaIndex==xmlyUrlArr.length-1){
						playUrl = 'https://music.liuzhijin.cn/?id='+xmlyUrlArr[xuaIndex]+'&type=ximalaya&playUrl='+encodeURIComponent(currentUrl);
                    }
                }
            }
			if(!!playUrl){
				GM_openInTab(playUrl, false);
			}
		})
	};
	musicvip.start=function(){
		if(this.judgeVipWebsite()){
			this.addStyle();
			this.generateHtml();
			this.operation();
		}
	};
	if(isOpenMusicVipModule){
		musicvip.start();
	}
	
	//--抖音解析开始
	var douyingHelper={};
	douyingHelper.anasetinterval=null;
	douyingHelper.generateHtml = function(){
		var innnerCss = ".video_analysis_889988{font-size:12px;padding:8px;text-align:center;color:#FFF;background-color:#F93A60;cursor:pointer;margin-bottom:15px;};";
		$("body").prepend("<style>"+innnerCss+"</style>");
		var topBox = "<div style='position:fixed;z-index:999999;top:40%;left:0px;'>"+
						"<div class='video_analysis_889988'><a style='color:#FFFFFF;' href='http://www.tool77.com/video' target='_blank'>网页解析</a></div>"+
						"<div id='douyin_helper_download_btn' class='video_analysis_889988'><a style='color:#FFFFFF;' href='javascript:void(0);' target='_blank'>本地解析：准备中</a></div>"+
				 	 "</div>";
		$("body").append(topBox);
	};
	douyingHelper.isDouyin=function(){
		if(window_url.indexOf("www.iesdouyin.com/share/video")!=-1){
			return true;
		}
		return false;
	}
	douyingHelper.getDownloadUrl=function(){
		var times=1;
		this.anasetinterval = setInterval(function(){
			$("#douyin_helper_download_btn").find("a").text("本地解析：准备中("+times+"S)");
			times++;
		},1000);
		
		var $that = this;
		return new Promise(function(resolve, reject){
			try{
				var windowurl = window.location.href;
				var itemID = windowurl.split("?")[0].replace("https://www.iesdouyin.com/share/video/","").replace("/","");
				var getVisitedUrl = "https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids="+itemID;
				GM_xmlhttpRequest({
					url: getVisitedUrl,
				  	method: "get",
				  	headers: {
				  		'User-agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36'
				  	},
				  	onload: function(response) {
						var status = response.status;
						if(status==200||status=='200'){
							var responseText = response.responseText;
							if(!!responseText){
								try{
									var jsonObjeect = JSON.parse(responseText);
									var item_list = jsonObjeect["item_list"][0]["video"]["play_addr"]["url_list"][0];
									resolve({"status":"success", "playerUrl":item_list})
								}catch(e){}
							}
						}
						reject({"status":"error"});
				  	}
				});
			}catch(e){
				reject({"status":"error"});
			}
		});
	};
	douyingHelper.getPlayerUrl=function(){
		this.getDownloadUrl().then((data)=>{
			var playerUrl = data.playerUrl;
			playerUrl = playerUrl.replace("playwm","play");  //新版本需要20200428，改版
			var $a = $("#douyin_helper_download_btn").find("a");
			GM_xmlhttpRequest({
				url: playerUrl,
			  	method: "get",
			  	headers: {
			  		'User-agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36'
			  	},
			  	onload: function(response) {
					clearInterval(douyingHelper.anasetinterval);
					douyingHelper.anasetinterval=null;
					
					var status = response.status;
					if(status==200||status=='200'){
						var finalUrl = response.finalUrl;
						if(!!finalUrl){
							$a.text("本地解析：点我下载");
							$a.attr("href",finalUrl);
						}else{
							$a.text("本地解析：出错了");
						}
					}
			  	}
			});
		}).catch((error)=>{$a.text("本地解析：出错了");});
	};
	douyingHelper.start=function(){
		if(this.isDouyin()){
			this.generateHtml();
			this.getPlayerUrl();
		}
	}
	if(iSOpenDouyinModule){
		douyingHelper.start();
	}
	
	//快手去水印下载
	var kuaishouHelper={};
	kuaishouHelper.anasetinterval=null;
	kuaishouHelper.isKuaiShou=function(){
		var windowurl = window.location.href;
		if(windowurl.indexOf("video.kuaishou.com")!=-1){
			return true;
		}
		return false;
	};
	kuaishouHelper.generateHtml = function(){
		var innnerCss = 
		`
			.video_analysis_889988{font-size:12px;padding:8px;text-align:center;color:#FFF;background-color:#F93A60;cursor:pointer;margin-bottom:15px;};
			#douyin_helper_download_play{display:none;}
		`;
		$("body").prepend("<style>"+innnerCss+"</style>");
		var topBox = "<div style='position:fixed;z-index:999999;top:40%;left:0px;'>"+
						"<div class='video_analysis_889988'><a style='color:#FFFFFF;' href='http://www.tool77.com/video' target='_blank'>网页解析</a></div>"+
						"<div id='douyin_helper_download_analysis' class='video_analysis_889988'>本地解析：点我解析</div>"+
					 "</div>";
		$("body").append(topBox);
	};
	kuaishouHelper.getPlayerUrl=function(){
		var $analysis = $("#douyin_helper_download_analysis");
		var isRun = false;
		var $that = this;
		$analysis.on("click", function(){
			if(isRun) return;
			var windowurl = window.location.href;
			if(windowurl.indexOf("#")!=-1){
				windowurl = windowurl.split("#")[0];
			}
			if(windowurl.indexOf("?")!=-1){
				windowurl = windowurl.split("?")[0];
			}
			var urlArray = windowurl.split("/");
			var sourceId = urlArray[urlArray.length-1];
			if(!sourceId){
				return;
			}
			windowurl = "https://c.kuaishou.com/fw/photo/"+sourceId;
			var times=1;
			isRun = true;
			$that.anasetinterval = setInterval(function(){
				$analysis.text("本地解析：准备中("+times+"S)");
				times++;
			},1000);
			//windowurl = windowurl.replace("https://video.kuaishou.com/featured", "https://c.kuaishou.com/fw/photo");
			GM_xmlhttpRequest({
				url: windowurl,
				method: "get",
				headers: {
					'User-agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36'
				},
				onload: function(response) {
					var status = response.status;
					var playurl = "";
					if(status==200||status=='200'){
						var responseText = response.responseText;
						if(!!responseText){
							try{
								playurl = responseText.match(/"srcNoMark":"(https:\/\/.*?)"/i)[1];
							}catch(e){}
						}
					}
					console.log("playurl="+playurl);
					clearInterval(kuaishouHelper.anasetinterval);
					kuaishouHelper.anasetinterval==null;
					isRun=false;
					if(!!playurl){
						$analysis.text("本地解析：点我解析");
						GM_openInTab(playurl, false);
					}else{
						$analysis.text("本地解析：失败：点我重试");
					}
				}
			});
		});
	};
	kuaishouHelper.start=function(){
		if(this.isKuaiShou()){
			kuaishouHelper.generateHtml();
			kuaishouHelper.getPlayerUrl();
		}
	};
	if(iSOpenKuaishouModule){
		kuaishouHelper.start();
	}
	
	//--VIP视频破解开始
	var movievipHelper={};
	movievipHelper.customizeSourceArray=customizeMovieInterface;
	movievipHelper.defaultSourceArray=[{"name":"纯净解析","url":"https://z1.m1907.cn/?jx="},{"name":"高速接口","url":"https://api.sigujx.com/?url="},{"name":"B站解析1","url":"https://vip.parwix.com:4433/player/?url="},{"name":"B站解析2","url":"https://www.cuan.la/m3u8.php?url="},{"name":"Ckplayer","url":"https://www.ckplayer.vip/jiexi/?url="},{"name":"BL","url":"https://vip.bljiex.com/?v="},{"name":"大侠","url":"https://api.10dy.net/?url="},{"name":"ELW","url":"https://jx.elwtc.com/vip/?url="},{"name":"爱跟","url":"https://vip.2ktvb.com/player/?url="},{"name":"冰豆","url":"https://api.bingdou.net/?url="},{"name":"八八","url":"https://jiexi.q-q.wang/?url="},{"name":"百域","url":"https://jx.618g.com/?url="},{"name":"ckmov","url":"https://www.ckmov.vip/api.php?url="},{"name":"大幕","url":"https://jx.52damu.com/dmjx/jiexi.php?url="},{"name":"迪奥","url":"https://123.1dior.cn/?url="},{"name":"福星","url":"https://jx.popo520.cn/jiexi/?url="},{"name":"跟剧","url":"https://www.5igen.com/dmplayer/player/?url="},{"name":"RDHK","url":"https://jx.rdhk.net/?v="},{"name":"H8","url":"https://www.h8jx.com/jiexi.php?url="},{"name":"豪华","url":"https://api.lhh.la/vip/?url="},{"name":"黑云","url":"https://jiexi.380k.com/?url="},{"name":"蝴蝶","url":"https://api.hdworking.top/?url="},{"name":"IK","url":"https://vip.ikjiexi.top/?url="},{"name":"解析la","url":"https://api.jiexi.la/?url="},{"name":"久播","url":"https://jx.jiubojx.com/vip.php?url="},{"name":"九八","url":"https://jx.youyitv.com/?url="},{"name":"老板","url":"https://vip.laobandq.com/jiexi.php?url="},{"name":"乐喵","url":"https://jx.hao-zsj.cn/vip/?url="},{"name":"M3U8","url":"https://jx.m3u8.tv/jiexi/?url="},{"name":"MUTV","url":"https://jiexi.janan.net/jiexi/?url="},{"name":"明日","url":"https://jx.yingxiangbao.cn/vip.php?url="},{"name":"磨菇","url":"https://jx.wzslw.cn/?url="},{"name":"诺诺","url":"https://www.ckmov.com/?url="},{"name":"诺讯","url":"https://www.nxflv.com/?url="},{"name":"OK","url":"https://okjx.cc/?url="},{"name":"思云","url":"https://jx.ap2p.cn/?url="},{"name":"思古","url":"https://api.sigujx.com/?url="},{"name":"思古2","url":"https://api.bbbbbb.me/jx/?url="},{"name":"思古3","url":"https://jsap.attakids.com/?url="},{"name":"tv920","url":"https://api.tv920.com/vip/?url="},{"name":"维多","url":"https://jx.ivito.cn/?url="},{"name":"我爱","url":"https://vip.52jiexi.top/?url="},{"name":"无名","url":"https://www.administratorw.com/video.php?url="},{"name":"小蒋","url":"https://www.kpezp.cn/jlexi.php?url="},{"name":"小狼","url":"https://jx.yaohuaxuan.com/?url="},{"name":"智能","url":"https://vip.kurumit3.top/?v="},{"name":"星驰","url":"https://vip.cjys.top/?url="},{"name":"星空","url":"http://60jx.com/?url="},{"name":"月亮","url":"https://api.yueliangjx.com/?url="},{"name":"云端","url":"https://jx.ergan.top/?url="},{"name":"云析","url":"https://jx.yparse.com/index.php?url="},{"name":"17云","url":"https://www.1717yun.com/jx/ty.php?url="},{"name":"33t","url":"https://www.33tn.cn/?url="},{"name":"41","url":"https://jx.f41.cc/?url="},{"name":"66","url":"https://api.3jx.top/vip/?url="},{"name":"116","url":"https://jx.116kan.com/?url="},{"name":"200","url":"https://vip.66parse.club/?url="},{"name":"4080","url":"https://jx.urlkj.com/4080/?url="},{"name":"973","url":"https://jx.973973.xyz/?url="},{"name":"8090","url":"https://www.8090g.cn/?url="}];
	movievipHelper.getServerSource=function(){
		GM_xmlhttpRequest({
			url:"https://cdn.jsdelivr.net/gh/pizcat/static@master/url_01.json?t="+Math.random(),
			method:"GET",
			headers:{"Content-Type": "application/x-www-form-urlencoded"},
			timeout:1500,
			synchronous: false,
			onload: function(response) {
				var status = response.status;
				if(status==200||status=='200'){
					try{
						var serverResponseJson = JSON.parse(response.responseText);
						if(serverResponseJson.length!=0){
							movievipHelper.defaultSourceArray = serverResponseJson;//覆盖掉本地地址
						}
					}catch(e){
						console.log("serverResponseJson error"+e);
					}
				}
				movievipHelper.defaultSourceArray = movievipHelper.customizeSourceArray.concat(movievipHelper.defaultSourceArray);
				//执行操作
				movievipHelper.addStyle();
				movievipHelper.generateHtml();
				movievipHelper.operation();
				console.log("onload................");
			},
			onerror : function(err){
				movievipHelper.defaultSourceArray = movievipHelper.customizeSourceArray.concat(movievipHelper.defaultSourceArray);
				//执行操作
				movievipHelper.addStyle();
				movievipHelper.generateHtml();
				movievipHelper.operation();
				console.log("onerror................");
			}
		});
	};
	movievipHelper.eleId = Math.ceil(Math.random()*100000000);
	movievipHelper.judgeVipWebsite=function(){
		var isVip = false;
		var host = window.location.host;
		var vipWebsites = ["iqiyi.com","v.qq.com","youku.com", "le.com","tudou.com","mgtv.com","sohu.com",
			"acfun.cn","bilibili.com","baofeng.com","pptv.com"];
   		for(var b=0; b<vipWebsites.length; b++){
	   		if(host.indexOf(vipWebsites[b]) != -1){
	   			isVip = true;
	   			break;
	   		}
	   	}
   		return isVip;
	};
	movievipHelper.addStyle=function(){
		var themeColor = "#DD001B"; 
		var innnerCss = 
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" {position:fixed;top:180px; left:0px; padding:5px 0px; width:35px;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item{cursor:pointer; width:33px; text-align:center;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.jump_analysis_website{padding:10px 0px;background-color:"+themeColor+";}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.open_page_inner_source{margin-top:10px; padding:5px 0px;background-color:"+themeColor+";}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item >img{width:23px; display:inline-block; vertical-align:middle;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box{display:none;width:310px;height:400px;position:absolute;left:33px;overflow:hidden;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box{width:330px;height:100%;padding-left:10px;overflow-y:scroll;overflow-x:hidden;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box> table{width:300px;border-spacing:5px;border-collapse:separate;line-height:25px;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box> table td{width:33%;color:#fff;font-size:12px;text-align:center;cursor:pointer;background-color:"+themeColor+";box-shadow:0px 0px 5px #fff;border-radius:3px;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box> table td:hover{color:#260033;background-color:#D6717C}";
		$("body").prepend("<style>"+innnerCss+"</style>");
	};
	movievipHelper.generateHtml=function(){
		var html="";
		var vipImgBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABACAYAAABFqxrgAAADBklEQVR4Xu2cz6tNURTHP7tI5iRlID9CJFMlkYGSRPGklBRKiCSSxJMBkYGSgWQq/gBT/gMDUzMzf8RX6959nuO9e+75sff54d69B+/W23evvdbnrLX32j/OdfgiaStwGzgBvHfOPc7qln9KsrpHRfU9/n+xgt6ngW/AK+fcT9PV2R9JZ4A3wHpvQBVh/yuETO/fwDXn3GfnAXxa9vTmAUJm8oJBMADmCfkyTxC+GAT1GMOD6DpBsIExeUKCMArH5AkJwnhcTp4wBcI85QmFnpAgAAlCgjAeMJMnJAjJE5YWdSkcIq5vvwP7IsprRVSrGaNzzuSfAz4Aa1qxIILQ1iHkNnKfAA8j6BxdRGcQ/IbuOuAtYDu+gymdQsh5xX7gHbB7CCR6gZCDccGPF6Ot/75KrxB8iKwCngL35hZCzit2Ac/8CVinPIo8YRH4OkWTQ1WO4WyKrGuNJDsGfAlsr9vW0v0mehdCqHCmV3oM1wRCzjPuAC9qgmiU6Q4Wgh8vNgJ2+HulIozZg5DzioMexuESGLMLIQfjkh+LNhXAmH0IPkTueq9YOwHEbEOQdMobv3dKSMwmBEl7fAhUWW/EhTCBdnaEn839bU+RtvS2PmyqXF11dmiid+9p8yTjJF0ELPZ3VjQ+6GuDgiDpAHAfOBZkVc3Gg4AgaQPwALieXSaraUfQ13uHIOmmN35bkCUBjXuDIOm4N/5ogP5RmnYOQdIOwJ7+1SgWRBDSGQRJNrXajVmL+80RdI8mYtp+QlknlfMESSe98UfKhAbW235CWVmhd6tLacBS3BvA5TLNItXHzRhjbKoAv4CiFV8ku/8RM0gIbRg6TWaC0PRKQdtjQvKErgkkTxgTjzsmNNm/7+HJL+8y6rnDAOzpToVW0+buzAjrKUFIF7zHHpQ8IUFInrA0mqZw8OHwY8IFqkaZV9hEFaV1E71HL4c+9wcdeS2aCItiRaCQJnovZC+MfwTO5hRoIixQ/yjN6+j994XxrGtJt4DzwBbgdaSdpSiW1RBSBcKKnw74AzEYpoku7zbwAAAAAElFTkSuQmCC";
		html+= "<div id='plugin_analysis_vip_movie_box_"+movievipHelper.eleId+"' style='z-index:999999999999999999999;'>";
		html+= "<div class='plugin_item open_page_inner_source' title='选择解析接口，观看VIP视频'><img src='"+vipImgBase64+"'>";
		html+= "<div class='play_source_box'>";
		html+= "<div class='inner_table_box'>";
		html+= "<table style=''><tr>";
		for(var playLineIndex=0; playLineIndex<this.defaultSourceArray.length; playLineIndex++){
			if(playLineIndex%3==0){
				html +="<tr>";
				html += "<td data-url='"+this.defaultSourceArray[playLineIndex].url+"'>"+this.defaultSourceArray[playLineIndex]['name']+"</td>";
				continue;
			}
			html += "<td data-url='"+this.defaultSourceArray[playLineIndex].url+"'>"+this.defaultSourceArray[playLineIndex]['name']+"</td>";
			if((playLineIndex+1)%3==0){
				html +="</tr>";
			}
		}
		html+= "</tr></table>";
		html+= "</div></div>";
		html+= "</div>";
		html+= "</div>";
		$("body").append(html);
		var $vipMovieBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+"");
		var $playSourceBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+">.plugin_item>.play_source_box");
		var btnHeight = $vipMovieBox.height();
		var playSourceBoxHeight = $playSourceBox.height();
		var playSourceBoxTop = (playSourceBoxHeight-btnHeight)*0.3;
		$playSourceBox.css("top","-"+playSourceBoxTop+"px");
	};
	movievipHelper.operation=function(){
		var $vipMovieBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+">.open_page_inner_source");
		var $playSourceBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+">.plugin_item>.play_source_box");
		$vipMovieBox.on("mouseover", () => {
			$playSourceBox.show();
		});
		$vipMovieBox.on("mouseout", () => {
			$playSourceBox.hide();
		});
		var player_nodes = [
			{ url:"v.qq.com", node:"#mod_player"},
			{ url:"www.iqiyi.com", node:"#flashbox"},
			{ url:"v.youku.com", node:"#player"},
			{ url:"w.mgtv.com", node:"#mgtv-player-wrap"},
			{ url:"www.mgtv.com", node:"#mgtv-player-wrap"},
			{ url:"tv.sohu.com", node:"#player"},
			{ url:"film.sohu.com", node:"#playerWrap"},
			{ url:"www.le.com", node:"#le_playbox"},
			{ url:"video.tudou.com", node:".td-playbox"},
			{ url:"v.pptv.com", node:"#pptv_playpage_box"},
			{ url:"vip.pptv.com", node:".w-video"},
			{ url:"www.wasu.cn", node:"#flashContent"},
			{ url:"www.acfun.cn", node:"#ACPlayer"},
			{ url:"vip.1905.com", node:"#player"},
			{url:"play.tudou.com",node:"#player"},
			{url:"www.bilibili.com/video",node:"#bilibiliPlayer"},
			{url:"www.bilibili.com/bangumi",node:"#player_module"},
		];
		var node = "";
		for(var m in player_nodes) {
			var playUrl = window.location.href;
			if(playUrl.indexOf(player_nodes[m].url)!= -1){
				node = player_nodes[m].node;
			}
		}
		$("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box>.inner_table_box> table td").on("click", function(){
			$("#play-iframe-outer-7788op").remove();
			
			var playUrl = window.location.href;
			var playHtml = "<div id='play-iframe-outer-7788op' style='width:100%;height:100%;'><iframe allowtransparency=true frameborder='0' scrolling='no' allowfullscreen=true allowtransparency=true name='jx_play' style='height:100%;width:100%' id='play-iframe-6677i-7788'></iframe></div>";
			$(node).html(playHtml);
			var iframeSrc= $(this).attr("data-url")+playUrl;
			$("#play-iframe-6677i-7788").attr("src", iframeSrc);
		})
	};
	movievipHelper.adAccelerate=function(){//视频广告加速
		switch (window.location.host) {
			case 'www.iqiyi.com':
				try{
					unsafeWindow.rate = 0;
					unsafeWindow.Date.now = () => {
						return new unsafeWindow.Date().getTime() + (unsafeWindow.rate += 1000);
					}
					setInterval(() => {
						unsafeWindow.rate = 0;
					}, 600000);
				}catch(e){}
				try{
					setInterval(() => {
						if (document.getElementsByClassName("cupid-public-time")[0] != null) {
							$(".skippable-after").css("display", "block");
							document.getElementsByClassName("skippable-after")[0].click();
						}
						$(".qy-player-vippay-popup").css("display", "none");
						$(".black-screen").css("display", "none");
					}, 500);
				}catch(e){}
				break;
			case 'v.qq.com':
				try{
					setInterval(() => { //视频广告加速
						$(".txp_ad").find("txpdiv").find("video")[0].currentTime = 1000;
						$(".txp_ad").find("txpdiv").find("video")[1].currentTime = 1000;
					}, 1000)
					setInterval(() => {
						var txp_btn_volume = $(".txp_btn_volume");
						if (txp_btn_volume.attr("data-status") === "mute") {
							$(".txp_popup_volume").css("display", "block");
							txp_btn_volume.click();
							$(".txp_popup_volume").css("display", "none");
						}
						$(".mod_vip_popup").css("display", "none");
						$(".tvip_layer").css("display", "none");
						$("#mask_layer").css("display", "none");
					}, 500);
				}catch(e){}
				break;
			case 'v.youku.com':
				try{
					window.onload = function () {
						if (!document.querySelectorAll('video')[0]) {
							setInterval(() => {
								document.querySelectorAll('video')[1].playbackRate = 16;
							}, 100)
						}
					}
					setInterval(() => {
						var H5 = $(".h5-ext-layer").find("div")
						if(H5.length != 0){
							$(".h5-ext-layer div").remove();
							var control_btn_play = $(".control-left-grid .control-play-icon");
							if (control_btn_play.attr("data-tip") === "播放") {
								$(".h5player-dashboard").css("display", "block");
								control_btn_play.click();
								$(".h5player-dashboard").css("display", "none");
							}
						}
						$(".information-tips").css("display", "none");
					}, 500);
				}catch(e){}
				break;
			case 'tv.sohu.com':
				try{
					setInterval(() => {
						$(".x-video-adv").css("display", "none");
						$(".x-player-mask").css("display", "none");
						$("#player_vipTips").css("display", "none");
					}, 500);
				}catch(e){}
				break
		}
	};
	movievipHelper.paramsSelectedInit=function(){
		var episodeList=[];
		var episodeObj = {
			"websiteTitle":"",
			"episodeList":episodeList,
			"originVideoUrl":""
		};
		GM_setValue("episodeObj",episodeObj);
		return episodeObj;
	};
	movievipHelper.getSelected=function(){
		if(website_host==="v.qq.com"){
			setInterval(function(){ //每100ms,检测一次集数的变化
				var episodeObj = movievipHelper.paramsSelectedInit();
				var episodeList = episodeObj.episodeList;
				var $mod_episode = $(".mod_episode");
				try{
					if($mod_episode.attr("data-tpl")=="episode"){
						$mod_episode.find(".item").each(function(){
							var $a = $(this).find("a");
							var href = $a.attr("href");
							if(!!href){
								href = "https://v.qq.com"+href;
								var aText = $a.text();
								aText = aText.replace(/\s/g,"");
	    						episodeList.push({"aText":aText, "href":href, "description":""});
							}
						});
					}
				}catch(e){}
				//加入油猴缓存
				episodeObj.websiteTitle="qq";
				episodeObj.originVideoUrl=window_url;
				if(episodeList.length!=0){
					episodeObj.episodeList=episodeList;
	    		}
				GM_setValue("episodeObj",episodeObj);
			},100);
		};
		if(website_host==="www.iqiyi.com"){
			var episodeObj = movievipHelper.paramsSelectedInit();
			var episodeList = episodeObj.episodeList;
			var $i71playpagesdramalist = $("div[is='i71-play-ab']");
			if($i71playpagesdramalist.length!=0){
				var data =  $i71playpagesdramalist.attr(":page-info");
				if(!!data){
					var dataJson = JSON.parse(data);
					var barTotal = 1;
					var albumId = dataJson.albumId;
					console.log("albumId=",albumId);
					try{
						var $barlis = $(".qy-episode-tab").find(".bar-li");
						barTotal = $barlis.length;
						if(barTotal==0) barTotal=1;
					}catch(e){}
					//获取具体数据
					for(var page=1; page<=barTotal;  page++){
						try{
							GM_xmlhttpRequest({
								url: "https://pcw-api.iqiyi.com/albums/album/avlistinfo?aid="+albumId+"&page="+page+"&size=30",
							  	method: "GET",
							  	headers: {"Content-Type": "application/x-www-form-urlencoded"},
							  	onload: function(response) {
									var status = response.status;
									if(status==200||status=='200'){
										var serverResponseJson = JSON.parse(response.responseText);
										var code = serverResponseJson.code;
										if(code=="A00000"){
											var serverEpsodelist = serverResponseJson.data.epsodelist;
											//console.log(serverEpsodelist)
											for(var i=0; i<serverEpsodelist.length; i++){
												var aText = serverEpsodelist[i].order;
												var href = serverEpsodelist[i].playUrl;
												var description = serverEpsodelist[i].subtitle;
												episodeList.push({"aText":aText, "href":href, "description":description});
											}
											//加入油猴缓存
											if(episodeList.length!=0){
												episodeObj.episodeList=episodeList;
											}
											episodeObj.websiteTitle="iqiyi";
											episodeObj.originVideoUrl=window_url;
											GM_setValue("episodeObj",episodeObj);
										}
									}
							  	}
							});
						}catch(err){}
						setTimeout(function(){}, 500);
					}
					episodeObj.websiteTitle="iqiyi";
					episodeObj.originVideoUrl=window_url;
					GM_setValue("episodeObj",episodeObj);
				}
			}
		};
		if(website_host==="www.mgtv.com"){
			var episodeObj = movievipHelper.paramsSelectedInit();
			var episodeList = episodeObj.episodeList;
			setTimeout(function(){
				$("body").find(".aside-tabbox").each(function(){
					$(this).find("li").each(function(){
	    				var $a = $(this).find("a");
						var href = $a.attr("href");
						var aText = $(this).text();
						if(!!href && aText.indexOf("预告")==-1){
							href = "https://www.mgtv.com"+href;
							aText = aText.replace("VIP","");
							episodeList.push({"aText":aText, "href":href, "description":""});
						}
					});
				});
				//加入油猴缓存
				episodeObj.websiteTitle="mgtv";
				episodeObj.originVideoUrl=window_url;
				if(episodeList.length!=0){
					episodeObj.episodeList=episodeList;
	    		}
				GM_setValue("episodeObj",episodeObj);
			},1000);
		};
		if(website_host==="v.youku.com"){
			function youku_select(){
				var episodeObj = movievipHelper.paramsSelectedInit();
				var episodeList = episodeObj.episodeList;
				$(".anthology-content-scroll").find(".anthology-content").find(".box-item").each(function(){
					var title = $(this).attr("title");
					var href = $(this).attr("href");
					
					var $markText = $(this).find(".mark-text");
					if($markText.length==0 || "预告".indexOf($markText.text)==-1){
						if(!!href){
							var aText = title;
							var arr = aText.split(" ");
							if(arr.length>=2) aText = arr[arr.length-1];
							aText = aText.replace(/[^0-9]/ig,"");
							
							if(!!aText){
								episodeList.push({"aText":aText, "href":href, "description":title});
								//console.log({"aText":aText, "href":href, "description":title})
							}
						}
					}
				});
				//加入油猴缓存
				episodeObj.websiteTitle="youku";
				episodeObj.originVideoUrl=window_url;
				if(episodeList.length!=0){
	    			episodeObj.episodeList=episodeList;
	    		}
				GM_setValue("episodeObj",episodeObj);
			}
			youku_select();
			setInterval(function(){
				youku_select();
			}, 600);
		};
		if(website_host==="tv.sohu.com"){
			var episodeObj = movievipHelper.paramsSelectedInit();
			var episodeList = episodeObj.episodeList;
			setTimeout(function(){
				var $jlistwrap = $(".j-list-wrap");
				if(!!$jlistwrap){
					$jlistwrap.find("li").each(function(){
						var $a = $(this).find("a");
						if(!!$a){
							var aText = $(this).attr("data-order");
							var href = $a.attr("href");
							var title = $a.attr("data-title");
							if(!!aText && !!href){
								href = "https"+href;
								episodeList.push({"aText":aText, "href":href, "description":title});
								//console.log({"aText":aText, "href":href, "description":title});
							}
						}
					});
				}
				//加入油猴缓存
				episodeObj.websiteTitle="sohu";
				episodeObj.originVideoUrl=window_url;
				if(episodeList.length!=0){
	    			episodeObj.episodeList=episodeList;
	    		}
				GM_setValue("episodeObj",episodeObj);
			},1000);
		};
	};
	movievipHelper.movieWebsitesPlayersSelected=function(){//支持电视剧选集
		if(false){
			var innerCss= 
				`
				#plugin_congcongguoke_episode_box{position:fixed; top:170px; left:10px; height:300px; overflow:auto;font-size:12px;}
				#plugin_congcongguoke_episode_box >a{display:inline-block;width:23px;height:23px;line-height:23px;text-align:center;border:1px dashed #FFF;color:#FFF;margin:5px;text-decoration:none;cursor:pointer;}
				#plugin_congcongguoke_episode_box >a:hover{border:1px dashed red;color:red;}
				#plugin_congcongguoke_episode_box >.active{border:1px dashed red;color:red;}
				#plugin_congcongguoke_episode_box >.tip{text-align:center;padding:5px;color:#FFF;}
				#plugin_congcongguoke_episode_box >.origin-video-url{color:#FFF;}
				@media (max-width: 767px) {#plugin_congcongguoke_episode_box{display:none;}}
				`;
				
			$("body").prepend("<style>"+innerCss+"</style>");
			var episodeObj = GM_getValue("episodeObj");
			console.log(episodeObj)
			if(!!episodeObj){
				var episodeList = episodeObj.episodeList;
				if(!!episodeList && episodeList.length!=0){
					episodeList.sort((d1, d2)=>{  //排序
						var aText1 = d1.aText;
						var aText2 = d2.aText;
						var aText1Value = parseInt(aText1);
						var aText2Value = parseInt(aText2);
						if(isNaN(aText1Value) || isNaN(aText2Value)){
							return 0;
						}else{
							return aText1Value-aText2Value;
						}
					});
					var websiteTitle = episodeObj.websiteTitle;
					var currentvideourl = GM_getValue("currentvideourl");
					var html = "<div id='plugin_congcongguoke_episode_box'>";
					html += "<div class='tip'><b>电视剧点击集数，可自由选集</b></div>";
					var waiturl="";
					var aclass="";
					for(var i=0; i<episodeList.length; i++){
						waiturl=episodeList[i].href;
						aclass="plugin-episode";
						if(window_url.indexOf(waiturl)!=-1 || (currentvideourl==waiturl && websiteTitle=="iqiyi")){
							aclass = aclass +" "+"active";
						}
						html+= "<a class='"+aclass+"' data-href='"+waiturl+"' title='"+episodeList[i].description+"'>"+episodeList[i].aText+"</a>";
						if((i+1)%5==0){
							html+= "<br>";
						}
					}
					var originVideoUrl=episodeObj.originVideoUrl;
					if(!!originVideoUrl){
						html += "<div class='origin-video-url'><b>来源视频链接：<a href='"+originVideoUrl+"'>点我返回</a><b></div>";
					}
					html += "</div>";
					$("body").append(html);
					
					//生成选集弹框
					var $episodeBox = $("#plugin_congcongguoke_episode_box");
					var $leftBox = $("#left-box");
					var left = $("#play-box").offset().left - $episodeBox.width() - 20;
					var top = 350;
					if($leftBox.length!=0){
						top = $leftBox.offset().top + $leftBox.height() + 15;
					}
					$episodeBox.css({"left":left, "top":top});
				}
			}
			$("body").on("click", ".plugin-episode", function(){
				var href=$(this).data("href");
				if(!!href){
					// var jumpWebsite = movievipHelper.analysisWebsite.replace("@@", href);
					// window.location.href = jumpWebsite;
				}
			});			
		}
	};
	movievipHelper.start=function(){
    	if(movievipHelper.judgeVipWebsite() && window.top==window.self){
    		movievipHelper.getServerSource();
			movievipHelper.adAccelerate();
			movievipHelper.getSelected();
    	}
		movievipHelper.movieWebsitesPlayersSelected();
    };
	if(isOpenVideoVipModule){
		movievipHelper.start();
	}
	
	//--知乎助手开始
	var zhihuHelper={};
	zhihuHelper.autoJumpTarget = function(){ //直接跳转到目标网页
		var regexResult = location.search.match(/target=(.+?)(&|$)/);
		if(regexResult && regexResult.length==3){
			location.href = decodeURIComponent(regexResult[1]);
		}
	};
	zhihuHelper.clearAdvert = function(){  //去除广告，可能造成误伤，用最小策略
		setInterval(function(){
			var ad1 = document.querySelector('.AppBanner');
			if (ad1!=="undefined" && ad1!==null) {
			    ad1.style.display = "none";
			}
			var ad2 = document.querySelector('.AdblockBanner');
			if (ad2!=="undefined" && ad2!==null) {
			    ad2.style.display = "none";
			}
		}, 1000);  //去除广告
	};
	zhihuHelper.changeHeightQualityPic = function(){ //图片自动高清
		setInterval(function(){
			$("body").find("img").each(function(){
				var dataoriginal = $(this).attr("data-original");
				if(!!dataoriginal){
					$(this).attr("src", dataoriginal);
				}
			});
		}, 500);
	};
	zhihuHelper.noLoginBox = function(){ //去除登录提示
		var IntervalUnit = 200;
		var totalIntervalMs = 0;
		var loginInterval = setInterval(function(){
			$(".signFlowModal").children(".Modal-closeButton").click();
			totalIntervalMs += IntervalUnit;
			if(totalIntervalMs >= 2000){  //循环多次，我就不信还显示
				clearInterval(loginInterval);
			}
		}, IntervalUnit); 
		$(".AppHeader-login").click(function(){
			clearInterval(loginInterval);
			$(".Modal-wrapper").show();
		});
	};
	zhihuHelper.markQuestionDate = function(){  //标注回答时间
		//DateFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss")
		function DateFormat(time, format) {  //时间格式化
		    var o = {
		        "M+": time.getMonth() + 1, //月份 
		        "d+": time.getDate(), //日 
		        "h+": time.getHours(), //小时 
		        "m+": time.getMinutes(), //分 
		        "s+": time.getSeconds(), //秒 
		        "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
		        "S": time.getMilliseconds() //毫秒 
		    };
		    if(/(y+)/.test(format)){
				format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
		    for(var k in o){
		        if(new RegExp("(" + k + ")").test(format)){
		            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				}
			}
		    return format;
		}
		
		function questionPage() {
			var title = document.querySelector(".QuestionPage");
			if(!!title){
				var dateCreated = title.querySelector("[itemprop~=dateCreated][content]").content;
				var dateModified = title.querySelector("[itemprop~=dateModified][content]").content;
				var createDate = DateFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss");
				var editDate = DateFormat(new Date(dateModified), "yyyy-MM-dd hh:mm:ss");
				
				var side = title.querySelector(".QuestionHeader-side");
				var timeDiv = document.createElement('div');
				timeDiv.innerHTML = `<p>创建于:&nbsp;${createDate}</p><p>编辑于:&nbsp;${editDate}</p>`;
				timeDiv.style.cssText = 'color:#6f6f6f;font-size:13px;';
				side.appendChild(timeDiv);
			}
		}
		
		let listNum = 0;
		function contentItem() {
			var list = document.querySelectorAll(".ContentItem");
			if (listNum != list.length) {
				listNum = list.length;
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					if (item.getAttribute('zh_date_mk') == 'true') {
						continue;
					}
					var dateCreated = item.querySelector("[itemprop~=dateCreated][content]").content;
					var dateModified = item.querySelector("[itemprop~=dateModified][content]").content;
					var createDate = DateFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss");
					var editDate = DateFormat(new Date(dateModified), "yyyy-MM-dd hh:mm:ss");
						
					var sideitem = item.querySelector(".css-h5al4j");
					var timeDiv = document.createElement('span');
					timeDiv.innerHTML = `<p>创建于:&nbsp;${createDate}&nbsp;&nbsp;&nbsp;编辑于:&nbsp;${editDate}</p>`;
					timeDiv.class = "Voters";
					timeDiv.style.cssText = 'color:#6f6f6f;font-size:13px;display:block;padding:5px 0px;';
					sideitem.appendChild(timeDiv);
					item.setAttribute('zh_date_mk', 'true');
				}
			}
		}
		questionPage();
		document.querySelector(".Question-main").addEventListener('DOMNodeInserted', contentItem);
	};
	zhihuHelper.autoExpandQuestionInfo = function(){ //问题全部展开
		var mm0 = document.querySelector('.QuestionRichText-more');
		if(mm0!=="undefined" && mm0!==null) { //展开问题描述
			mm0.click();
		}
		var mm1 = document.querySelector('.SignContainer-content');
		if(mm1!=="undefined" && mm1!==null) {
			var c1 = document.querySelector('.Modal-backdrop');
			if (c1!=="undefined" && c1!==null) {
				c1.click();
			}
			var c2 = document.querySelector('.Modal-closeButton');
			if (c2!=="undefined" && c2!==null) {
				c2.click();
			}
		}
	};
	zhihuHelper.start = function(){
	    if(website_host == "link.zhihu.com"){ 
	    	this.autoJumpTarget();  //直接跳转到目标网页
		}else if(website_host.indexOf("zhihu.com")!=-1){   //知乎正文
		    if(window_url.indexOf("https://www.zhihu.com/question/") != -1) {
		        this.autoExpandQuestionInfo();     //问题全部展开
	    		this.markQuestionDate();           //问题日期
		    }
		    this.noLoginBox();   //去除登录框
		    this.clearAdvert();  //去除广告
		}
	};
	if(isOpenZhihuModule){
		zhihuHelper.start();
	}
	
	/**
	 * 优惠券查询
	 */
	var goodsCoupon={};
	goodsCoupon.getPlatform=function(){
		var couponUrl = window.location.href;
		var platform="";
		if(couponUrl.indexOf("suning.com")!=-1){
			platform = "suning";
		}else if(couponUrl.indexOf("detail.tmall")!=-1){
			platform = "tmall";
		}else if(couponUrl.indexOf("item.taobao.com")!=-1){
			platform = "taobao";
		}else if(couponUrl.indexOf("item.jd.com")!=-1){
			platform = "jd";
		}else if(couponUrl.indexOf("detail.vip.com")!=-1){
			platform = "vpinhui";
		}else if(couponUrl.indexOf("mobile.yangkeduo.com")!=-1){
			platform = "pdd";
		}
		return platform;
	}
	goodsCoupon.filterStr = function(str){
		if(!str) return "";
		str = str.replace(/\t/g,"");
		str = str.replace(/\r/g,"");
		str = str.replace(/\n/g,"");
		str = str.replace(/\+/g,"%2B");//"+"
		str = str.replace(/\&/g,"%26");//"&"
		str = str.replace(/\#/g,"%23");//"#"
		return encodeURIComponent(str)
	};
	goodsCoupon.getGoodsData=function(platform){
		var goodsId = "";
		var goodsName = "";
		var websiteUrl = window.location.href;
		if(platform=="taobao"){
			goodsId = this.getQueryString("id");
			goodsName=$(".tb-main-title").text();
			
		}else if(platform=="tmall"){
			goodsId = this.getQueryString("id");
			goodsName=$(".tb-detail-hd").text();
			
		}else if(platform=="jd"){
			goodsName=$("div.sku-name").text();
			goodsId = this.getQueryStringByUrl(websiteUrl);
			
		}else if(platform=="suning"){
			var text = $("#itemDisplayName").text();
			if(!!text){
				text = text.replace("苏宁超市","");
				text = text.replace("自营","");
			}
			goodsName=text;
			goodsId = this.getQueryStringByUrl(websiteUrl);
			
		}else if(platform=="vpinhui"){
			goodsId = this.getQueryStringByUrl(websiteUrl).replace("detail-","");
			goodsName = $(".pib-title-detail").text();
			
		}else if(platform=="pdd"){
			goodsId = this.getQueryString("goods_id");
			goodsName = $(".enable-select").text();
		}
		var data={"goodsId":goodsId, "goodsName":this.filterStr(goodsName)}
		return data;
	};
	goodsCoupon.createHtml = function(platform, goodsId, goodsName){
		if(!platform || !goodsId) return;
		var goodsCouponUrl = "https://t.mimixiaoke.com/api/plugin/hit/v2?script=1&";
		if(platform==="jd"){
			goodsCouponUrl = "http://t.jtm.pub/api/platform/jd/coupon?itemId="+goodsId+"&q="+goodsName+"&content=&no=1";
		}else{			
			if(platform!=="vpinhui"){
				goodsCouponUrl = goodsCouponUrl+"platform="+platform+"&id="+goodsId+"&q="+goodsName;
			}else{
				var vip = goodsId.split("-");
				var vaddition = vip[0];
				var vid = vip[1];
				goodsCouponUrl = goodsCouponUrl+"platform="+platform+"&id="+vid+"&q="+goodsName+"&addition="+vaddition;
			}		
		}
		GM_xmlhttpRequest({
			url: goodsCouponUrl,
		  	method: "GET",
		  	headers: {"Content-Type": "application/x-www-form-urlencoded"},
		  	onload: function(response) {
				var status = response.status;
				if(status==200||status=='200'){
					var serverResponseJson = JSON.parse(response.responseText);
					var data = serverResponseJson.data;
					var cssText = data.css;
					var htmlText = data.html;
					var handler = data.handler;
					if(!cssText || !htmlText || !handler){
						return;
					}
					$("body").prepend("<style>"+cssText+"</style>");
					var handlers = handler.split("@");
					for(var i=0; i<handlers.length; i++){
						var $handler = $(""+handlers[i]+"");
						if(platform=="taobao"){
							$handler.parent().after(htmlText);
						}else if(platform=="tmall"){
							$handler.parent().after(htmlText);
						}else if(platform=="jd"){
							$handler.after(htmlText);
						}else if(platform=="suning"){
							$handler.parent().after(htmlText);
						}else if(platform=="vpinhui"){
							$handler.parent().after(htmlText);
						}else if(platform=="pdd"){
							$handler.after(htmlText);
						}					
					}
				}
		  	}
		});
	};
	goodsCoupon.getQueryString = function(tag) {
		var t = new RegExp("(^|&)" + tag + "=([^&]*)(&|$)");
		var a = window.location.search.substr(1).match(t);
		if (a != null) return a[2];
		return "";
	};
	goodsCoupon.getQueryStringByUrl = function(url) {
		if(url.indexOf("?")!=-1){
			url = url.split("?")[0]
		}
		if(url.indexOf("#")!=-1){
			url = url.split("#")[0]
		}
		var splitText = url.split("/");
		var idText = splitText[splitText.length-1];
		idText = idText.replace(".html","");
		return idText;
	};
	goodsCoupon.start = function(){
		var platform = this.getPlatform();
		if(!platform) return;
		var delayMS = 0;
		if(platform=="vpinhui"){ //唯品会采用了异步加载
			var vipInterval = setInterval(function(){
				if($(".pib-title-detail").length!=0 || delayMS>=1200){
					var goodsData = goodsCoupon.getGoodsData(platform);
					goodsCoupon.createHtml(platform, goodsData.goodsId, goodsData.goodsName);
					clearInterval(vipInterval)
				}
				delayMS+=100;
			},100);
		}else{
			var goodsData = goodsCoupon.getGoodsData(platform);
			goodsCoupon.createHtml(platform, goodsData.goodsId, goodsData.goodsName);
		}
	};	
	if(isOpenGoodsCouponModule){
		goodsCoupon.start();
	}
	
	/**
	 * CSDN使用增强
	 */
	var csdnHelper={};
	csdnHelper.start = function(){
		
	};
	if(isOpenCsdnModule){
		csdnHelper.start();
	}
})();