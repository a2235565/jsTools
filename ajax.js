/**
* 简易的AJAX
*/
var $Ajax={
run: function (options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = this.formatParams(options.data);

        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

     
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                	if (xhr.responseXML) xhr.responseText=xhr.responseXML;
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
},formatParams:function (data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".",""));
        return arr.join("&");
},post:function(url,data,functions){
	this.run({
        url: url,              //请求地址
        type: "POST",                       //请求方式
        data: data,        //请求参数
        dataType: "json",
        success: functions,
        fail: functions
    });
},get:function(url,functions){
	this.run({
        url: url,              //请求地址
        type: "GET",                       //请求方式
        data: null,        //请求参数
        dataType: "json",
        success: functions,
        fail: functions
    });
}
}