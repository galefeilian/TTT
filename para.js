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
		return childrenNode.map(function(child){return {key:child,value:{parentModel:currentModelStr,isAlTurn:!currentModelInput.value.isAITurn}}})
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
		console.log(i)
		var key = mapperOut[i].key;
		console.log(key)
		var v = [];
		var sameChildList = {key: key, value:[]};
		while(i < mapperOut.length && key === mapperOut[i].key) {
			console.log(i)
			console.log(mapperOut[i])
			sameChildList.value.push(mapperOut[i].value.parentModel);
			i++;
		}
		reducedList.push({key:key,value:{parentModel:sameChildList.value.reduce(function (a,b){
			return a.push(b.value.parentModel)}),isAITurn: !mapperOut[i-1].value.isAITurn}
		})
	}
	return reducedList
}
