var jiandao=document.getElementById("jiandao"),
      shitou=document.getElementById("shitou"),
      bu=document.getElementById("bu");

var winTimes=0;
var winTimeElement=document.getElementById("wintime");
var reset=document.getElementById("reset");
var result=document.getElementById("result");
var computerSelect=document.getElementById("computerSelect");
//点击剪刀触发事件
jiandao.onclick=function(){
	var randomSelect=Math.random();
	computerSelect.src=computerChoose(randomSelect);
	shitou.removeAttribute("src");
	bu.removeAttribute("src");
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
shitou.onclick=function(){
	var randomSelect=Math.random();
	computerSelect.src=computerChoose(randomSelect);
	jiandao.removeAttribute("src");
	bu.removeAttribute("src");
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
bu.onclick=function(){
	var randomSelect=Math.random();
	computerSelect.src=computerChoose(randomSelect);
	shitou.removeAttribute("src");
	jiandao.removeAttribute("src");
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
	jiandao.src="images/jiandao.png";
	shitou.src="images/shitou.png";
	bu.src="images/bu.png";
	result.innerHTML="";
	computerSelect.removeAttribute("src");


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