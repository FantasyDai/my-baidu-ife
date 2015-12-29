var confirm=document.getElementById("confirm"),
      countdown=document.getElementById("countdown");
      input=document.getElementById("input"),
      warnning=document.getElementById("warnning");
var inputValue,dateValue,date,year,month,day;
input.style.width=200+"px";
addEvent(input,"click",function(){
	input.value="";
});
addEvent(confirm,"click",function(){
	inputValue=input.value;
	dateValue=Date.parse(inputValue);
	date=inputValue.split("-");
	year=date[0];
	month=date[1];
	day=date[2];
	var now=Date.now();
	var time=dateValue-now-8*3600*1000;
	if(!/^\d{4}-\d{1,2}-\d{1,2}/.test(inputValue)||!dateValue){
		warnning.innerHTML="您输入的日期格式有误，请重新输入";
		countdown.innerHTML="";
		return;
	}else if(time<0){
		warnning.innerHTML="您输入的日期早于当前时间，请重新输入";
		countdown.innerHTML="";
		return;
	}
	else{
		warnning.innerHTML="";
	}
	
	
	setTimeout(repeat,0);
});
function repeat(){
	var newDate=Date.now();
	var newTime=dateValue-newDate-8*3600*1000;
	if(Date.parse(inputValue)>newDate){
	 var day_1=Math.floor(newTime/(3600*1000*24));
	var hours=Math.floor((newTime%(3600*1000*24))/(3600*1000));
	var min=Math.floor(((newTime%(3600*1000*24))%(3600*1000))/(60*1000));
	var second=Math.floor((((newTime%(3600*1000*24))%(3600*1000))%(60*1000))/1000);
	var timeList=[day_1,hours,min,second];
	for(var i=0;i<timeList.length;i++){
		if(timeList[i]<10){
		timeList[i]="0"+timeList[i];
	}
	}
	
	countdown.innerHTML="距离"+year+"年"+month+"月"+day+"日还有"+timeList[0]+"天"+timeList[1]+"小时"+timeList[2]+"分"+timeList[3]+"秒";
	setTimeout(repeat,1000);
	}
 }