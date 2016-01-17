var  data=[{classname:"默认分类",task:[{date:"2016-01-08",title:["示例任务1"],content:["学习使用GTD Tools-1"],state:[1]},
				          {date:"2016-01-09",title:["示例任务2"],content:["学习使用GTD Tools-2"],state:[0]}]}],
      classButton=document.getElementById("class-button"), 
      hiddenBg=document.getElementById("hidebg"),
      addClass=document.getElementById("add-class"),
      cancelClass=document.getElementById("cancel-class"),
      addClassButton=document.getElementById("add-class-button"),
      warning=document.getElementById("warning"),
      classList=document.getElementById("class-list"),
      addTask=document.getElementById("add-task-button"),
      writeTitle=document.getElementById("write-title"),
      writeDate=document.getElementById("write-date"),
      writeContent=document.getElementById("write-content"),
      writeButton=document.getElementById("write-content-button"),
      choosenTitle=document.getElementById("choosen-title"),
      choosenDate=document.getElementById("choosen-date"),
      choosenContent=document.getElementsByTagName("textarea"),
      showTask=document.getElementById("show-task"),
      titleWarning=document.getElementById("title-warning"),
      dateWarning=document.getElementById("date-warning"),
      contentWarning=document.getElementById("content-warning"),
      taskList=document.getElementById("task-list"),
      taskState=document.getElementById("task-state"),
      subData=[];



