var $aotoTable = {
    $Class: function (className, callback) {
        var aLi = document.querySelectorAll('.' + className);
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].addEventListener('click', function () {
                callback(this);
            });
        }
    },
    dataList: null,
    url: '',
    pageSize: 20,
    nowSendData: {},
    pageSuccess: function () {
    },
    load: function (json, isPageClick = false) {
        var _this = this;
        document.getElementById(tabJson['tableValue']['addDivId']).innerHTML = '';

        var sendData = {};
        if (typeof json == 'undefined') {
            json = {};
            json.page = 1;
            json.pageSize = _this.pageSize;
        }


        if (isPageClick) {
            sendData = _this.nowSendData;
        } else {
            _this.nowSendData = json;
            sendData = json;
        }
        if (typeof  json.pageSize == 'undefined') {
            sendData.pageSize = _this.pageSize;;
        }
        sendData.page = json.page;
        _this.post($aotoTable.url, sendData, function (e) {
            if (typeof json == 'undefined') {
                json = {};
                json.page = 1;
            }
            if (typeof e.data == "undefined" && e != '{}') {
                e = JSON.parse(e);
            }

            if(typeof e.data == 'undefined'){  $msgBox.loaddinghide();$msgBox.show('接口异常');return false;}

            var maxShow = _this.pageSize;
            var page = '';
            var nowPage = json.page;
            var all = e.data.total;
            var maxPage = Math.ceil(all / maxShow);
            page += '<span onclick="$aotoTable.load({page:1},true)" class="firstPage pageClass ">首页</span>'
            var showPageStrLen = 6;
            var showIndex = 0;
            if (nowPage - (showPageStrLen - 3) > 0) {
                showPageStrLen = showPageStrLen - (showPageStrLen - 3);
            }
            if (maxPage - nowPage < maxShow) {
                nowPage = nowPage * 1 - showPageStrLen / 2;
                if (nowPage < 1) nowPage = 1;
            }
            for (var i = nowPage; i <= maxPage; i++) {
                showIndex++;
                if (showPageStrLen < showIndex) {
                    break;
                }
                var className = '';
                if (json.page == i) {
                    className = 'nowPageClass'
                }
                page += '<span onclick="$aotoTable.load({page:' + i + '},true)" class="pageClass ' + className + '">' + parseInt( i) + '</span>'
            }
            page += '...<span onclick="$aotoTable.load({page:' + maxPage + '},true)" class="maxPage pageClass">尾页</span>'
            tabJson['data']['data'] = e.data.list;
            tabJson['data']['page'] = page;
            $aotoTable.init(tabJson);

            _this.init(tabJson);
            $msgBox.loaddinghide()
        }, 'json');
    },
    conf: function () {
        var arr = new Array();
        arr['tableId'] = 'table_yzy_create';
        arr['tableTitle'] = 'Title';
        arr['tabClass'] = ' ';
        arr['addDivId'] = 'tablesss';
        arr['ext'] = false;
        return arr;
    },
    init: function (option) {
        var _this = this;
        _this.dataList = option.data.data;
        var conf = this.conf();
        var newConf = option.tableValue;
        for (var key in conf) {
            if (newConf[key] != undefined) {
                conf[key] = newConf[key];
            }
        }

        var countField = this.len(option.data.field);
        if (conf['ext']) {
            countField++
        }
        var tableStr = '<table id="' + conf['tableId'] + '" class="' + conf['tabClass'] + '">';
        tableStr += '<thead><tr>';
        for (var i in option.data.field) {
            tableStr += '<th>' + option.data.field[i] + '</th>';
        }
        if (conf['ext']) {
            tableStr += '<th><a href="javascript:void(0)" >操作</th>';
        }
        tableStr += '</tr></thead>';
        for (var temp in option.data.data) {
            tableStr += '<tr>';
            for (var j in option.data.field) {
                var power = true;
                for (var i in option.data.data[temp]) {
                    if (j == i) {
                        power = false;
                        if (typeof option.data.changeFunc[i] == 'function') {
                            tableStr += '<td>' + option.data.changeFunc[i](option.data.data[temp]) + '</td>';
                            break;
                        } else {
                            tableStr += '<td>' + option.data.data[temp][i] + '</td>';
                            break;
                        }
                    }
                }
                if (power) tableStr += '<td></td>';
            }
            if (conf['ext'] && typeof conf['extStr'] == "undefined") {
                tableStr += '<td><a href="javascript:void(0)" attr-data-index="' + temp + '" class="edit_table" >修改</a> ' +
                    '<a href="javascript:void(0)"   attr-data-index="' + temp + '"  class="del_table" >删除</a> </td>';
            } else if (conf['extStr']) {
                tableStr += '<td>' + conf['extStr'] + '</td>';
            }
            tableStr += '</tr>';
        }
        tableStr += '<tr><th style="text-align: right;"  colspan="' + countField + '" align=right>' + option.data.page + '</th></tr>';
        ;
        tableStr += '</tbody></table>';
        document.getElementById(conf['addDivId']).innerHTML = tableStr;
        if (typeof _this.pageSuccess == "function") {
            _this.pageSuccess();
        }
    },
    len: function (o) {
        var t = typeof o;
        if (t == 'string') {
            return o.length;
        } else if (t == 'object') {
            var n = 0;
            for (var i in o) {
                n++;
            }
            return n;
        }
        return false;
    }, each: function (data, callback) {
        if (typeof callback == "function") {
            for (var i in data) {
                callback(i, data[i]);
            }
        } else {
            console.error('请传⼊回调函数');
        }
    },
    in_array: function (need, array) {
        var power = false;
        $.each(array, function (k, v) {
            if (v == need) {
                power = true;
            }
        });
        return power;
    }, run: function (options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = this.formatParams(options.data);
//创建 - ⾮非IE6 - 第⼀一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    if (xhr.responseXML) xhr.responseText = xhr.responseXML;
                    options.success && options.success(xhr.responseText);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
//设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }, formatParams: function (data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    }, post: function (url, data, functions) {
        this.run({
            url: url, //请求地址
            type: "POST", //请求⽅式
            data: data, //请求参数
            dataType: "json",
            success: functions,
            fail: functions
        });
    }, get: function (url, functions) {
        this.run({
            url: url, //请求地址
            type: "GET", //请求⽅式
            data: null, //请求参数
            dataType: "json",
            success: functions,
            fail: functions
        })
    }
};

