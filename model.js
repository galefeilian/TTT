function Model(){
    this.gameName ="Tic Tac Toe";
    this.winingCondition = 3;
    this.gameBoard = [];
    this.gameBoardSize = [0,0];
    this.players = [];
    this.movesPlayed = 0;
    this.numOfPlayers = 0;
    this.winner = null;
    this.lastMove = {};

}
var modelPrototype={//prototype
    constructor: Model,
    createBoard:function(rows,cols){
        for(var row = 0; row < rows; row++){
            this.gameBoard.push([]);
        for(var col =0 ; col< cols;col++){
            this.gameBoard[row].push("-");
        }
        this.gameBoardSize = [rows,cols];
        }
    },
    addPlayer:function(){
        if(this.players.length === 0){
            this.players[0] = {playerNum:1,symbol:"o"};
        }else{
            this.players[1] = {playerNum:2,symbol:"x"};
        }
        this.numOfPlayers++;
    },
    isValidMove:function(x,y){
        if(this.gameBoard[x][y] == "-"){
            return true;
        }else{
            return false;
        }
    },
    playerWin:function(){
        var playerWinned = false;
        var maxNumOfConsecutive = 1;
        var verticalNumOfConsecutive = 1;
        var horizontalNumOfConsecutive = 1;
        var slantalLeftNumOfConsecutive = 1;
        var slantalRightNumOfConsecutive = 1;
        var horizontalLeft = this.lastMove.col - 1;
        var horizontalRight = this.lastMove.col + 1;
        var verticalUp = this.lastMove.row - 1;
        var verticalDown = this.lastMove.row + 1;
        var slantalLeftUp = [];
        slantalLeftUp[0] = this.lastMove.row - 1;
        slantalLeftUp[1] = this.lastMove.col + 1;
        var slantalLeftDown = [];
        slantalLeftDown[0] = this.lastMove.row + 1;
        slantalLeftDown[1] = this.lastMove.col - 1;
        var slantalRightUp = [];
        slantalRightUp[0] = this.lastMove.row - 1;
        slantalRightUp[1] = this.lastMove.col -1;
        var slantalRightDown = [];
        slantalRightDown[0] = this.lastMove.row + 1;
        slantalRightDown[1] = this.lastMove.col + 1;
        while(horizontalLeft >= 0){
            if(this.gameBoard[this.lastMove.row][horizontalLeft] === this.lastMove.symbol){
                horizontalNumOfConsecutive++;
                horizontalLeft --;
            }else{
                horizontalLeft = -1;
            }
        }
        while(horizontalRight < this.gameBoardSize[1] ){
            if(this.gameBoard[this.lastMove.row][horizontalRight] === this.lastMove.symbol){
                horizontalNumOfConsecutive++;
                horizontalRight ++;
            }else{
                horizontalRight = this.gameBoardSize[1];
            }
        }
        while(verticalUp >= 0){
            if(this.gameBoard[verticalUp][this.lastMove.col] === this.lastMove.symbol){
                verticalNumOfConsecutive++;
                verticalUp --;
            }else{
                verticalUp = -1;
            }
        }
        while(verticalDown < this.gameBoardSize[0] ){
            if(this.gameBoard[verticalDown][this.lastMove.col] === this.lastMove.symbol){
                verticalNumOfConsecutive++;
                verticalDown ++;
            }else{
                verticalDown = this.gameBoardSize[0];
            }
        }
        while(slantalLeftUp[0] >= 0 && slantalLeftUp[1] < this.gameBoardSize[1]){
            if(this.gameBoard[slantalLeftUp[0]][slantalLeftUp[1]] === this.lastMove.symbol){
                slantalLeftNumOfConsecutive++;
                slantalLeftUp[0]--;
                slantalLeftUp[1]++;
            }else{
                slantalLeftUp[0] = -1;
                }
        }
        while(slantalLeftDown[0] <this.gameBoardSize[0]  && slantalLeftDown[1] >= 0){
            if(this.gameBoard[slantalLeftDown[0]][slantalLeftDown[1]] === this.lastMove.symbol){
                slantalLeftNumOfConsecutive++;
                slantalLeftDown[0]++;
                slantalLeftDown[1]--;
            }else{
                slantalLeftDown[1] = -1;
                }
        }
        while(slantalRightUp[0] >= 0 && slantalRightUp[1] >= 0){
            if(this.gameBoard[slantalRightUp[0]][slantalRightUp[1]] === this.lastMove.symbol){
                slantalRightNumOfConsecutive++;
                slantalRightUp[0]--;
                slantalRightUp[1]--;
            }else{
                slantalRightUp[0] = -1;
            }
        }
        while(slantalRightDown[0] < this.gameBoardSize[0] && slantalRightDown[1] < this.gameBoardSize[1]){
            if(this.gameBoard[slantalRightDown[0]][slantalRightDown[1]] === this.lastMove.symbol){
                slantalRightNumOfConsecutive++;
                slantalRightDown[0]++;
                slantalRightDown[1]++;
            }else{
                slantalRightDown[0] = this.gameBoardSize[0];
            }
        }
        maxNumOfConsecutive = Math.max(verticalNumOfConsecutive,horizontalNumOfConsecutive,slantalLeftNumOfConsecutive,slantalRightNumOfConsecutive);
        if(maxNumOfConsecutive === this.winingCondition){
            playerWinned = true;
            this.winner = this.lastMove.playerNum;
        }
        return playerWinned;
    },
    isDraw:function(){
        if((this.movesPlayed === 9)&& this.winner === null){
            return true;
        }else{
            return false;
        }
    },
    makeMove: function(row,col){
        if (this.isValidMove(row,col)){
            if(this.movesPlayed % this.numOfPlayers === 0){
                this.gameBoard[row][col] = this.players[0].symbol;
                this.lastMove.playerNum = this.players[0].playerNum;
                this.lastMove.symbol = this.players[0].symbol;
            }else{
                this.gameBoard[row][col] = this.players[1].symbol;
                this.lastMove.playerNum = this.players[1].playerNum;
                this.lastMove.symbol = this.players[1].symbol;
            }
        this.lastMove.row = row;
        this.lastMove.col = col;
        this.movesPlayed++;
        }
    },
    getPlayer:function(row,col){
        if (this.gameBoard[row][col] === "o"){
            return "player1";
        }else if (this.gameBoard[row][col] === "x"){
            return "player2";
        }else{
            return "null";
        }
    },
    newGame:function(){
    this.gameName ="Tic Tac Toe";
    this.gameBoard = [];
    this.gameBoardSize = [0,0];
    this.players = {};
    this.movesPlayed = 0;
    this.numOfPlayers = 0;
    this.winner = null;
    this.lastMove = {};
    }
};
Model.prototype = modelPrototype;