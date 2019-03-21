/**
 * 工具类
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
            pay: function (timestamp, nonceStr, packages, signType, paySign, callback) {
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
                        appId: data.result.appId, // 必填，公众号的唯一标识
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
    date: {
        intToDate: function (timestamp, type = 1) {
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            if (type == 1) {
                return Y + M + D + h + m + s;
            } else {
                return Y + M + D;
            }

        },
        intToTime: function (int) {
            var h = parseInt(int / 3600 % 24);
            var m = parseInt(int / 60 % 60);
            var s = parseInt(int % 60);
            return h + ':' + m + ':' + s;
        },
        getInt: function () {
            return parseInt((new Date()).getTime() / 1000);
        }
    }
    ,
    sign: {
        init: function () {
            var key = tools.cookie.get('signKey');
            if (!key) {
                key = tools.Math.randomNum(0, 99999);
                tools.cookie.set('signKey', key);
            }
            var time = tools.date.getInt()
            tools.cookie.set('signTime', time);
            tools.cookie.set('sign', tools.Math.md5(key + '' + time))
        }
    },
    Math: {
        randomNum: function (minNum, maxNum) {
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * minNum + 1, 10);
                    break;
                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                    break;
                default:
                    return 0;
                    break;
            }
        },
        md5: function (string, key, raw) {
            function safeAdd(x, y) {
                var lsw = (x & 0xffff) + (y & 0xffff)
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
                return (msw << 16) | (lsw & 0xffff)
            }

            /*
            * Bitwise rotate a 32-bit number to the left.
            */
            function bitRotateLeft(num, cnt) {
                return (num << cnt) | (num >>> (32 - cnt))
            }

            /*
            * These functions implement the four basic operations the algorithm uses.
            */
            function md5cmn(q, a, b, x, s, t) {
                return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
            }

            function md5ff(a, b, c, d, x, s, t) {
                return md5cmn((b & c) | (~b & d), a, b, x, s, t)
            }

            function md5gg(a, b, c, d, x, s, t) {
                return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
            }

            function md5hh(a, b, c, d, x, s, t) {
                return md5cmn(b ^ c ^ d, a, b, x, s, t)
            }

            function md5ii(a, b, c, d, x, s, t) {
                return md5cmn(c ^ (b | ~d), a, b, x, s, t)
            }

            /*
            * Calculate the MD5 of an array of little-endian words, and a bit length.
            */
            function binlMD5(x, len) {
                /* append padding */
                x[len >> 5] |= 0x80 << (len % 32)
                x[((len + 64) >>> 9 << 4) + 14] = len

                var i
                var olda
                var oldb
                var oldc
                var oldd
                var a = 1732584193
                var b = -271733879
                var c = -1732584194
                var d = 271733878

                for (i = 0; i < x.length; i += 16) {
                    olda = a
                    oldb = b
                    oldc = c
                    oldd = d

                    a = md5ff(a, b, c, d, x[i], 7, -680876936)
                    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
                    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
                    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
                    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
                    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
                    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
                    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
                    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
                    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
                    c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
                    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
                    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
                    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
                    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
                    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

                    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
                    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
                    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
                    b = md5gg(b, c, d, a, x[i], 20, -373897302)
                    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
                    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
                    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
                    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
                    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
                    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
                    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
                    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
                    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
                    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
                    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
                    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

                    a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
                    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
                    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
                    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
                    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
                    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
                    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
                    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
                    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
                    d = md5hh(d, a, b, c, x[i], 11, -358537222)
                    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
                    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
                    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
                    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
                    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
                    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

                    a = md5ii(a, b, c, d, x[i], 6, -198630844)
                    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
                    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
                    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
                    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
                    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
                    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
                    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
                    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
                    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
                    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
                    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
                    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
                    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
                    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
                    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

                    a = safeAdd(a, olda)
                    b = safeAdd(b, oldb)
                    c = safeAdd(c, oldc)
                    d = safeAdd(d, oldd)
                }
                return [a, b, c, d]
            }

            /*
            * Convert an array of little-endian words to a string
            */
            function binl2rstr(input) {
                var i
                var output = ''
                var length32 = input.length * 32
                for (i = 0; i < length32; i += 8) {
                    output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
                }
                return output
            }

            /*
            * Convert a raw string to an array of little-endian words
            * Characters >255 have their high-byte silently ignored.
            */
            function rstr2binl(input) {
                var i
                var output = []
                output[(input.length >> 2) - 1] = undefined
                for (i = 0; i < output.length; i += 1) {
                    output[i] = 0
                }
                var length8 = input.length * 8
                for (i = 0; i < length8; i += 8) {
                    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
                }
                return output
            }

            /*
            * Calculate the MD5 of a raw string
            */
            function rstrMD5(s) {
                return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
            }

            /*
            * Calculate the HMAC-MD5, of a key and some data (raw strings)
            */
            function rstrHMACMD5(key, data) {
                var i
                var bkey = rstr2binl(key)
                var ipad = []
                var opad = []
                var hash
                ipad[15] = opad[15] = undefined
                if (bkey.length > 16) {
                    bkey = binlMD5(bkey, key.length * 8)
                }
                for (i = 0; i < 16; i += 1) {
                    ipad[i] = bkey[i] ^ 0x36363636
                    opad[i] = bkey[i] ^ 0x5c5c5c5c
                }
                hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
                return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
            }

            /*
            * Convert a raw string to a hex string
            */
            function rstr2hex(input) {
                var hexTab = '0123456789abcdef'
                var output = ''
                var x
                var i
                for (i = 0; i < input.length; i += 1) {
                    x = input.charCodeAt(i)
                    output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
                }
                return output
            }

            /*
            * Encode a string as utf-8
            */
            function str2rstrUTF8(input) {
                return unescape(encodeURIComponent(input))
            }

            /*
            * Take string arguments and return either raw or hex encoded strings
            */
            function rawMD5(s) {
                return rstrMD5(str2rstrUTF8(s))
            }

            function hexMD5(s) {
                return rstr2hex(rawMD5(s))
            }

            function rawHMACMD5(k, d) {
                return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
            }

            function hexHMACMD5(k, d) {
                return rstr2hex(rawHMACMD5(k, d))
            }

            function md5(string, key, raw) {
                if (!key) {
                    if (!raw) {
                        return hexMD5(string)
                    }
                    return rawMD5(string)
                }
                if (!raw) {
                    return hexHMACMD5(key, string)
                }
                return rawHMACMD5(key, string)
            }

            return md5(string, key, raw);
        }
    }
};
