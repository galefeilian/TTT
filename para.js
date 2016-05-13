function tttMapper(inputs){
	return inputs.map(function(currentModelInput){
		var currentModelStr = currentModelInput.key;
		var currentModel = JSON.parse(currentModelStr)

		var childrenNode = [];
		for (var row = 0; row<3; row++){
			for(var col = 0; col<3; col++){
				var copyOfModel = copyModel(currentModel);
				if(copyOfModel.isValidMove(row,col)){
					copyOfModel.makeMove(row,col);
					var copyOfModelStr = JSON.stringify(copyOfModel)
					childrenNode.push(copyOfModelStr)
				}
			}
		}
		return childrenNode.map(function(child){return {key:child,value:{parentModel:currentModelStr,isAITurn:!currentModelInput.value.isAITurn}}})
	});
}
function flatten(itemList) {
	return itemList.reduce(function(arr, list) {
		return arr.concat(list);	
	});
}
function sort(kVPairList) {
	kVPairList.sort(function(kVPair1, kVPair2) {
		var val = 0;
		if(kVPair1.key < kVPair2.key) {
			val = -1;
		}
		else if(kVPair1.key > kVPair2.key) {
			val = 1;
		}
		
		return val;
	});
}
function tttReducer(mapperOut){
	var i = 0;
	var reducedList = [];
	while(i < mapperOut.length) {
		var key = mapperOut[i].key;
		var sameChildList = {key: key, value:{parentModel:[]}};
		while(i < mapperOut.length && key === mapperOut[i].key) {
			sameChildList.value.parentModel.push(mapperOut[i].value.parentModel);
			i++;
		}
		reducedList.push({key:key,value:{parentModel:sameChildList.value.parentModel.reduce(function (a,b){
			return a.concat(b)},[]),isAITurn: !mapperOut[i-1].value.isAITurn
		}
	})
	}
	return reducedList
}
function tttMapper2(inputs){
	var outputs={};
	var currentModel = JSON.parse(inputs.key);
	currentModel = copyModel(currentModel);
	var valueOfCurrentModel = inputs.value
	var point = 0;
	if (currentModel.isDraw){
		point = 2;
	}else if(currentModel.playerWin && valueOfCurrentModel.isAITurn){
		point = 1;
	}else if(currentModel.playerWin && !(valueOfCurrentModel.isAITurn)){
		point = 3;
	}
	outputs.key = JSON.stringify(currentModel);
	outputs.value = {};
	outputs.value.parentModel = valueOfCurrentModel.parentModel;
	outputs.isAITurn = valueOfCurrentModel.isAITurn;
	outputs.value.point = point;
	return outputs
}
function reducer2(inputs){
	return inputs;
}
function mapper3(inputs){
	if (inputs.value.parentModel !== undefined){
		return inputs.map(function (input){
			return {key:{childModel:input.key,parentModel:input.value.parentModel},value:{isAITurn:input.value.isAITurn,points:input.value.points}};
		});
	}else{
		return inputs.map(function(input){
			var currentModel = JSON.parse(input.key);
			var output = [];
			for (var row = 0; row<3; row++){
				for(var col = 0; col<3; col++){
					if (currentModel.gameBoard[row][col] === currentModel.lastMove.symbol){
						var copyOfCurrentModel = copyModel(currentModel);
						copyOfCurrentModel.gameBoard[row][col] = '-';
						copyOfCurrentModel.movesPlayed = copyOfCurrentModel.movesPlayed - 1;
						if (copyOfCurrentModel.lastMove.playerNum ===1){
							copyOfCurrentModel.lastMove = copyOfCurrentModel.players[1];
						}else{
							copyOfCurrentModel.lastMove = copyOfCurrentModel.players[0];
						}
						copyOfCurrentModel.lastMove.row = null;
						copyOfCurrentModel.lastMove.col = null;
						var outputObj ={key:{childModel:copyOfCurrentModel,possibleParentModel:copyOfCurrentModel},value:{isAITurn:input.value.isAITurn,points:input.value.points,isPoss:true}};
						output.push(outputObj);
					}
				}
			}
			return output;
		});
	}
}