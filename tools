/**
 * 工具类
 * @type {{wechat: {getOpenIdUri: null, debug: boolean, getJssdkUri: null, jsApiList: Array, isWx: tools.wechat.isWx, jssdkApi: {AppMessageShare: tools.wechat.jssdkApi.AppMessageShare, TimelineShare: tools.wechat.jssdkApi.TimelineShare, MenuShareTimeline: tools.wechat.jssdkApi.MenuShareTimeline, MenuShareAppMessage: tools.wechat.jssdkApi.MenuShareAppMessage, pay: tools.wechat.jssdkApi.pay}, wxInit: tools.wechat.wxInit, sdkInit: tools.wechat.sdkInit, checkOpenId: tools.wechat.checkOpenId, getUserInfo: (function(): any), getOpenId: (function(): *)}, cookie: {set: tools.cookie.set, get: (function(*): *), delete: tools.cookie.delete}, date: {intToDate: tools.date.intToDate, intToTime: (function(*): string)}}}
 * @author yzy
 */
var tools = {
    wechat: {
        getOpenIdUri: null,
        debug: false,
        getJssdkUri: null,
        jsApiList: [],//updateAppMessageShareData，updateTimelineShareData，onMenuShareTimeline（即将废弃），onMenuShareAppMessage（即将废弃），onMenuShareQQ（即将废弃），onMenuShareWeibo，onMenuShareQZone，startRecord，stopRecord，onVoiceRecordEnd，playVoice，pauseVoice，stopVoice，onVoicePlayEnd，uploadVoice，downloadVoice，chooseImage，previewImage，uploadImage，downloadImage，translateVoice，getNetworkType，openLocation，getLocation，hideOptionMenu，showOptionMenu，hideMenuItems，showMenuItems，hideAllNonBaseMenuItem，showAllNonBaseMenuItem，closeWindow，scanQRCode，chooseWXPay，openProductSpecificView，addCard，chooseCard，openCard
        isWx: function () {
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        jssdkApi: {
            /**
             * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
             * @param title
             * @param desc
             * @param link
             * @param imgUrl
             * @constructor
             */
            AppMessageShare: function (title, desc, link, imgUrl) {
                wx.updateAppMessageShareData({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 设置成功
                    }
                })
            },
            /**
             * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
             * @param title
             * @param desc
             * @param imgUrl
             * @constructor
             */
            TimelineShare: function (title, desc, imgUrl) {
                wx.updateTimelineShareData({
                    title: title, // 分享标题
                    link: desc, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 设置成功
                    }
                })
            },
            /**
             * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
             * @param title
             * @param link
             * @param imgUrl
             * @param callback
             * @constructor
             */
            MenuShareTimeline: function (title, link, imgUrl, callback) {
                wx.onMenuShareTimeline({
                    title: '', // 分享标题
                    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: '', // 分享图标
                    success: function () {
                        // 用户点击了分享后执行的回调函数
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                });
            },
            MenuShareAppMessage: function (title, desc, link, imgUrl, type, dataUrl, callback) {
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    type: type, // 分享类型,music、video或link，不填默认为link
                    dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
// 用户点击了分享后执行的回调函数
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                });
            },
            pay:function (timestamp,nonceStr,packages,signType,paySign,callback) {
                wx.chooseWXPay({
                    timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
                    package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: paySign, // 支付签名
                    success: function (res) {
                        // 支付成功后的回调函数
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                });
            }
        },
        wxInit: function (jsReadyCallback, errCallback) {
            let _this = tools;
            if (_this.wechat.isWx()) {
                // _this.wechat.checkOpenId();
                _this.wechat.sdkInit(function (data) {
                    wx.config({
                        debug: _this.wechat.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId:data.result.appId, // 必填，公众号的唯一标识
                        timestamp: data.result.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.result.nonceStr, // 必填，生成签名的随机串
                        signature: data.result.signature,// 必填，签名
                        jsApiList: _this.wechat.jsApiList // 必填，需要使用的JS接口列表
                    });
                    wx.ready(function () {
                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                        if (typeof jsReadyCallback == 'function') {
                            jsReadyCallback()
                        }
                    });
                    wx.error(function (res) {
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        if (typeof errCallback == 'function') {
                            errCallback(res)
                        }
                    });
                });
            }
        },
        sdkInit: function (callback) {
            let _this = tools;
            if ($ == undefined) {
                console.log('请加载Jq');
                return false;
            }
            //载入微信
            $('body').append('<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>');
            $.ajax({
                url: _this.wechat.getJssdkUri,
                data: {url: location.href},
                success: function (data) {
                    if (typeof callback == 'function') {
                        callback(data);
                    } else {
                        console.log('请传入回调');
                    }
                }
            });
        },
        checkOpenId: function () {
            let _this = tools;
            if (_this.wechat.isWx()) {
                let openId = _this.cookie.get('openId');
                if (openId === undefined) {
                    _this.cookie.set('RedirectUri', location.href);
                    location = _this.wechat.getOpenIdUri;
                }
            }
        },
        getUserInfo: function () {
            return JSON.parse(decodeURIComponent(tools.cookie.get('userInfo')));
        },
        getOpenId: function () {
            return tools.cookie.get('openId');
        }
    },
    cookie: {
        set: function (key, val) {//设置cookie方法
            let date = new Date(); //获取当前时间
            let expiresDays = 1;  //将date设置为n天以后的时间
            date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
            document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ';path=/';  //设置cookie
        },
        get: function (key) {
            let getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
            let arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
            let tips;  //声明变量tips
            for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
                let arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
                if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                    tips = arr[1];   //将cookie的值赋给变量tips
                    break;   //终止for循环遍历
                }
            }
            return tips;
        },
        delete: function (key) { //删除cookie方法
            let date = new Date(); //获取当前时间
            date.setTime(date.getTime() - 10000); //将date设置为过去的时间
            document.cookie = key + "=v; expires =" + date.toGMTString();//设置cookie
        }
    },
    date:{
        intToDate:function(timestamp,type = 1) {
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            if(type == 1){
                return Y+M+D+h+m+s;
            }else{
                return Y+M+D;
            }

        },
        intToTime:function (int) {
            var h = parseInt(int/3600%24);
            var m = parseInt(int/60%60);
            var s = parseInt(int%60);
            return h+':'+m+':'+s;
        }
    },
    price:{
      showInfoPrice:function(name, data,title = '价格'){
        $("input[name=" + name + "]").focus(function () {
        if (data == 0) {
            data = $("input[name=" + name + "]").val();
        }
        $("input[name=" + name + "]").css("background-color", "#FFFFCC");
        let _this = $(this);
        _this.parent().append('<div  class="layui-input" style="padding-top: 9px; position: absolute;\n' +
            '    top: -40px;" id="showTitle-' + name + '"><span style="color: red">'+title+'：</span>' + (data / 100) + '元</div>')
        });
        $("input[name=" + name + "]").keyup(function () {
            let _this = $(this);
            _this.val();
            $("#showTitle-" + name).html('<span style="color: red">价格：</span>' + (_this.val() / 100) + '元');
        });

        $("input[name=" + name + "]").blur(function () {
            $("#showTitle-" + name).remove();
            $("input[name=" + name + "]").css("background-color", "#fff");
        });
      }
    }
};