var $msgBox = {
    conf: function () {
        var arr = new Array();
        arr['opacity'] = '0.8';
        arr['bcolor_errot'] = 'red';
        arr['bcolor_success'] = '#000';
        arr['fontcolor'] = '#fff';
        arr['size'] = '2em';
        return arr;
    },
    init: function (opacity, bcolor, fontcolor, size) {
        var appendStr = '<div id="isbox" style="' +
            'position: fixed;display: none;padding-top: 5%;padding-bottom:5%;font-size:' + size +
            ';background: ' + bcolor + ';color: ' + fontcolor + ';text-align: center;' +
            'border-radius: 5px;margin-left: -25%;width: 50%;left: 50%;top: 25%;' +
            'filter: alpha(opacity=' + opacity * 100 + ');-moz-opacity: ' + opacity + ';opacity: ' + opacity + ';"> </div>';

        var style = '<style>.buffer{background-color:black;height:100%;width:60%;margin:auto;filter:alpha(Opacity=60);-moz-opacity:.6;opacity:.85;border-radius:7px}.buffer_tip{color:wheat;font-size:30px;display:block;padding-top:10px;text-align:center}.spinner{margin:16px auto 57px;width:32px;height:32px;position:relative}.cube1,.cube2{background-color:#67cf22;width:30px;height:30px;position:absolute;top:0;left:0;-webkit-animation:cubemove 1.8s infinite ease-in-out;animation:cubemove 1.8s infinite ease-in-out}.cube2{ -webkit-animation-delay:-0.9s;animation-delay:-0.9s }@-webkit-keyframes cubemove{25%{ -webkit-transform:translateX(42px) rotate(-90deg) scale(0.5)}50%{ -webkit-transform:translateX(42px) translateY(42px) rotate(-180deg)}75%{ -webkit-transform:translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)}100%{ -webkit-transform:rotate(-360deg)}}@keyframes cubemove{25%{ transform:translateX(42px) rotate(-90deg) scale(0.5);-webkit-transform:translateX(42px) rotate(-90deg) scale(0.5)}50%{ transform:translateX(42px) translateY(42px) rotate(-179deg);-webkit-transform:translateX(42px) translateY(42px) rotate(-179deg)}50.1%{ transform:translateX(42px) translateY(42px) rotate(-180deg);-webkit-transform:translateX(42px) translateY(42px) rotate(-180deg)}75%{ transform:translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);-webkit-transform:translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)}100%{ transform:rotate(-360deg);-webkit-transform:rotate(-360deg)}}#href{color:wheat;font-size:20px}a:link{ text-decoration:none}</style>';
        var loaddingdiv = '<div class=\'buffer\' id=\'loadding\' style="display: none;z-index: 999999;position: absolute;left: 25%;top: 20%;height: 150px;" ><span class=\'buffer_tip\' id=\'buffer_tip\' >  Loadding</span><div class="spinner"><div class="cube1"></div><div class="cube2"></div></div></div>';
        var addInfo = style + loaddingdiv;


        var body = document.body;
        var temp = document.createElement('div');
        temp.innerHTML = appendStr;
        document.getElementById('isbox') == null && body.appendChild(temp);
        if (document.getElementById('loadding') == null) {
            body.innerHTML += addInfo;
        }
    },
    show: function (_msg) {
        var _box = document.getElementById('isbox');
        var conf = this.conf();
        if (_box == null) {
            this.init(conf['opacity'], conf['bcolor_success'], conf['fontcolor'], conf['size']);
            _box = document.getElementById('isbox');
        }
        _box.style.display = 'block';
        _box.style.background = conf['bcolor_success'];
        _box.textContent = _msg;
        _box.innerHTML = _msg;
        setTimeout("document.getElementById('isbox').style.display='none'; ", 2000);//延时3秒
    }, error: function (_msg) {
        var _box = document.getElementById('isbox');
        var conf = this.conf();
        if (_box == null) {
            this.init(conf['opacity'], conf['bcolor_errot'], conf['fontcolor'], conf['size']);
            _box = document.getElementById('isbox');
        }
        _box.style.display = 'block';
        _box.style.background = conf['bcolor_errot'];
        _box.textContent = _msg;
        _box.innerHTML = _msg;
        setTimeout("document.getElementById('isbox').style.display='none'; ", 2000);//延时3秒
    }, input: function (msg) {
        /**
         done: 依赖JQ
         var msg = $msgBox.input('请输入宽度');
         $('#'+msg.button).off('click');
         $('#'+msg.button).on('click',function(){
                alert($('#'+msg.input).val());
                $('#'+msg.box).html(' ');
                $('#'+msg.box).hide();
            });
         */
        var _box = document.getElementById('isbox');
        var conf = this.conf();
        if (_box == null) {
            this.init(conf['opacity'], conf['bcolor_success'], conf['fontcolor'], conf['size']);
            _box = document.getElementById('isbox');
        }
        _box = document.getElementById('isbox');
        _box.style.display = 'block';
        _box.style.background = conf['bcolor_success'];
        var temp = document.createElement('div');
        temp.innerHTML = msg + '<br/><lable for="msgboxinput"><input id="msgboxinput"></lable><button id="msgboxinputsend">提交</button>';
        _box.appendChild(temp);
        ;
        return {'box': 'isbox', 'input': 'msgboxinput', 'button': 'msgboxinputsend'};
    }, loaddingshow: function () {
        var _box = document.getElementById('loadding');
        var conf = this.conf();
        if (_box == null) {
            this.init(conf['opacity'], conf['bcolor_success'], conf['fontcolor'], conf['size']);
            _box = document.getElementById('loadding');
        }
        _box = document.getElementById('loadding');
        _box.style.display = 'block';
    }, loaddinghide: function () {
        var _box = document.getElementById('loadding');
        var conf = this.conf();
        if (_box == null) {
            this.init(conf['opacity'], conf['bcolor_success'], conf['fontcolor'], conf['size']);
            _box = document.getElementById('loadding');
        }
        _box = document.getElementById('loadding');
        _box.style.display = 'none';
    }
};
$msgBox.init(0.8, 1, '#FFF', '32');
$msgBox.loaddingshow();


function loadPage(uri='/', data, success) {
    $msgBox.loaddingshow();
    if (document.getElementById('editPlate') == null) {
        document.querySelector('body').innerHTML+='<div id="editPlate">' +
            '<iframe id="pageIframe" width="100%" height="90%" style="margin-top: 52px;margin-left: -1px">' +
            '</iframe></div>';
    }
    var page  =document.getElementById('editPlate') ;
    var pageIframe  =document.getElementById('pageIframe') ;
    if (typeof success == "function") {
        success();
    }
    pageIframe.src=uri;
    page.style.display = 'block';
    page.innerHTML +='<div class="offPage" onclick="removePage()">x</div>';
    $msgBox.loaddinghide();
    $aotoTable.pageSuccess();
}

function removePage() {
    var page  =document.getElementById('editPlate') ;
    page.style.display = 'none';
}