//点击分类标题
addEvent(classList,"click",function(event){
	event=event||window.event;
	var target=event.target;
	var choosenClass=document.getElementsByClassName("choosen-class");
	showTaskList(target);
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
//清空任务列表
function removeTask(){
	for(var i=taskList.children.length-1;i>=0;i--){
		taskList.removeChild(taskList.children[i]);
	}
}
//更新任务列表函数
function showTaskList(target){
	if(target.nodeName=="H3"){
		subData=[];
		removeTask();
		for(var i=0;i<data.length;i++){
			if(target.innerHTML==data[i].classname){
				for(var j=0;j<data[i].task.length;j++){
					subData.push(data[i].task[j]);
					var date=document.createElement('li');
					var task=document.createElement("ul");
					date.innerHTML=data[i].task[j].date;
					date.className="task-time";
					taskList.appendChild(date);
					taskList.appendChild(task);
					for(var k=0;k<data[i].task[j].title.length;k++){
						var taskTitle=document.createElement("li");
						taskTitle.innerHTML=data[i].task[j].title[k];
						taskTitle.className="task-title";
						task.appendChild(taskTitle);
					}
				}
			}
		}
	}else if(target.className=="class-item-1"||target.className=="choosen-class"){  //当点击的是子分类时
		removeTask();
		subData=[];
		for(var i=0;i<data.length;i++){
			if(data[i].subclass){
				for(var s=0;s<data[i].subclass.length;s++){
					if(target.innerHTML==data[i].subclass[s].subclassname){
						for(var j=0;j<data[i].subclass[s].task.length;j++){
							subData.push(data[i].subclass[s].task[j]);
							var date=document.createElement('li');
							var task=document.createElement("ul");
							date.innerHTML=data[i].subclass[s].task[j].date;
							date.className="task-time";
							taskList.appendChild(date);
							taskList.appendChild(task);
							for(var k=0;k<data[i].subclass[s].task[j].title.length;k++){
								var taskTitle=document.createElement("li");
								taskTitle.innerHTML=data[i].subclass[s].task[j].title[k];
								taskTitle.className="task-title";
								task.appendChild(taskTitle);
							}
						}
					}
				}
			}
		}
	}else if(target.className=="task-type"){//点击的是任务状态标签
		removeTask();
		var choosen=document.getElementsByClassName("choosen-class")[0];
		if(target.innerHTML=="所有"){
			showTaskList(choosen);
		}else if(target.innerHTML=="未完成"){
			for(var i=0;i<subData.length;i++){
				var date=document.createElement('li');
				var task=document.createElement("ul");
				date.innerHTML=subData[i].date;
				date.className="task-time";
				taskList.appendChild(date);
				taskList.appendChild(task);
				for(var j=0;j<subData[i].state.length;j++){
					if(subData[i].state[j]==0){
						var taskTitle=document.createElement("li");
						taskTitle.innerHTML=subData[i].title[j];
						taskTitle.className="task-title";
						task.appendChild(taskTitle);
					}
				}
				if(task.children.length==0){
					taskList.removeChild(date);
					taskList.removeChild(task);
				}

			}
		}else if(target.innerHTML=="已完成"){
			for(var i=0;i<subData.length;i++){
				var date=document.createElement('li');
				var task=document.createElement("ul");
				date.innerHTML=subData[i].date;
				date.className="task-time";
				taskList.appendChild(date);
				taskList.appendChild(task);
				for(var j=0;j<subData[i].state.length;j++){
					if(subData[i].state[j]==1){
						var taskTitle=document.createElement("li");
						taskTitle.innerHTML=subData[i].title[j];
						taskTitle.className="task-title";
						task.appendChild(taskTitle);
					}
				}
				if(task.children.length==0){
					taskList.removeChild(date);
					taskList.removeChild(task);
				}

			}
		}
	}
}

//点击新增分类按钮
addEvent(classButton,"click",function(){
	var choosenClass=document.getElementsByClassName("choosen-class");
	if(choosenClass[0].nodeName=="LI"){
		alert("此分类下暂不支持新增子分类！")
	}else{
		hiddenBg.style.display="block";
		addClass.style.display="block";
	}
	
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
	      newClassText=className.value,
	      classNameList=document.getElementsByClassName("class-item-0"),
	      choosenClass=document.getElementsByClassName("choosen-class");
	if(target.value=="取消"){
		hiddenBg.style.display="none";
		addClass.style.display="none";
		warning.innerHTML="";
	}else if(target.value=="保存"){
		if(className.value==""){
			warning.innerHTML="类名不能为空！";
		}else{
			if(choosenClass[0].nodeName=="H2"){
				for(var i=0,len=data.length;i<len;i++){
					if(className.value==data[i].classname){
						warning.innerHTML="类名已存在！";
						return;
					}
				}
				var newClass=document.createElement("li");
				var newClassName=document.createElement("h3");
				classList.appendChild(newClass);
				newClass.className="class-item-0";
				newClass.appendChild(newClassName);
				newClassName.innerHTML=newClassText;
				hiddenBg.style.display="none";
				addClass.style.display="none";
				className.value="";
				data.push({classname:newClassText,
					     subclass:[],
					     task:[]
					     });
			}else{    
				for(var i=0,len=data.length;i<len;i++){
					if(data[i].classname==choosenClass[0].innerHTML){
						for(var j=0;j<data[i].subclass.length;j++){
							if(data[i].subclass[j].subclassname==className.value){
								warning.innerHTML="类名已存在！";
								return;
						}	}
					}
				}

				var newClassName=document.createElement("li");
				 newClassName.innerHTML=newClassText;
				 newClassName.className="class-item-1";
				if(choosenClass[0].nextElementSibling){
					choosenClass[0].nextElementSibling.appendChild(newClassName);
				}else{
					var newClass=document.createElement("ul");
					insertAfter(newClass,choosenClass[0]);
					newClass.appendChild(newClassName);
				}
				for(var i=0,len=data.length;i<len;i++){
					if(data[i].classname==choosenClass[0].innerHTML){
						data[i].subclass.push({subclassname:newClassText,task:[]});
					}
				}
				hiddenBg.style.display="none";
				addClass.style.display="none";
				className.value="";
			}
		}
	}
});
//点击新增任务按钮
addEvent(addTask,"click",function(){
	writeTitle.style.display="inline";
	writeDate.style.display="inline";
	writeContent.style.display="block";
	choosenTitle.innerHTML="";
	choosenDate.innerHTML="";
	showTask.innerHTML="";
});
//点击取消或保存新增任务按钮
addEvent(writeButton,"click",function(event){
	event=event||window.event;
	var target=event.target,
	     taskTitle=writeTitle.value,
	     taskDate=writeDate.value,
	     taskContent=writeContent.children[0].value,
	     choosenClass=document.getElementsByClassName("choosen-class"),
	     hasTaskDate=false,
	     hasInsert=false;
	if(target.value=="取消"){
		titleWarning.innerHTML="";
		dateWarning.innerHTML="";
		contentWarning.innerHTML="";
		writeTitle.style.display="none";
		writeDate.style.display="none";
		writeContent.style.display="none";
		writeTitle.value="";
		writeDate.value="";
		writeContent.children[0].value="";
	}else if(target.value=="保存"){
		if(writeTitle.value==""){
			titleWarning.innerHTML="请输入任务标题！";
			return;

		}else{
			titleWarning.innerHTML="";
		}
		if(writeDate.value==""){
			dateWarning.innerHTML="请输入任务时间！";
			return;
		}
		else{
			dateWarning.innerHTML="";
		}
		if(writeContent.children[0].value==""){
			contentWarning.innerHTML="请输入任务内容！";
			return;
		}
		else{
			contentWarning.innerHTML="";
		}
		for(var i=0,len=data.length;i<len;i++){
			if(data[i].classname==choosenClass[0].innerHTML){
				var choosen=document.getElementsByClassName("choosen-class")[0];
				inseretData(i,taskTitle,taskDate,taskContent, hasTaskDate,hasInsert);
				showTaskList(choosen);
				var taskItem=document.getElementsByClassName("task-title");
				for(var t=0;t<taskItem.length;t++){
					if(taskItem[t].innerHTML==taskTitle){
						taskItem[t].className="task-title choosen-task";
					}
				}
				writeTitle.style.display="none";
				writeDate.style.display="none";
				writeContent.style.display="none";
				writeTitle.value="";
				writeDate.value="";
				writeContent.children[0].value="";
				choosenTitle.innerHTML=taskTitle;
				choosenDate.innerHTML=taskDate;
				showTask.innerHTML=taskContent;
			}
			 else if(data[i].subclass){
				for(var j=0;j<data[i].subclass.length;j++){
					if(choosenClass[0].innerHTML==data[i].subclass[j].subclassname){
						var choosen=document.getElementsByClassName("choosen-class")[0];
						inseretData(i,taskTitle,taskDate,taskContent, hasTaskDate,hasInsert);
						writeTitle.style.display="none";
						writeDate.style.display="none";
						writeContent.style.display="none";
						writeTitle.value="";
						writeDate.value="";
						writeContent.children[0].value="";
						choosenTitle.innerHTML=taskTitle;
						choosenDate.innerHTML=taskDate;
						showTask.innerHTML=taskContent;

						if(!data[i].subclass[j].task.length){
							data[i].subclass[j].task.push({date:taskDate,title:[taskTitle],content:[taskContent],state:[0]});
						}else{
							for(var s=0;s<data[i].subclass[j].task.length;s++){
								if(taskDate==data[i].subclass[j].task[s].date){
									data[i].subclass[j].task[s].title.push(taskTitle);
									data[i].subclass[j].task[s].content.push(taskContent);
									data[i].subclass[j].task[s].state.push(0);
									hasTaskDate=true;
								}
							}
							if(hasTaskDate==false){
								var newTime=taskDate.split("-"),
								 newYear=parseInt(newTime[0]),
				    				 newMonth=parseInt(newTime[1]),
				     				newDay=parseInt(newTime[2]);
								for(var k=data[i].subclass[j].task.length-1;k>=0;k--){
									var date=data[i].subclass[j].task[k].date.split("-"),
						      			year=parseInt(date[0]),
						      			month=parseInt(date[1]),
						      			day=parseInt(date[2]);
						      			if(newYear<year){
						      				data[i].subclass[j].task.splice(k+1,0,{date:taskDate,title:[taskTitle],content:[taskContent],state:[0]});
						      				hasInsert=true;
						      			}else if(newYear==year&&newMonth<month){
						      				data[i].subclass[j].task.splice(k+1,0,{date:taskDate,title:[taskTitle],content:[taskContent],state:[0]});
						      				hasInsert=true;
						      			}else if(newYear==year&&newMonth==month&&newDay<day){
						      				data[i].subclass[j].task.splice(k+1,0,{date:taskDate,title:[taskTitle],content:[taskContent],state:[0]});
						      			hasInsert=true;
						      			}
								}
								if(hasInsert==false){
						      			data[i].subclass[j].task.unshift({date:taskDate,title:[taskTitle],content:[taskContent],state:[0]});
						      			}
							}
						}
						showTaskList(choosen);
						var taskItem=document.getElementsByClassName("task-title");
						for(var t=0;t<taskItem.length;t++){
							if(taskItem[t].innerHTML==taskTitle){
								taskItem[t].className="task-title choosen-task";
							}
						}
					}
				}
			}
		}
	}
});



//向data内插入数据
function inseretData(i,taskTitle,taskDate,taskContent, hasTaskDate,hasInsert){
	if(!data[i].task.length){
		data[i].task.push({date:taskDate,title:[taskTitle],content:[taskContent],state:[0]});
	}else{
		for(var j=0;j<data[i].task.length;j++){
			if(taskDate==data[i].task[j].date){
				data[i].task[j].title.push(taskTitle);
				data[i].task[j].content.push(taskContent);
				data[i].task[j].state.push(0);
				hasTaskDate=true;
				}
			}
			if(hasTaskDate==false){
				var newTime=taskDate.split("-"),
				     newYear=parseInt(newTime[0]),
				     newMonth=parseInt(newTime[1]),
				     newDay=parseInt(newTime[2]);
				for(var k=data[i].task.length-1;k>=0;k--){
					var date=data[i].task[k].date.split("-"),
						year=parseInt(date[0]),
						month=parseInt(date[1]),
						day=parseInt(date[2]);
						if(newYear<year){
						      	data[i].task.splice(k+1,0,{date:taskDate,title:[taskTitle],content:[taskContent],state:[0]});
						      	hasInsert=true;
						}else if(newYear==year&&newMonth<month){
						      	data[i].task.splice(k+1,0,{date:taskDate,title:[taskTitle],content:[taskContent],state:[0]});
						      	hasInsert=true;
						}else if(newYear==year&&newMonth==month&&newDay<day){
						      	data[i].task.splice(k+1,0,{date:taskDate,title:[taskTitle],content:[taskContent],state:[0]});
						      	hasInsert=true;
						}
					}
				if(hasInsert==false){
					data[i].task.unshift({date:taskDate,title:[taskTitle],content:[taskContent],state:[0]});
				}
			}
		}
}

//点击任务标题
addEvent(taskList,"click",function(event){
	event=event||window.event;
	target=event.target;
	var newTaskList=document.getElementsByClassName("task-title");
	if(target.className=="task-title"){
		for(var i=0;i<newTaskList.length;i++){
		var className=newTaskList[i].className.split(" ");
		if(className[1]=="choosen-task"){
			newTaskList[i].className="task-title";
		}
	}
		target.className+=" choosen-task";
		
		//右侧栏显示选中任务
		for(var i=0;i<data.length;i++){
			var choosenClass=document.getElementsByClassName("choosen-class")[0];
			if(data[i].classname==choosenClass.innerHTML||data[i].classname==choosenClass.parentNode.previousSibling.innerHTML){
				for(var j=0;j<data[i].task.length;j++){
					if(target.parentNode.previousSibling.innerHTML==data[i].task[j].date){
						for(var k=0;k<data[i].task[j].title.length;k++){
							if(target.innerHTML==data[i].task[j].title[k]){
								choosenDate.innerHTML=data[i].task[j].date;
								choosenTitle.innerHTML=data[i].task[j].title[k];
								showTask.innerHTML=data[i].task[j].content[k];
							}
						}

					}
				}
			}
		}

	}

});
//点击任务类型标签
addEvent(taskState,"click",function(event){
	event=event||window.event;
	target=event.target;
	if(target.nodeName=="LI"){
		var state=taskState.firstElementChild.children;
		for(var i=0;i<state.length;i++){
			state[i].className="";
		}
		target.className="task-type";
		showTaskList(target);
	}
});