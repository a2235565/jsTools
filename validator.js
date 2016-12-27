/**
 * 验证类
 * @type {{conf: Function, isEmail: Function, isMobile: Function, isPhone: Function, isChinese: Function, isCode: Function}}
 */
var $validator={
conf:function(){
    var arr=new Array()
    arr['Email']=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    arr['Mobile']=/^((\d{2,3})|(\d{3}\-))?1(3|5|8)\d{9}$/;
    arr['Phone']=/^[\d\-\+\.\(\)]{1,30}$/;
    arr['Chinese']=/^[\u0391-\uFFE5]+$/;
    arr['Code']=/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    return arr;
},isEmail:function(str){
        return this.conf()['Email'].test(str);
},isMobile:function(str){
        return this.conf()['Mobile'].test(str);
},isPhone:function(str){
        return this.conf()['Phone'].test(str);
},isChinese:function(str){
        return this.conf()['Chinese'].test(str);
},isCode:function(str){
        return this.conf()['Code'].test(str);
}
};