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
            arr['fontcolor']='#fff';
            arr['size']='2em';
            return arr;
        },
        init:function(opacity,bcolor,fontcolor,size){
            var appendStr='<div onclick="$(this).hide();" id="isbox" style="' +
                'position: fixed;z-index: 9999999; display: none;padding-top: 5%;padding-bottom:5%;font-size:'+size +
                ';background: '+bcolor+';color: '+fontcolor+';text-align: center;' +
                'border-radius: 5px;margin-left: -25%;width: 50%;left: 50%;top: 25%;' +
                'filter: alpha(opacity='+opacity*100+');-moz-opacity: '+opacity+';opacity: '+opacity+';"> </div>';

            var style='<style>.buffer{background-color:black;height:100%;width:60%;margin:auto;filter:alpha(Opacity=60);-moz-opacity:.6;opacity:.85;border-radius:7px}.buffer_tip{color:#ffffff;font-size:30px;display:block;padding-top:10px;text-align:center}.spinner{margin:16px auto 57px;width:32px;height:32px;position:relative}.cube1,.cube2{background-color:#5495ff;width:30px;height:30px;position:absolute;top:0;left:0;-webkit-animation:cubemove 1.8s infinite ease-in-out;animation:cubemove 1.8s infinite ease-in-out}.cube2{ -webkit-animation-delay:-0.9s;animation-delay:-0.9s }@-webkit-keyframes cubemove{25%{ -webkit-transform:translateX(42px) rotate(-90deg) scale(0.5)}50%{ -webkit-transform:translateX(42px) translateY(42px) rotate(-180deg)}75%{ -webkit-transform:translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)}100%{ -webkit-transform:rotate(-360deg)}}@keyframes cubemove{25%{ transform:translateX(42px) rotate(-90deg) scale(0.5);-webkit-transform:translateX(42px) rotate(-90deg) scale(0.5)}50%{ transform:translateX(42px) translateY(42px) rotate(-179deg);-webkit-transform:translateX(42px) translateY(42px) rotate(-179deg)}50.1%{ transform:translateX(42px) translateY(42px) rotate(-180deg);-webkit-transform:translateX(42px) translateY(42px) rotate(-180deg)}75%{ transform:translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);-webkit-transform:translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)}100%{ transform:rotate(-360deg);-webkit-transform:rotate(-360deg)}}#href{color:wheat;font-size:20px}a:link{ text-decoration:none}</style>';
            var loaddingdiv='<div class=\'buffer\' id=\'loadding\' style="display: none;z-index: 999999;position: absolute;left: 25%;top: 20%;height: 150px;" ><span class=\'buffer_tip\' id=\'buffer_tip\' >  Loadding</span><div class="spinner"><div class="cube1"></div><div class="cube2"></div></div></div>';
            var addInfo=style+loaddingdiv;


            var body = document.body;
            var temp = document.createElement('div');
            temp.innerHTML = appendStr;
            document.getElementById('isbox')==null&&body.appendChild(temp);
            if(document.getElementById('loadding')==null){
                body.innerHTML+=addInfo;
            }
        },
        show:function (_msg,out=2000){
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
            setTimeout("document.getElementById('isbox').style.display='none'; ",out);//延时3秒
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
        },loaddingshow:function(){
            var _box=document.getElementById('loadding');
            var conf=this.conf();
            if(_box==null) {
                this.init(conf['opacity'],conf['bcolor_success'],conf['fontcolor'],conf['size']);
                _box=document.getElementById('loadding');
            }
            _box=document.getElementById('loadding');
            _box.style.display='block';
        },loaddinghide:function(){
            var _box=document.getElementById('loadding');
            var conf=this.conf();
            if(_box==null) {
                this.init(conf['opacity'],conf['bcolor_success'],conf['fontcolor'],conf['size']);
                _box=document.getElementById('loadding');
            }
            _box=document.getElementById('loadding');
            _box.style.display='none';
        }
    };
    $msgBox.init(0.8,1,'#FFF','32');
