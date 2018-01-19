
"strict mode";

// @param {node} start || @param {node} end
/*we dont need to pass in an array of nodes because each node already points to
other nodes in it neighbors*/
//finds a path from start node to end node using A* algorithym
function findPath(start, end){
  var nodes = [start];
  var masterArr = [];

//array of nodes that have been evaluated. starts empty
  var closedSet = [];
//array of nodes that have been discovered. initially, only the start node is known
  var openSet = [start];

  var lowest = //node with lowest fScore[]



  while (openSet.length > 0){

    var current = openSet[0];
    if (current == goal){
      //reconstruct the path and return that
    }
    //next two lines: removing the current from the open list
    var index = openSet.indexOf(current);
    openSet.splice(index, 1);
    //adding current to closed list
    closedSet.push(current);

//will only evaluate using the length before more nodes are added depper in
    var initLength = openSet.length;
    for(var i = 0; i < initLength - 1; i++){
      openSet[i].neighbors.forEach(function(neighbor){
        //if neighbor is in the open set, move to next iteration of loop
        if (neighbor in openSet){
          continue;
        } else {
        openSet.push(neighbor);
      }
      });
    }


  }

// @params {node} start || {node} finish
  function distance(start, finish) {
    return Math.sqrt(
      Math.pow((start.x - finish.x), 2) +
      Math.pow((start.y - finish.y), 2)
    );
  }

  function huristic(node){ return distance(node, end) }



}












.
