'use strict';
var jiandao=document.getElementById("jiandao");
      	var shitou=document.getElementById("shitou");
      	var bu=document.getElementById("bu");
var winTimes=0;
var winTimeElement=document.getElementById("wintime");
var reset=document.getElementById("reset");
var result=document.getElementById("result");
var parent=document.getElementById("parent");
//点击剪刀触发事件
function jiandaoClick(){
	var jiandao=document.getElementById("jiandao");
      	var shitou=document.getElementById("shitou");
     	var bu=document.getElementById("bu");
	var randomSelect=Math.random();
	var yourSelectImg=document.createElement("img");
	var computerSelectImg=document.createElement("img");
	yourSelectImg.setAttribute("src",jiandao.src);
	yourSelectImg.setAttribute("id","yourSelect");
	computerSelectImg.setAttribute("src",computerChoose(randomSelect));
	computerSelectImg.setAttribute("id","computerSelect");
	parent.removeChild(jiandao);
	parent.removeChild(shitou);
	parent.removeChild(bu);
	parent.insertBefore(yourSelectImg,result);
	parent.appendChild(computerSelectImg);
	if(randomSelect<0.33){
		result.innerHTML="TIED";
	}
	else if(randomSelect<0.67){
		result.innresultL="YOU LOSE";
	}
	else{
		result.innerHTML="YOU WIN";
		winTimes++;
		winTimeElement.innerHTML=winTimes;

	}
}
//点击石头触发事件
function shitouClick(){
	var jiandao=document.getElementById("jiandao");
      	var shitou=document.getElementById("shitou");
      	var bu=document.getElementById("bu");
	var randomSelect=Math.random();
	var yourSelectImg=document.createElement("img");
	var computerSelectImg=document.createElement("img");
	yourSelectImg.setAttribute("src",shitou.src);
	yourSelectImg.setAttribute("id","yourSelect");
	computerSelectImg.setAttribute("src",computerChoose(randomSelect));
	computerSelectImg.setAttribute("id","computerSelect");
	parent.removeChild(jiandao);
	parent.removeChild(shitou);
	parent.removeChild(bu);
	parent.insertBefore(yourSelectImg,result);
	parent.appendChild(computerSelectImg);
	if(randomSelect<0.33){
		result.innerHTML="YOU WIN";
		winTimes++;
		winTimeElement.innerHTML=winTimes;
	}
	else if(randomSelect<0.67){
		result.innerHTML="TIED";
	}
	else{
		result.innerHTML="YOU LOSE";
	}
}
//点击布触发事件
function buClick(){
	var jiandao=document.getElementById("jiandao");
      	var shitou=document.getElementById("shitou");
      	var bu=document.getElementById("bu");
	var randomSelect=Math.random();
	var yourSelectImg=document.createElement("img");
	var computerSelectImg=document.createElement("img");
	yourSelectImg.setAttribute("src",bu.src);
	yourSelectImg.setAttribute("id","yourSelect");
	computerSelectImg.setAttribute("src",computerChoose(randomSelect));
	computerSelectImg.setAttribute("id","computerSelect");
	parent.removeChild(jiandao);
	parent.removeChild(shitou);
	parent.removeChild(bu);
	parent.insertBefore(yourSelectImg,result);
	parent.appendChild(computerSelectImg);
	if(randomSelect<0.33){
		result.innerHTML="YOU LOSE";
	}
	else if(randomSelect<0.67){
		result.innerHTML="YOU WIN";
		winTimes++;
		winTimeElement.innerHTML=winTimes;
	}
	else{
		result.innerHTML="TIED";
	}
}

//点击重新开始重置页面
reset.onclick=function(){
	var computerSelect=document.getElementById("computerSelect");
	var yourSelect=document.getElementById("yourSelect");
	var jiandaoImg=document.createElement("img");
	var shitouImg=document.createElement("img");
	var buImg=document.createElement("img");
	jiandaoImg.setAttribute("id","jiandao");
	jiandaoImg.setAttribute("class","select");
	jiandaoImg.setAttribute("src",'images/jiandao.png');
	jiandaoImg.setAttribute("onclick","jiandaoClick()");
	shitouImg.setAttribute("id","shitou");
	shitouImg.setAttribute("class","select");
	shitouImg.setAttribute("src",'images/shitou.png');
	shitouImg.setAttribute("onclick","shitouClick()");
	buImg.setAttribute("id","bu");
	buImg.setAttribute("class","select");
	buImg.setAttribute("src",'images/bu.png');
	buImg.setAttribute("onclick","buClick()");
	parent.removeChild(yourSelect);
	parent.removeChild(computerSelect);
	parent.insertBefore(jiandaoImg,result);
	parent.insertBefore(shitouImg,result);
	parent.insertBefore(buImg,result);
	result.innerHTML="";
}
//电脑选择
function computerChoose(select){
	if(select<0.33){
	return 'images/jiandao.png';
}
else if(select<0.67){
	return 'images/shitou.png';
}
else{
	return 'images/bu.png';
}
}