
"strict mode";

// @param {node} start || @param {node} end
/*we dont need to pass in an array of nodes because each node already points to
other nodes in it neighbors*/
//finds a path from start node to end node using A* algorithym
function findPath(start, end){
  var nodesUsed = [start];
  var masterArr = [];

//array of nodes that have been evaluated. starts empty
  var closedSet = [];
//array of nodes that have been discovered. initially, only the start node is known
  var openSet = [start];

  var lowest = //node with lowest fScore[]



  while (openSet.length > 0){

    var current = openSet[0];
    if (current == end){
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
      openSet[i].node.neighbors.forEach(function(neighbor){
        //if neighbor is in the open set, move to next iteration of loop
        if (neighbor in nodesUsed){
          checkG(current.mapNode, openSet[i].mapNode);
          continue;
        } else {
          //fix these variable names
          var neighborMapNode = mapNode(neighbor, current);
          var neighborCoordinator = coordinator(neighbor, _mapNode);
          openSet.push(_coordinator);
          nodesUsed.push(neighbor);
      }
      });
    }

    openSet.sort(function(a, b){
      a.mapNode.fValuea.mapNode.fValue - b.mapNode.fValue
    });

  }

// @params {node} start || {node} finish
  function distance(start, finish) {
    return Math.sqrt(
      Math.pow((start.x - finish.x), 2) +
      Math.pow((start.y - finish.y), 2)
    );
  }

  function huristic(node){ return distance(node, end) }

// @params {node} _node || {node} _prevNode
//_preNode = the current node, and _node will be one of its neighbors
  function mapNode(_node, _prevNode){
    var prevNode = _preNode;
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

}












.
