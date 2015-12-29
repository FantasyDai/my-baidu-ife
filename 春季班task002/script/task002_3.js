var imageList=document.getElementById("image_list"),
      buttonList=document.getElementById("button_list"),
      image=document.getElementsByClassName("ing");
      choose=document.getElementsByTagName("span");
var index=1;
var loop= true,//设置无缝循环
      autoPlay=true,//自动轮播
      autoTime=2000,//轮播时间间隔
      changeTime=1000,//滚动时间
      pagination=true, //点状态列表
      positive=true,//正序轮播
      negative=false,//倒序轮播
      distance,//位移距离
      timer,
      cancelLoop;
      if(pagination){
	for(var i=0;i<choose.length;i++){
		addEvent(choose[i],"click",function(){
			lastIndex=document.getElementsByClassName("on")[0].getAttribute("index");
			if(this.className=="on"){
				return;
			}else{
				this.className="on";
				var thisIndex=this.getAttribute("index");
				for(var j=0;j<choose.length;j++){
					if(choose[j].getAttribute("index")!=thisIndex){
						choose[j].className="";
					}
				}
				offset=(thisIndex-lastIndex)*(-615);
				animate(offset);
			}
      	
    	  });
	}
}
//图片切换

function animate(offset){
	var time=changeTime;//位移总时间
	var interval=25;//每次位移时间
	var perOffset=offset/(time/interval);//每次位移量
	var newLeft=parseInt(imageList.style.left)+offset;
	function run(){
		imageList.style.left=parseInt(imageList.style.left)+perOffset+"px";
		if(perOffset<0&&parseInt(imageList.style.left)>newLeft||perOffset>0&&parseInt(imageList.style.left)<newLeft){
			cancelLoop=setTimeout(run,interval);
		}else{	
			imageList.style.left=newLeft+"px";
			if(!loop){
				if(newLeft>-1230||newLeft<-3075){
					stop();
				}
			}
			if(newLeft>-615){
					imageList.style.left=-3690+"px";
				}
				
			if(newLeft<-3690){
				imageList.style.left=-615+"px";
			}
		
		}
	
	}
	setTimeout(run,interval);
}
  function showButton() {
                for (var i = 0; i < choose.length ; i++) {
                    if( choose[i].className == 'on'){
                        choose[i].className = '';
                        break;
                    }
                }
                choose[index - 1].className = 'on';
            }
//自动轮播
function play(){
		timer=setTimeout(function(){
			if(!autoPlay){
				return;
			}
			if (index == 6) {
                    			index = 1;
               		 }
                		else {
                    			index += 1;
               		 }
               		 animate(distance);
               		 showButton();
               		 play();
		},autoTime);
}
function stop() {
                clearTimeout(timer);
                index=parseInt(document.getElementsByClassName("on")[0].getAttribute("index"));
            }
window.onload=function(){
	if(!autoPlay){
		return;
	}else if(positive){
		distance=-615;
	}else if(negative){
		distance=615;
	}
	play();
};
 container.onmouseover = stop;
  container.onmouseout = play;