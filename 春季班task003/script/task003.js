var classButton=document.getElementById("class-button"),
      hiddenBg=document.getElementById("hidebg"),
      addClass=document.getElementById("add-class"),
      cancelClass=document.getElementById("cancel-class"),
      addClassButton=document.getElementById("add-class-button"),
      warning=document.getElementById("warning"),
      classList=document.getElementById("class-list");

//点击分类标题
addEvent(classList,"click",function(event){
	event=event||window.event;
	var target=event.target;
	var choosenClass=document.getElementsByClassName("choosen-class");
	for (var i=0,len=choosenClass.length;i<len;i++){
		if(choosenClass[i].nodeName=="LI"){
			choosenClass[i].className="class-item-1";
		}else{
			choosenClass[i].className="";
		}
	}
	if(target.nodeName=="H2"||target.nodeName=="H3"||target.className=="class-item-1"){
		target.className="choosen-class";
	}

});

//点击新增分类按钮
addEvent(classButton,"click",function(){
	hiddenBg.style.display="block";
	addClass.style.display="block";
});
//新增分类界面点击关闭按钮
addEvent(cancelClass,"click",function(){
	hiddenBg.style.display="none";
	addClass.style.display="none";
	warning.innerHTML="";
});
//新增分类界面点击取消或保存按钮
addEvent(addClassButton,"click",function(event){
	event=event||window.event;
	var target=event.target,
	      className=document.getElementById("class-name"),
	      classNameList=document.getElementsByClassName("class-item-0");
	if(target.value=="取消"){
		hiddenBg.style.display="none";
		addClass.style.display="none";
		warning.innerHTML="";
	}else if(target.value=="保存"){
		if(className.value==""){
			warning.innerHTML="类名不能为空！";
		}else{
			for(var i=0,len=classNameList.length;i<len;i++){
				if(className.value==classNameList[i].children[0].innerHTML){
					warning.innerHTML="类名已存在！";
					return;
				}
			}
			var newClassText=className.value;
			var newClass=document.createElement("li");
			var newClassName=document.createElement("h3");
			classList.appendChild(newClass);
			newClass.className="class-item-0";
			newClass.appendChild(newClassName);
			newClassName.innerHTML=newClassText;
			hiddenBg.style.display="none";
			addClass.style.display="none";
			className.value="";
			
		}
	}
});