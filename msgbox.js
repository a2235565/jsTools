/**
 * show :success msg
 * error : error msg
 * @type {{conf: Function, init: Function, show: Function, error: Function}}
 */

var $msgBox={
conf:function(){
    var arr=new Array();
    arr['opacity']='0.8';
    arr['bcolor_errot']='red';
    arr['bcolor_success']='#000';
    arr['fontcolor']='white';
    arr['size']='2em';
    return arr;
},
init:function(opacity,bcolor,fontcolor,size){
        var appendStr='<div id="isbox" style="' +
            'position: fixed;display: none;padding-top: 5%;padding-bottom:5%;font-size='+size +
            'padding-bottom: 10%;background: '+bcolor+';color: '+fontcolor+';text-align: center;' +
            'border-radius: 5px;margin-left: -25%;width: 50%;left: 50%;top: 25%;' +
            'filter: alpha(opacity='+opacity*100+');-moz-opacity: '+opacity+';opacity: '+opacity+';"> </div>';
        var body = document.body;
        var temp = document.createElement('div');
        temp.innerHTML = appendStr;
        _box=document.getElementById('isbox')==null&&body.appendChild(temp);
},
show:function (_msg){
        var _box=document.getElementById('isbox');
        var conf=this.conf();
        if(_box==null) {
            this.init(conf['opacity'],conf['bcolor_success'],conf['fontcolor'],conf['size']);
            _box=document.getElementById('isbox');
        }
        _box.style.display='block';
        _box.style.background=conf['bcolor_success'];
        _box.textContent=_msg;
       _box.innerHTML =_msg;
        setTimeout("document.getElementById('isbox').style.display='none'; ",2000);//延时3秒
},error:function(_msg){
        var _box=document.getElementById('isbox');
        var conf=this.conf();
        if(_box==null) {
            this.init(conf['opacity'],conf['bcolor_errot'],conf['fontcolor'],conf['size']);
            _box=document.getElementById('isbox');
        }
        _box.style.display='block';
        _box.style.background=conf['bcolor_errot'];
        _box.textContent=_msg;
       _box.innerHTML =_msg;
        setTimeout("document.getElementById('isbox').style.display='none'; ",2000);//延时3秒
},input:function(msg){
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
        var _box=document.getElementById('isbox');
        var conf=this.conf();
        if(_box==null) {
            this.init(conf['opacity'],conf['bcolor_success'],conf['fontcolor'],conf['size']);
            _box=document.getElementById('isbox');
        }
        _box=document.getElementById('isbox');
        _box.style.display='block';
        _box.style.background=conf['bcolor_success'];
        var temp = document.createElement('div');
        temp.innerHTML = msg+'<br/><lable for="msgboxinput"><input id="msgboxinput"></lable><button id="msgboxinputsend">提交</button>';
        _box.appendChild(temp);;
        return {'box':'isbox','input':'msgboxinput','button':'msgboxinputsend'};
}
};
