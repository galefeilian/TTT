var playButton = document.getElementById("playButton")
playButton.addEventListener("click", function (){
	if(document.getElementById("tttTable")){
		document.getElementById("tttTable").parentNode.removeChild(document.getElementById("tttTable"));
	}
	document.getElementById("playButton").innerHTML = "new game"
	createTable(3,3);
	for(var row = 0; row < 3; row++){
		for(var col = 0; col < 3; col++){
			addEventListenerForCells(document.getElementById("tttTable").rows[row].cells[col])
		}
	}
	gameModel = new Model;
	gameModel.createBoard(3,3)
	gameModel.addPlayer();
	gameModel.addPlayer();	
})
function addEventListenerForCells(tableCell){
	tableCell.addEventListener("click",function(){
		gameModel.makeMove(tableCell.parentNode.rowIndex, tableCell.cellIndex)
		tableCell.innerHTML = gameModel.gameBoard[tableCell.parentNode.rowIndex][tableCell.cellIndex]
		if(gameModel.playerWin()){
			alert("You Win")
		}else if(gameModel.isDraw()){
			alert("Draw")
		}else{
			var play = AIForTicTacToe(gameModel);
			gameModel.makeMove(play[0],play[1])
			tableCell.parentNode.parentNode.rows[play[0]].cells[play[1]].innerHTML = gameModel.gameBoard[play[0]][play[1]];
			if(gameModel.playerWin()){
				alert("Loser")
			}else if (gameModel.isDraw()){
				alert("Draw")
			}
		}
	})
}