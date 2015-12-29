var input=document.getElementById("content"),
      confirm=document.getElementById("button"),
      show=document.getElementById("show"),
      input_2=document.getElementById("content_2"),
      confirm_2=document.getElementById("button_2"),
      show_2=document.getElementById("show_2");
      input_3=document.getElementById("content_3"),
      confirm_3=document.getElementById("button_3"),
      show_3=document.getElementById("show_3"),
      checkbox_area=document.getElementById("checkbox_area");
addEvent(input,"click",function(event){
	input.value="";
});
addEvent(input_2,"click",function(event){
	input_2.value="";
});
addEvent(input_3,"click",function(event){
	input_3.value="";
});
addEvent(confirm,"click",function(){
	var value=input.value;
	var valueList=uniqArray(value.split(/[,，]/));
	for (var i=0,len=valueList.length;i<len;i++){
		if(simpleTrim(valueList[i])!=""){
			show.innerHTML+=valueList[i]+" ";
		}
	}
});
addEvent(confirm_2,"click",function(){
	var value=input_2.value;
	var valueList=uniqArray(value.split(/[,，，，;、\n\s]/g));
	for (var i=0,len=valueList.length;i<len;i++){
		if(simpleTrim(valueList[i])!=""){
			show_2.innerHTML+=valueList[i]+" ";
		}
	}
});
addEvent(confirm_3,"click",function(){
	var value=input_3.value;
	var valueList=uniqArray(value.split(/[,，，，;、\n\s]/g));
	if(valueList.length>10||value==""||value=="请输入爱好"){
		document.getElementById("warnning").innerHTML="您的输入超出范围，请输入1-10个之间的爱好";
		return;
	}else{
		document.getElementById("warnning").innerHTML="";
	}
	for (var i=0,len=valueList.length;i<len;i++){
		if(simpleTrim(valueList[i])!=""){
			var checkbox=document.createElement("input");
			var label=document.createElement("label");
			checkbox.type="checkbox";
			checkbox.id=valueList[i];
			label.setAttribute("for",valueList[i]);
			label.innerHTML=valueList[i];
			checkbox_area.appendChild(label);
			checkbox_area.appendChild(checkbox);
		}
	}
});
