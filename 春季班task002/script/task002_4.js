var input=document.getElementById("input"),
      helpList=document.getElementById("helpList"),
      container=document.getElementById("container");
var inputText,
      inputData,
      inputValue,
      List=["attribute","animal","abadon","achor","actions","blank","body","cookie","stylesheet","handler","keypress","border","background"];
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
//addEvent(input,"textInput",function(){
	//inputValue=input.value+event.data;
//});
addEvent(input,"keyup",function(event){
	if(event.keyCode!=13){
		event=event||window.event;
		if(event.keyCode==8){
			event.target.className="focused";
		}
		if(event.target.className=="focused"){
			inputText=input.value;
			if(inputText!=""){
				check(inputText);
			}else{
				while (helpList.hasChildNodes()) {
    				helpList.removeChild(helpList.firstChild);
    				}
			}
		}
	}
});
addEvent(helpList,"click",function(event){
	event=event||window.event;
	var target=event.target
	if(target.nodeName=="LI"){
	input.value=target.firstChild.innerHTML+target.lastChild.innerHTML;
	}else if(target.nodeName=="SPAN"){
		input.value=target.parentElement.firstChild.innerHTML+target.parentElement.lastChild.innerHTML;
	}
	while (helpList.hasChildNodes()) {
    		helpList.removeChild(helpList.firstChild);
    	}
    	helpList.style.visibility="hidden";
});

addEvent(helpList,"mouseover",function(event){
	  var liList=document.getElementsByTagName("LI");
	  
	if(event.target.nodeName=="LI"){
		input.className="";
		for(var i=0;i<liList.length;i++){
			liList[i].className="";
		}
		event.target.className="focused";
	}else if(event.target.parentElement.nodeName=="LI"){
		input.className="";
		for(var i=0;i<liList.length;i++){
			liList[i].className="";
		}
		event.target.parentElement.className="focused";
	}
	
});
addEvent(helpList,"mouseout",function(event){
	var liList=document.getElementsByTagName("LI");
	for(var i=0;i<liList.length;i++){
			liList[i].className="";
		}
	input.className="focused";
});

addEvent(container,"keydown",function(event){
	var target=event.target;
	var nextNode=document.getElementsByTagName("li");
	if(event.keyCode=="13"){
		while (helpList.hasChildNodes()) {
    		helpList.removeChild(helpList.firstChild);
    		}
    		helpList.style.visibility="hidden";
    		input.className="focused";
		}
	if(target.className=="focused"){
		if(event.keyCode==40){
		helpList.firstChild.className="focused";
		target.value=helpList.firstChild.children[0].innerHTML+helpList.firstChild.children[1].innerHTML;
		target.className="";
	}else if(event.keyCode==38){
		helpList.lastChild.className="focused";
		target.value=helpList.lastChild.children[0].innerHTML+helpList.lastChild.children[1].innerHTML;
		target.className="";
	}
	}else{	
		focusNode=document.getElementsByClassName("focused")[0];
		focusNode.className="";
		if(event.keyCode==40){
			 for(var i=0;i<nextNode.length;i++){
		 		if(focusNode.isEqualNode(nextNode[i])){
		 			if(i==(nextNode.length-1)){
		 			target.className="focused";
		 			target.value=document.getElementsByClassName("targetSpan")[0].innerHTML;
		 			}else{
		 				nextNode[i+1].className="focused";
		 				target.value=nextNode[i+1].firstChild.innerHTML+nextNode[i+1].lastChild.innerHTML;
		 			}
		 		}
			 }
		}else if(event.keyCode==38){
		 	for(var i=0;i<nextNode.length;i++){
		 		if(focusNode.isEqualNode(nextNode[i])){
		 			if(i==0){
		 				target.className="focused";
		 				target.value=document.getElementsByClassName("targetSpan")[0].innerHTML;
		 			}else{
		 				nextNode[i-1].className="focused";
		 				target.value=nextNode[i-1].firstChild.innerHTML+nextNode[i-1].lastChild.innerHTML;
		 			}
		 		}
			 }
		}

	}
});
