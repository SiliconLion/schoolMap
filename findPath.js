
"strict mode";

// @param {node} start || @param {node} end
/*we dont need to pass in an array of nodes because each node already points to
other nodes in it neighbors*/
//finds a path from start node to end node using A* algorithym
function findPath(start, end){

  console.log("in 'find Path'");
  var nodesUsed = [start];
  var masterArr = [];

//array of nodes that have been evaluated. starts empty
  var closedSet = [];
  var startMapNode = {
    original : start,
    previous : undefined,
    hValue : huristic(start),
    gValue : 0,
    fValue : huristic(start)
  }

/*array of nodes that have been discovered. initially, only the start node is known.
we create a cordinator for the start node*/
  var openSet = [coordinator(start, startMapNode)];

  var lowest = undefined;/*node with lowest fScore[]*/




  while(openSet.length > 0){
    console.log(openSet);
    //;
    var current = openSet[0];
    current.node.toggleColor;
    if (current.node === end){
      reconstructPath();
    }

//will only evaluate using the length before more nodes are added depper in
    var initLength = openSet.length;
    for(var i = 0; i < initLength; i++){

      openSet[i].node.neighbors.forEach(function(neighbor){
        //if neighbor is in the open set, move to next iteration of loop
        if (neighbor in nodesUsed){
          checkG(current.mapNode, openSet[i].mapNode);
          //this will break out of this itteration of the forEach loop
          return;
        } else {
          //fix these variable names
          var neighborMapNode = mapNode(neighbor, current.node);
          var neighborCoordinator = coordinator(neighbor, neighborMapNode);
          masterArr.push(neighborCoordinator);
          openSet.push(neighborCoordinator);
          nodesUsed.push(neighbor);
      }
      });
    }

    //next two lines: removing the current from the open list
    var index = openSet.indexOf(current);
    openSet.splice(index, 1);
    //adding current to closed list
    closedSet.push(current);

    openSet.sort(function(a, b){
      a.mapNode.fValue - b.mapNode.fValue
    });

    current.node.toggleColor;

  }


// @params {node} beginning || {node} finish
  function distance(beginning, finish) {
    /*if the beginning and finish are the same node, the distance between them is 0,
     but will be calculated as Math.sqrt(0), which is NaN,*/
    if (beginning === finish){
      return 0;
    } else {
      return Math.sqrt(
        Math.pow((beginning.x - finish.x), 2) +
        Math.pow((beginning.y - finish.y), 2)
      );
    }
  }


  function huristic(node){ return distance(node, end) }

// @params {node} _node || {mapNode} prevNode
//preNode = the current node, and node will be one of its neighbors
  function mapNode(node, prevNode){
    const _hValue = huristic(node);
    //the gValue is going to be the previous node's gValue plus the distance to this new node
    var _gValue = prevNode.gValue + distance(node, prevNode);

    var _fValue = _hValue + _gValue;


    function getOriginal(){
      return node;
    }

    return {
      original : getOriginal(),
      previous : prevNode,
      hValue : _hValue,
      gValue : _gValue,
      fValue : _fValue
    }
  }

  function checkG(currentNode, neighbor){
    var tenntativeG = currentNode.gValue + distance(currentNode, neighbor);
    if (tennativeG < neighbor.gValue){
      neighbor.gValue = tennativeG;
      neighbor.prevNode = currentNode;
    }
  }


  function coordinator(_node, _mapNode){
    return {node : _node, mapNode : _mapNode}
  }

  function reconstructPath(){
    console.log("in reconstruction");
    //reconstruct the path and return that
    var path = [current.node];

    var nextPathNode = current;
    console.log("nextPathNode.node is")
    console.log(nextPathNode)
    while (start != nextPathNode.node){
      var thePrevious = nextPathNode.node.previous;
      console.log(thePrevious);
      path.push(thePrevious);
      nextPathNode = mapNodeToCoordinator(thePrevious);
    }
    console.log(path);

  }

  function addNodeToPath(){

  }

//the orphan is a mapNode that is looking for it's coordinator object
  function mapNodeToCoordinator(orphan){
    for(var i = 0; i < masterArr; i++){
      if(masterArr[i].mapNode === orphan){
        return masterArr[i];
      }
    }
  }

}
