//初始化时找出页面上全部指定className的元素，给每一元素添加可拖拽事件
	(function () {
		//存储具备拖拽事件的元素
		var drags = [];
		//存储当前被鼠标点击的元素信息
		var mousedownElement = {};
		var pageWidth = window.screen.availWidth;
		function getOffsetTop(obj){
		  var tmp = obj.offsetTop;
		  return tmp;
		}
		function getOffsetLeft(obj){
		  var tmp = obj.offsetLeft;
		  return tmp;
		}
		function Draggable(className) {
			//禁止浏览器水平滚动
			document.body.style["overflow-x"]="hidden";
			//获取指定要支持拖拽元素的className
			drags = document.getElementsByClassName(className);
			//给要支持拖拽的每一元素添加鼠标键按下的监听事件
			for (var i =0; i < drags.length; i++) {
				drags[i].addEventListener("mousedown", function (e) {
					//兼容IE9以上版本
					var event = e || window.event;
					//将mousedownElement重置为空对象，以便后续使用
					mousedownElement = {};
					//将目标拖拽元素设置为绝对定位，以便支持拖拽
					this.style.position = "relative";
					//将当前要支持拖拽的元素的引用指向mousedownElement对象的el属性，以便后续使用
					mousedownElement.el = this;
					//添加可拖拽标识
					mousedownElement.draggableFlag = true;
					//元素是否到达页面边界
					mousedownElement.limit = false;
					//存储鼠标和当前要被拖拽元素的坐标差

					 var objTop = getOffsetTop(document.getElementById("work"));//对象x位置
					 var objLeft = getOffsetLeft(document.getElementById("work"));//对象y位置
					 var mouseX = event.clientX+document.body.scrollLeft;//鼠标x位置
					 var mouseY = event.clientY+document.body.scrollTop;//鼠标y位置
					//计算点击的相对位置
					 var objX = mouseX-objLeft;
					 var objY = mouseY-objTop;
				
					mousedownElement.disX = objX;
					mousedownElement.disY = objY;


					// mousedownElement.disX = event.clientX - this.offsetLeft;
					// mousedownElement.disY = event.clientY - this.offsetTop;
				});
			}
			//拖拽事件
			document.addEventListener("mousemove", function (e) {
				var event = window.event || e;
				if (mousedownElement != null && mousedownElement.draggableFlag) {
					var currentElement = mousedownElement.el;
					 var objTop = getOffsetTop(document.getElementById("work"));//对象x位置
					 var objLeft = getOffsetLeft(document.getElementById("work"));//对象y位置
					 var mouseX = event.clientX+document.body.scrollLeft;//鼠标x位置
					 var mouseY = event.clientY+document.body.scrollTop;//鼠标y位置
					//计算点击的相对位置
					 var objX = mouseX-objLeft;
					 var objY = mouseY-objTop;
					 if(objX<0)objX=0;
					 if(objY<0)objY=0;
					 var width1=document.getElementById("work").offsetWidth;
					 var height1= document.getElementById("work").offsetHeight;
					 if(width1-10<objX)objX=width1-10;
					 if(height1-10<objY)objY=height1-10;
					 if(e.target.offsetWidth<100) objX-=e.target.offsetWidth/2;
					 if(e.target.offsetHeight<100) objY-=e.target.offsetHeight/2;
					 currentElement.style.left = objX + "px";
					 currentElement.style.top = objY + "px";
				}
			});
			//鼠标键弹开后，将mousedownElement设置为null,即取消当前被拖拽元素的拖拽事件
			document.addEventListener("mouseup", function (e) {
				var event = window.event || e;
				if (mousedownElement != null && mousedownElement.draggableFlag) {
					mousedownElement.draggableFlag = false;
					mousedownElement == null;
				}
			}) ;
		}
		window.Draggable = Draggable; 
	})(window, undefined);