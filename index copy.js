console.log("starting");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// ctx.fillStyle = "#00FF00";


var suzie = new Librarian();
var numbOfNode = 500;
//never set incriment to zero
var incriment = 1;
var minConnections = 2;
var chunkArray = [];

var arrayOfNodes = [];
for (var i = 0; i < numbOfNode; i++){
  //i am just specifing the incriment and minConnections
  arrayOfNodes[i] = new Node(undefined,undefined,undefined,incriment, minConnections);
}

var arrayOfConnections = [];



// arrayOfNodes.forEach(function(node){
//   suzie.connectNodeVanilla(node, arrayOfNodes);
// });
// console.log("finished connecting");

var chunkArray = suzie.createChunck(arrayOfNodes, 3, 3);

for (var i = 0; i < chunkArray.length; i++) {
  for (var j = 0; j < chunkArray[i].length; j++) {
    suzie.connectNodeAdvanced(chunkArray[i][j]);
  }
}



arrayOfNodes.forEach(function(node){
  suzie.makeConnections(node, arrayOfConnections);
});

arrayOfConnections.forEach(function(connection){
  connection.display();
});

arrayOfNodes.forEach(function(node){
  node.display();
});


console.log("done");
