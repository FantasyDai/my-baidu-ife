//游戏动画逻辑文件
function ShowNumberWithAnimation(i, j, randNumber){
    //获取当前的数字格
    var idNumber='number-cell-'+i+'-'+j;
    var numberCell=document.getElementById(idNumber);
    //设置当前的数字格的背景色和前景色及数字值
    numberCell.style.backgroundColor=getNumberBackgroundColor(randNumber);
	numberCell.style.color=getNumberColor(randNumber);
    numberCell.innerHTML=randNumber;
    //设置当前的数字格的显示动画
    numberCell.style.width="100px";
    numberCell.style.height="100px";
    var topValue=getPosTop(i, j)+"px";
    var leftValue=getPosLeft(i, j)+"px";
    numberCell.style.top=topValue;
    numberCell.style.left=leftValue;
}

function showMove(fromx, fromy, tox, toy){
    //获取到当前数字格的元素
    var idValue="number-cell"+"-"+fromx+"-"+fromy;
    var numberCell=document.getElementById(idValue);
    var topValue=getPosTop(tox,toy)+"px";
    var leftValue=getPosLeft(tox,toy)+"px";
    numberCell.style.top=topValue;
    numberCell.style.left=leftValue;
}

//更新分数
function updateScore(score){
    document.getElementById("score").innerHTML=score;
}