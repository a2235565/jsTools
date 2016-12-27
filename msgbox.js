var $msgBox={
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
        var _box=document.getElementById('isbox'),
            opacity='0.8',
            bcolor='#000',
            fontcolor='white',
            size='2em';
        if(_box==null) {
            this.init(opacity,bcolor,fontcolor,size);
            _box=document.getElementById('isbox');
        }
        _box.style.display='block';
        _box.style.background=bcolor;
        _box.textContent=_msg;
        setTimeout("document.getElementById('isbox').style.display='none'; ",2000);//延时3秒
},error:function(_msg){
        var _box=document.getElementById('isbox'),
            opacity='0.8',
            bcolor='red',
            fontcolor='white',
            size='2em';
        if(_box==null) {
            this.init(opacity,bcolor,fontcolor,size);
            _box=document.getElementById('isbox');
        }
        _box.style.display='block';
        _box.style.background=bcolor;
        _box.textContent=_msg;
        setTimeout("document.getElementById('isbox').style.display='none'; ",2000);//延时3秒
}
};
