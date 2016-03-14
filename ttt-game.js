function createTable(rows,columns){
	var x = document.createElement("TABLE");
	x.setAttribute("id","tttTable");
	x.setAttribute("class","game-grid-view");	
	for(var i=0;i < rows;i++){
		var row = x.insertRow();
		row.setAttribute("class","row");
		for(var j=0;j<columns;j++){
			var cell=row.insertCell();
			var textNode = document.createTextNode("-");
			cell.appendChild(textNode);
			cell.setAttribute("class","game-grid-cell")
			cell.style.backgroundColor="#ddd";
			cell.style.width="50px";
			cell.style.height="50px";
			cell.style.border="1px solid black";
			cell.style.textAlign = "center";
			cell.style.fontFamily="verdana,sans-serif";
		}
	}
	document.body.appendChild(x);	
}
createTable(3,3);
function setCellText(row,col,str){
	var x = document.getElementById("tttTable").getElementsByClassName("row")[row].getElementsByClassName("game-gird-cell")[col];
	x.innerHTML=str;
}