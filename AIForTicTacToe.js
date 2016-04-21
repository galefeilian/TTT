function AIForTicTacToe(currentModel,d){
    if(!d){
        d = {};
    }
    var maxPointSoFar = -2;
    var currentPlayer = currentModel.players[currentModel.movesPlayed % currentModel.numOfPlayers];
    var nextPlayer = currentModel.players[(currentModel.movesPlayed+1) % currentModel.numOfPlayers];
    if(currentModel.isDraw()){
        if(! (
            currentPlayer in d)){
            d[currentPlayer] = {};
        }
        d[currentPlayer][currentModel.gameBoard] = {};
		d[currentPlayer][currentModel.gameBoard].play = [-1,-1];
		d[currentPlayer][currentModel.gameBoard].maxPointCanGet = 0;
    }else{
        var row = 0;
        var win = false;
        while(row < currentModel.gameBoardSize[0] && win === false){
            var col = 0;
            while(col < currentModel.gameBoardSize[1] && win === false){
                var copyOfCurrentModel = copyModel(currentModel);
                if(copyOfCurrentModel.gameBoard[row][col] === "-"){
                    copyOfCurrentModel.makeMove(row,col);
                    if(copyOfCurrentModel.playerWin()){
                        var maxPointCanGet = 1;
                        win = true;
                    }else{
                        if(d[nextPlayer] === undefined){
                            AIForTicTacToe(copyOfCurrentModel,d);
                        }
                        if(d[nextPlayer][copyOfCurrentModel.gameBoard] === undefined){
                            AIForTicTacToe(copyOfCurrentModel,d);
                        }
                        var maxPointCanGet = d[nextPlayer][copyOfCurrentModel.gameBoard].maxPointCanGet * -1;
                    }
                    if(maxPointCanGet >= maxPointSoFar){
                        maxPointSoFar = maxPointCanGet;
                        if(! (currentPlayer in d)){
                            d[currentPlayer] = {};
                        }
                        d[currentPlayer][currentModel.gameBoard]={};
						d[currentPlayer][currentModel.gameBoard].play = [row,col];
						d[currentPlayer][currentModel.gameBoard].maxPointCanGet = maxPointCanGet;
                    }
                }
                col = col + 1;
            }
            row = row + 1;
        }
    }
    return d[currentModel.players[currentModel.movesPlayed % currentModel.numOfPlayers]][currentModel.gameBoard].play;
}
function copyModel(currentModel){
	copyOfCurrentModel = new Model();
	copyOfCurrentModel.gameBoardSize = currentModel.gameBoardSize;
	copyOfCurrentModel.createBoard(currentModel.gameBoardSize[0],currentModel.gameBoardSize[1]);
	for(var rowOfCopy = 0; rowOfCopy < currentModel.gameBoardSize[0]; rowOfCopy++){
		for(var colOfCopy = 0; colOfCopy < currentModel.gameBoardSize[1]; colOfCopy++){
			copyOfCurrentModel.gameBoard[rowOfCopy][colOfCopy] = currentModel.gameBoard[rowOfCopy][colOfCopy];
		}
	}
	copyOfCurrentModel.players = currentModel.players;
	copyOfCurrentModel.movesPlayed = currentModel.movesPlayed;
	copyOfCurrentModel.numOfPlayers = currentModel.numOfPlayers;
	copyOfCurrentModel.winner = currentModel.winner;
	copyOfCurrentModel.lastMove.playerNum = currentModel.lastMove.playerNum;
	copyOfCurrentModel.lastMove.symbol = currentModel.lastMove.symbol;
	copyOfCurrentModel.lastMove.row = currentModel.lastMove.row;
	copyOfCurrentModel.lastMove.col = currentModel.lastMove.col;
	return copyOfCurrentModel;
}