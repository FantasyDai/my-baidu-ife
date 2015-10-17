//游戏交互逻辑文件

document.onkeydown=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	switch(e.keyCode){
	case 37: //left
		if(moveLeft()){
			setTimeout("generateOneNumber()",200);
			setTimeout("isGameOver()",300);
		}
		break;
	case 38: //up
		if(moveUp()){
			setTimeout("generateOneNumber()",200);
			setTimeout("isGameOver()",300);
			//isGameOver();
		}
		break;
	case 39: //right
		if(moveRight()){
			setTimeout("generateOneNumber()",200);
			setTimeout("isGameOver()",300);
			//isGameOver();
		}
		break;
	case 40:  //down
		if(moveDown()){
			setTimeout("generateOneNumber()",200);
			setTimeout("isGameOver()",300);
			//isGameOver();
		}
		break;
	default:
		break;
}
}
//向左移动
function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
	//move
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					//判断当前不为零数字格的目标格为零且中间值为零
					if(board[i][k]==0&&noNumBetweenLeft(i,k,j,board)){
						showMove(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noNumBetweenLeft(i,k,j,board)){
						showMove(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);
					}
				}
			}
		}
	}
	updateBoardView();
	return true;
}
//向左移动
function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	//move
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					//判断当前不为零数字格的目标格为零且中间值为零
					if(board[k][j]==0&&noNumBetweenUp(i,k,j,board)){
						showMove(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noNumBetweenUp(i,k,j,board)){
						showMove(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						updateScore(score);
					}
				}
			}
		}
	}
	updateBoardView();
	return true;
}

//向右移动
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	//move
	for(var i=3;i>=0;i--){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					//判断当前不为零数字格的目标格为零且中间值为零
					if(board[i][k]==0&&noNumBetweenRight(i,k,j,board)){
						showMove(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noNumBetweenLeft(i,k,j,board)){
						showMove(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);
					}
				}
			}
		}
	}
	updateBoardView();
	return true;
}
//向下移动
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	//move
	for(var j=3;j>=0;j--){
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					//判断当前不为零数字格的目标格为零且中间值为零
					if(board[k][j]==0&&noNumBetweenDown(i,k,j,board)){
						showMove(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noNumBetweenDown(i,k,j,board)){
						showMove(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						updateScore(score);
					}
				}
			}
		}
	}
	updateBoardView();
	return true;
}


//判断左边格子是否全部为空
function noNumBetweenLeft(row,colK,colJ,board){
	for(var i=colK+1;i<colJ;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
return true;
}
//判断上边格子是否全部为空
function noNumBetweenUp(rowI,rowK,col,board){
	for(var i=rowK+1;i<rowI;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
return true;
}

//判断右边格子是否全部为空
function noNumBetweenRight(row,colK,colJ,board){
	for(var i=colK-1;i>colJ;i--){
		if(board[row][i]!=0){
			return false;
		}
	}
return true;
}

//判断下边格子是否全部为空
function noNumBetweenDown(rowI,rowK,col,board){
	for(var i=rowK-1;i>rowI;i--){
		if(board[i][col]!=0){
			return false;
		}
	}
return true;
}

//判断游戏是否结束
function isGameOver(){
	if(noSpace(board)&&noMove(board)){
		gameover();
	}
}

//游戏结束
function gameover() {
	var div=document.createElement("div");
	div.setAttribute("id","gameover");
	div.setAttribute("class","gameover");
	var p=document.createElement("p");
	var span=document.createElement("span");
	var a=document.createElement("a");
	a.setAttribute("id","restartgamebutton");
	a.setAttribute("onclick","restartgame()");
	a.innerHTML="重新开始";
	p.innerHTML="本次得分";
	span.innerHTML=score; 
    	var parent=document.getElementById("game-body");
    	div.appendChild(p);
    	div.appendChild(span);
    	div.appendChild(a);
    	parent.appendChild(div);
    	var gameover=document.getElementById("gameover");
    	gameover.style.width="500px";
    	gameover.style.height="500px";
    	gameover.style.backgroundColor="rgba(0, 0, 0, 0.5)";
}


