

//Librarian holds functions because this is how i was able to get the files to talk lol. ill fix it later, but it works fine
class Librarian {
  constructor(){}

  /* pass in the node making the connections, and the array of
  nodes it is evaluating */
  /* refactor to just take in an index, and an array*/
  connectNodeVanilla(nodeArray){
    var cycles = 0;

    nodeArray.forEach(function(node){

      while (node.neighbors.length <= node.minConnections){
        //empties the neighbors array so that the same node isnt added multiple times.
        node.neighbors.splice(0,node.neighbors.length);
        cycles++;

        for (var i = 0; i <= nodeArray.length - 1; i++) {
          var distance = Math.sqrt(
            Math.pow((nodeArray[i].x - node.x), 2) +
            Math.pow((nodeArray[i].y - node.y), 2)
          );

          if (distance <= node.incriment * cycles) {
           node.neighbors.push(nodeArray[i]);
          }
        }
      }//end of while function
      console.log("nodes connected");
    });
  }//end of connectNode()

  bob() {
    console.log("bob worked");
  }


  checkIfInSameNode(
    node,
    i,
    j,
    cycles,
    _modUp = 0,
    _modDown = 0,
    _modLeft = 0,
    _modRight = 0
  ){
    var wInterval = canvas.width / index.chunkArray.length ;
    var hInterval = canvas.height / index.chunkArray[i].length;
    var modeUp = _modUp;
    var modeDown = _modDown;
    var modeLeft = _modLeft;
    var modeRight = _modRight;


    if( ((node.x +(cycles * incriment)) >= (wInterval * i) ) && (chunkArray[i+1] != undefined) ){
      modRight++;
    }
    if( ((node.x -(cycles * incriment)) <= (wInterval * (i-1)) ) && (chunkArray[i-1] != undefined)  ){
      //add chunk[i+1][k]
    }
    if((node.y +(cycles * incriment) >= (wInterval * i)) && (chunkArray[i][j+1] != undefined)){
      //add chunk[i+1][k]
    }
    if((node.y -(cycles * incriment) <= (wInterval * (i-1)) ) && (chunkArray[i][j-1] != undefined)){
      //add chunk[i+1][k]
    }
  }


  connectNodeAdvanced(chunk){
    this.bob();
    var cycles = 0;



    for (var i = 0; i < chunk.length; i++) {
      var node = chunk[i];

      while (node.neighbors.length <= node.minConnections){
        //empties the neighbors array so that the same node isnt added multiple times.
        node.neighbors.splice(0,node.neighbors.length);
        cycles++;

        this.checkIfInSameNode(node);
        for (var i = 0; i <= nodeArray.length - 1; i++) {
          var distance = Math.sqrt(
            Math.pow((chunk[i].x - node.x), 2) +
            Math.pow((chunk[i].y - node.y), 2)
          );

          if (distance <= node.incriment * cycles) {
           node.neighbors.push(nodeArray[i]);
          }
        }
      }//end of while function
      console.log("nodes connected");
    }
  }

  //node is a node, the mods are how many




// input the array of nodes that will be sorted, and the number of columns and rows of chunks
// defaults for cols and rows = 8, so that if nothing is specified, it will still work meaningfully
createChunck(nodeArray, cols = 8, rows = 8) {
  //this is how wide and tall each chunk will be respectively

  var wInterval = canvas.width / cols;
  var hInterval = canvas.height / rows;
  var chunkArray = new Array();

  for (var i = 0; i < cols; i++){
    chunkArray[i] = [];
    for (var j = 0; j < rows; j++){
      chunkArray[i][j] = [];
    }
  }

  console.log(chunkArray);
  nodeArray.forEach(function(node){
    var i = 1;
    var j = 1;
    while (node.x >= wInterval * i) {
      i++;
    }
    while (node.y >= hInterval * j) {
      j++
    }
    node.col = i-1;
    node.row = j-1;
    chunkArray[i-1][j-1].push(node);
  });

  return chunkArray;
}




  makeConnections(node, connectionArray){
    node.neighbors.forEach(function(neighbor){
      var connection = new Connection(
        node.x,
        node.y,
        neighbor.x,
        neighbor.y
      );
      connectionArray.push(connection);
    });

  }










}
