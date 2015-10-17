//游戏主逻辑文件
function newGame(){
	init();
	generateOneNumber();
	generateOneNumber();

}
var board=new Array();
var score=0;
function init(){
	for(var i=0;i<4;i++){
		board[i]=new Array();
		for (var j=0;j<4;j++){
			board[i][j]=0;
			var position="cell-"+i+"-"+j;
			var cell=document.getElementById(position);
			var topValue=getPosTop(i, j)+"px";
			var leftValue=getPosLeft(i, j)+"px";
			cell.style.top=topValue;
			cell.style.left=leftValue;
		}
	}
	updateBoardView();

}
//重新开始
function restartgame() {
	var gameover=document.getElementById("gameover");
	document.getElementById("game-body").removeChild(gameover);
   	 updateScore(0);
   	 newGame();
}
function restartgame1() {
	var gameover=document.getElementById("gameover");
	if(gameover!=null){
	document.getElementById("game-body").removeChild(gameover);
	}
   	 updateScore(0);
   	 newGame();
}
function updateBoardView(){
	//先清空数字格内容
	paras=document.getElementsByClassName('number-cell');
	var len=paras.length;
	for(var i=0;i<len;i++){
			paras[0].parentNode.removeChild(paras[0]);
	}
	var divNumber="game-body";
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var div=document.createElement("div");
			div.setAttribute("class","number-cell");
			var idNumber='number-cell-'+i+'-'+j;
			div.setAttribute("id",idNumber);
			document.getElementById(divNumber).appendChild(div);
			var numberCell=document.getElementById(idNumber);
			if(board[i][j]==0){
				numberCell.style.width="0px";
				numberCell.style.height="0px";
				var topValue=getPosTop(i, j)+'px';
				var leftValue=getPosLeft(i,j)+'px';
				numberCell.style.top=topValue;
				numberCell.style.left=leftValue;
			}
			else{
				numberCell.style.height="100px";
				numberCell.style.width="100px";
				var topValue=getPosTop(i,j)+"px";
				var leftValue=getPosLeft(i,j)+"px";
				numberCell.style.top=topValue;
				numberCell.style.left=leftValue;
				numberCell.style.backgroundColor=getNumberBackgroundColor(board[i][j]);
				numberCell.style.color=getNumberColor(board[i][j]);
				numberCell.innerHTML=board[i][j];
				}
			}
		}
	for(var i=0;i<paras.length;i++){
			paras[i].style.lineHeight="100px";
			paras[i].style.fontSize="60px";
	}
}


function generateOneNumber(){
	//1在随机位置上随机生成一个数字
	var randX=parseInt(Math.floor(Math.random() * 4));
	var randY=parseInt(Math.floor(Math.random() * 4));
	while(true){
		if(board[randX][randY]==0){
			break;
		}
		var randX=parseInt(Math.floor(Math.random() * 4));
		var randY=parseInt(Math.floor(Math.random() * 4));
	}
	//2随机生成一个数字，新生成的数字智能为2或4
	var randNumber=Math.random() < 0.5 ? 2 : 4;
	//3在随机位置上显示数字
	board[randX][randY]=randNumber;
	//实现随机数字显示的动画
    ShowNumberWithAnimation(randX, randY, randNumber);
}
window.onload=newGame();
