# jsTools

## renderTools
```
    仿造vue风格渲染数据 详情请看index页面
```
## msgbox.js
``` 
简易的 msgbox 工具  绑定页面$msgBox变量
```
## validator.js
```
简易的 验证类 验证email 等  信息是否合法
```
## ajax.js  
``` 
如题 
```
## 集成工具包
```
tools.js
```
## tableTools
```
前后端分离 table组件
```
## WebScoketDemo.html
```
基于easyswoole的websocket案例
```
## pageHelp
```
    // 基于jq 的 page渲染工具
    pageHelp.setNowPage(3)
    pageHelp.setDataSize(200)
    pageHelp.setRowSize(8)
    var pageStr = pageHelp.doRender(function (page) {
        return '?page='+page;
    },
    function (page) {
        return `doRenderData(${page})`
    })
    $('#page').html(pageStr);
    pageHelp.showCss();
```
