var input=document.getElementById("input"),
      helpList=document.getElementById("helpList");
var inputText,
      List=["abadon","achor","actions","blank","body","cookie","stylesheet","handler","keypress","border","background"];
function check(inputText){
	var regExp=new RegExp("^"+inputText);
	while (helpList.hasChildNodes()) {
    		helpList.removeChild(helpList.firstChild);
    	}
	for(var i=0;i<List.length;i++){
		if(regExp.test(List[i])){
			helpList.style.visibility="visible";
			var targetText=List[i].match(regExp);
			var relatedText=List[i].slice(inputText.length);
			var newLi=document.createElement("li");
			var newSpan1=document.createElement("span");
			var newSpan2=document.createElement("span");
			newSpan1.innerHTML=targetText;
			newSpan1.className="targetSpan";
			newSpan2.innerHTML=relatedText;
			helpList.appendChild(newLi);
			newLi.appendChild(newSpan1);
			newLi.appendChild(newSpan2);
		}
	}
}
addEvent(input,"textInput",function(){
	inputText=input.value+event.data;
	check(inputText);
});
addEvent(input,"keyup",function(event){
	event=event||window.event;
	if(event.keyCode==8){
		inputText=input.value;
		if(inputText!=""){
			check(inputText);
		}else{
		while (helpList.hasChildNodes()) {
    		helpList.removeChild(helpList.firstChild);
    	}
		}
		
	}
});
addEvent(helpList,"click",function(event){
	event=event||window.event;
	var target=event.target;
	input.value=target.innerHTML;
	while (helpList.hasChildNodes()) {
    		helpList.removeChild(helpList.firstChild);
    	}
});
