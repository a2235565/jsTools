 var pageHelp = {
        nowPage:1,
        pageStr:'',
        rowSize:8,
        dataSize:0,
        showCss:function(){
            $('body').append(
                '<style>.pages a{text-decoration:none;color: #000}   .pages{margin-top:10px;width:100%;height:38px;display:flex;flex-direction:row;align-items:center;justify-content:center;font-size:14px;font-family:Microsoft YaHei;color:#999}.pages div{width:88px;height:38px;background:rgba(255,255,255,1);border:1px solid rgba(228,228,228,1);border-radius:2px;text-align:center;line-height:38px;margin-right:5px;cursor:pointer}.pages p{width:38px;height:38px;background:rgba(255,255,255,1);border:1px solid rgba(228,228,228,1);border-radius:2px;line-height:38px;text-align:center;margin-right:5px;cursor:pointer}.pages .moveClass{border:0;background:inherit}.pages p:hover{background:#c4aa7c;color:#fff}.pages .active-pages{background:#c4aa7c;color:#fff}</style>'
            );
        },
        setNowPage:function (page) {
            this.nowPage = page
        },
        getNowPage:function () {
            return this.nowPage
        },
        getPageStr:function () {
            return this.pageStr
        },
        setDataSize:function (size) {
            this.dataSize = size
        },
        setRowSize:function (size) {
            this.rowSize = size
        },
        doRender:function (hrefCallback=null,onclickCallbacl=null) {
            let _this = this;
            _this.pageStr = '';
            if (Math.floor(_this.dataSize / _this.rowSize) == 0) {
                _this.pageStr += '<p class="active-pages">1</p>';
            } else {
                let start = 1;
                let tempHref = '';
                let tempOnClick = '';
                let max = Math.round(_this.dataSize / _this.rowSize);
                if (_this.nowPage - 1 > 1) {
                    start = _this.nowPage - 1;
                }

                function renderShowStr(page) {
                    if(typeof hrefCallback== "function"){
                        tempHref = hrefCallback(page)
                    }else{
                        tempHref ="?page=" + page + ".html";
                    }
                    if (typeof onclickCallbacl == "function") {
                        tempOnClick = onclickCallbacl(page);
                    }
                }

                if (_this.nowPage > 1) {
                    let pre = _this.nowPage - 1;
                    renderShowStr(1)
                    _this.pageStr += "<a class='pagePreClass' onclick='"+tempOnClick+"' href=\""+tempHref+"\" ><div>首页</div></a>";
                    renderShowStr(pre)
                    _this.pageStr += "<a class='pagePreClass' onclick='"+tempOnClick+"' href=\""+tempHref+"\" ><div>上一页</div></a>";
                }

                if (_this.nowPage > 2) {
                    _this.pageStr += "<p class='moveClass'>...</p>";
                }

                let count = 0;
                for (let i = start; i <= max; i++) {
                    let av = '';
                    if (i == _this.nowPage) av = 'active-pages';
                    count++;
                    if (count > 3) {
                        _this.pageStr += "<p class='moveClass'>...</p>";
                        break;
                    }
                    renderShowStr(i)
                    _this.pageStr += "<a  onclick='"+tempOnClick+"' href=\""+tempHref+"\"> <p class='pageList " + av + "'>" + i + "</p></a>";
                }
                if (max - start >= 3) {
                    renderShowStr(max)
                    _this.pageStr += "<a  onclick='"+tempOnClick+"' href=\""+tempHref+"\" ><p class='pageList'>" + max + "</p></a>";
                }
            }
            return '<div class="pages">'+_this.getPageStr()+'</div>'
        }
    };
    // 基于jq  请先导入jq
    // pageHelp.setNowPage(3)
    // pageHelp.setDataSize(200)
    // pageHelp.setRowSize(8)
    // var pageStr = pageHelp.doRender(function (page) {
    //     return '?page='+page;
    // },
    // function (page) {
    //     return `doRenderData(${page})`
    // })
    // $('#page').html(pageStr);
    // pageHelp.showCss();
