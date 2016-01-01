var targetArea=document.getElementsByClassName("targetarea"),
       dragItem=document.getElementsByClassName("drag"),
       dragingItem=document.getElementsByClassName("draging"),
       left=document.getElementById("left"),
       right=document.getElementById("right"),
       leftValue,
       topValue,
       mouseOffset;

var leftBegin=getOffset(left),
      leftEnd={x:leftBegin.x+left.offsetWidth,
      	        y:leftBegin.y+left.offsetHeight
      },
      rightBegin=getOffset(right),
      rightEnd={x:rightBegin.x+right.offsetWidth,
      	        y:rightBegin.y+right.offsetHeight
      };

//获取元素相对于document的偏移量
function getOffset(ele){
	var x=0,y=0;
	while(ele){
		y+=ele.offsetTop;
		x+=ele.offsetLeft;
		ele=ele.offsetParent;
	}
	return{
		x:x,
		y:y
	}
}
//获取鼠标的位置
function getMousePosition(event){
	if(event.pageX || event.pageY){
  		return {x:event.pageX, y:event.pageY};
 	}
 	return {
  		x:event.clientX + document.body.scrollLeft - document.body.clientLeft,
  		y:event.clientY + document.body.scrollTop  - document.body.clientTop
 	};
}
//获取鼠标相对目标元素的偏移量
function getMouseOffset(ele,event){
	var elePosition=getOffset(ele);
	var mousePosition=getMousePosition(event);
	return{
		x:mousePosition.x-elePosition.x,
		y:mousePosition.y-elePosition.y
	}

}
//为拖动元素设置点击事件
for(var i=0,len=dragItem.length;i<len;i++){
	// 为拖拽源监听dragstart,设置关联数据
	addEvent(dragItem[i],"mousedown",function(event){
		var elePosition=getOffset(event.target);
		event.target.style.left=elePosition.x+"px";
		event.target.style.top=elePosition.y+"px";
		event.target.className="draging";
		event.target.id="draging";
		event.target.style.backgroundColor="rgba(255,0,0,0.5)";

		mouseOffset=getMouseOffset(event.target,event);
	});
}
/*for(var i=0,len=dragItem.length;i<len;i++){
	// 为拖拽源监听dragstart,设置关联数据
	addEvent(dragItem[i],"dragstart",function(event){
		event.target.className="draging";
	});
	//拖拽鼠标元素跟随移动
	addEvent(dragItem[i],"drag",function(event){
		event.target.style.left=leftValue;
		event.target.style.top=topValue;

	})
}*/


addEvent(document,"mousemove",function(event){
	var target=document.getElementById("draging");
	event=event||window.event;
	var mousePosition=getMousePosition(event);
	if(target!=null){
	target.style.left=mousePosition.x-mouseOffset.x+"px";
	target.style.top=mousePosition.y-mouseOffset.y+"px";
		if(mousePosition.x>leftBegin.x&&mousePosition.y>leftBegin.y
		    	&&mousePosition.x<leftEnd.x&&mousePosition.y<leftEnd.y){
				left.style.borderColor="blue";
				left.style.boxShadow="0 0 5px #000";
		}else{
			left.style.borderColor="#000";
			left.style.boxShadow="";
		}
		if(mousePosition.x>rightBegin.x&&mousePosition.y>rightBegin.y
		   	 &&mousePosition.x<rightEnd.x&&mousePosition.y<rightEnd.y){
				right.style.borderColor="blue";
				right.style.boxShadow="0 0 5px #000";
		}else{
			right.style.borderColor="#000";
			right.style.boxShadow="";
		}
	}

});
//当松开鼠标时
addEvent(document,"mouseup",function(event){
	var dropPosition=getMousePosition(event);
	if(event.target.className=="draging"){
		event.target.className="drag";
		event.target.id="";
		event.target.style.backgroundColor="red";
		if(dropPosition.x>leftBegin.x&&dropPosition.y>leftBegin.y
		    &&dropPosition.x<leftEnd.x&&dropPosition.y<leftEnd.y){
			left.style.borderColor="#000";
			left.style.boxShadow="";
			left.appendChild(event.target);

		}else if(dropPosition.x>rightBegin.x&&dropPosition.y>rightBegin.y
		    &&dropPosition.x<rightEnd.x&&dropPosition.y<rightEnd.y){
			right.appendChild(event.target);
			right.style.borderColor="#000";
			right.style.boxShadow="";
		}
	}	
})
// 拖拽鼠标移入元素,在拖放目标上设置视觉反馈
        
        // 取消元素dragover默认行为,使其可拖放
        

        // 拖拽移出元素,清除视觉反馈
        

        // 鼠标释放,在拖放目标上接收数据并处理