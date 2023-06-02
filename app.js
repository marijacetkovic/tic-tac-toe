const iconO = '<img class="iconO" src="imgs/oIcon.png">';
const iconX = '<img  class="iconX" src="imgs/xIcon.png">';
const container = document.getElementsByClassName("container")[0];
const messageDiv = document.getElementById("message");
let board = null;
let turn = 0;
let xTurn = false;
let oTurn = false;
let selected = false;
let wonFlag = 0;
const buttons = document.getElementsByClassName("button");


function startsGame(symbol, button){
	button.style.color="white";
	buttons[0].setAttribute("onclick","");
	buttons[1].setAttribute("onclick","");
	if (symbol=="X") {
		xTurn=true;
	}
	else{
		oTurn=true;
	}
	selected = true;
}

generateBoard();

function generateBoard(){
	container.innerHTML="";
	board = Array(3);
	for (var i = 0; i < board.length; i++) {
		board[i]=Array(3);
		for (var j = 0; j < board.length; j++) {
			board[i][j]="";
			let divElement = document.createElement("div");
			divElement.classList.add("tile");
			divElement.setAttribute("id", `tile_${i}_${j}`);
			//pass to setTile the div and the row and col
			divElement.setAttribute("onclick",`setTile(this, [${i},${j}]);`)
			container.appendChild(divElement);
		}
	}
}

function checkBoard(icon){

	firstRow= 0;
	secondRow = 0;
	thirdRow = 0;
	firstCol = 0;
	secondCol = 0;
	thirdCol = 0;
	firstDiag = 0 ;
	secondDiag = 0 ;

	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board.length; j++) {
			if (i==0&&board[i][j]==icon) {
				firstRow++;
			}
			if (i==1&&board[i][j]==icon) {
				secondRow++;
			}
			if (i==2&&board[i][j]==icon) {
				thirdRow++;
			}

			if (j==0&&board[i][j]==icon) {
				firstCol++;
			}
			if (j==1&&board[i][j]==icon) {
				secondCol++;
			}
			if (j==2&&board[i][j]==icon) {
				thirdCol++;
			}

			if (i==j&&board[i][j]==icon) {
				firstDiag++;

			}
			if ((j==board.length-i-1)&&board[i][j]==icon) {
				secondDiag++;
			}
						

		}
	}

	if (firstCol==3||secondCol==3||thirdCol==3||firstRow==3||secondRow==3||thirdRow==3||firstDiag==3||secondDiag==3) {
		//call win
	wonFlag = 1;
	displayWin(icon);
	setTimeout(function() {
	window.addEventListener("click", restart);
	}, 0);

	}

}

function displayWin(icon){
	messageDiv.innerHTML="you won player "+icon+"!";
	messageDiv.style.display="block";

}

function disableTiles(){
	tiles = document.getElementsByClassName("tile");
	for (var i = 0; i < tiles.length; i++) {
		tiles[i].setAttribute("onclick","");//disable tile
	}
}


function setTile(tile,array){
	messageDiv.innerHTML="";
	if (selected) {
	turn++;

	//console.log(tile.id);
	if (xTurn) {
		xTurn = false;
		oTurn = true;
		tile.innerHTML = iconX; //set X
		tile.setAttribute("onclick","");//disable tile
		board[array[0]][array[1]]="X";
		checkBoard("X");
	}
	else{
		oTurn = false;
		xTurn = true;
		tile.innerHTML = iconO; //set O
		tile.setAttribute("onclick","");//disable tile
		board[array[0]][array[1]]="O";
		checkBoard("O");

	}
	if (turn==9&&!wonFlag) {
	messageDiv.innerHTML="draw! play again :)";
	messageDiv.style.display="block";
	setTimeout(function() {
	window.addEventListener("click", restart);
	}, 0);
	}
}
else{
	messageDiv.innerHTML="choose the player!";
	messageDiv.style.display="block";

}

}

function restart(){
	messageDiv.innerHTML="";
	turn = 0;
	wonFlag = 0;
	xTurn = false;
	oTurn = false;
	selected = false;
	buttons[0].setAttribute("onclick","startsGame('X',this);");
	buttons[1].setAttribute("onclick","startsGame('O',this);");
	buttons[0].style.color = "pink";
	buttons[1].style.color = "pink";
	generateBoard();
	window.removeEventListener("click", restart);
}
