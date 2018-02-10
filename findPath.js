
"strict mode";

// @param {node} start || @param {node} end
/*we dont need to pass in an array of nodes because each node already points to
other nodes in it neighbors*/
//finds a path from start node to end node using A* algorithym
function findPath(start, end){

  console.log("in 'find Path'");
/*because the start node has no previous node to point to, we must create it manually
this will be functionally the same as if it had come from 'new mapNode()', though it will
not have the same inheritance.*/
  var startMapNode = {
    original : start,
    previous : undefined,
    hValue : huristic(start),
    gValue : 0,
    fValue : huristic(start)
  }
  //coordinator for start and startMapNode
  var startCoordinator = coordinator(start, startMapNode);

  //provides quick acces to every node that's been used
  var nodesUsed = [start];
  /*a list of all the coordinators that are in use, or have been in use.
  provides quick access. initially only startCoordinator exists*/
  var masterArr = [startCoordinator];
  /*array of nodes that have been discovered. initially, only the start node is known.
  therefore we initalize the openSet with its coordinator*/
    var openSet = [startCoordinator];
//array of nodes that have been evaluated. starts empty
  var closedSet = [];





  var lowest = undefined;/*node with lowest fScore[]*/



  while(openSet.length > 0){
    console.log(openSet);
    closedSet.forEach(function(coordinator){
      coordinator.node.changeColor("green");
    });

    var current = openSet[0];
    current.node.changeColor("blue");

    if (current.node === end){
      reconstructPath();
    }

//will only evaluate using the length before more nodes are added depper in
    var initLength = openSet.length;
    current.node.neighbors.forEach(function(neighbor){
      let previouslyDiscovered = false;
      //if neighbor has been discovered, then move to next iteration of loop
      for(var j = 0; j < nodesUsed.length; j++){
        if (neighbor === nodesUsed[j]){
          previouslyDiscovered = true;
          let neighborCoordinator = nodeToCoordinator(neighbor);
          checkG(current, neighborCoordinator);
        }
      }


      if (previouslyDiscovered === true){
        return;
      } else {
        //fix these variable names
        var neighborMapNode = mapNode(neighbor, current);
        var neighborCoordinator = coordinator(neighbor, neighborMapNode);
        masterArr.push(neighborCoordinator);
        openSet.push(neighborCoordinator);
        nodesUsed.push(neighbor);
    }
    });



    //next two lines: removing the current from the open list
    var index = openSet.indexOf(current);
    openSet.splice(index, 1);
    //adding current to closed list
    closedSet.push(current);

    openSet.sort(function(a, b){
      return a.mapNode.fValue - b.mapNode.fValue;
    });

    current.node.changeColor("red");

  }


// @params {node} beginning || {node} finish
  function distance(beginning, finish) {
    //when simplified, this is the distance formula
    const xPart = Math.pow((beginning.x - finish.x), 2);
    const yPart = Math.pow((beginning.y - finish.y), 2);
    const themAddedTogether = Math.sqrt( xPart + yPart);
      return themAddedTogether;
  }


  function huristic(node){ return distance(node, end) }

// @params {node} _node || {coordinator} prevCoord
//preNode = the current node, and node will be one of its neighbors
  function mapNode(node, prevCoord){
    const _hValue = huristic(node);
    //the gValue is going to be the previous node's gValue plus the distance to this new node
    var _gValue = prevCoord.mapNode.gValue + distance(node, prevCoord.node);

    var _fValue = _hValue + _gValue;


    function getOriginal(){
      return node;
    }

    return {
      original : getOriginal(),
      previous : prevCoord.mapNode,
      hValue : _hValue,
      gValue : _gValue,
      fValue : _fValue
    }
  }

//pass in 2 coordinators
/*checks to see if the new possible G value is lower. If it is,
asigns the neighbor the new G value, and the currentNode as its 'previous'*/
  function checkG(currentNode, neighborCoordinator){
    var tenntativeG = currentNode.gValue + distance(currentNode, neighborCoordinator);
    if (tenntativeG < neighborCoordinator.mapNode.gValue){
      neighborCoordinator.mapNode.gValue = tennativeG;
      neighborCoordinator.mapNode.prevNode = currentNode;
    }
  }


  function coordinator(_node, _mapNode){
    return {node : _node, mapNode : _mapNode}
  }

  function reconstructPath(){
    console.log("in reconstruction");
    //reconstruct the path and return that
    var path = [end, current.node];

    var nextPathCoordinator = current;
    console.log("nextPathCoordinator.node is")
    console.log(nextPathCoordinator)
    while (start != nextPathCoordinator.node){
      var thePrevious = nextPathCoordinator.mapNode.previous;
      console.log(thePrevious);
      path.push(thePrevious);
      nextPathCoordinator = mapNodeToCoordinator(thePrevious);
    }
    console.log(path);

  }

  function addNodeToPath(){

  }

//the orphan is a mapNode that is looking for it's coordinator object
  function mapNodeToCoordinator(orphan){
    for(var i = 0; i < masterArr.length; i++){
      let mapNodeAtIndex = masterArr[i].mapNode;
      if( mapNodeAtIndex === orphan){
        return masterArr[i];
      }
    }
  }

  function nodeToCoordinator(orphan){
    for(var i = 0; i < masterArr.length; i++){
      let nodeAtIndex = masterArr[i].node;
      if( nodeAtIndex === orphan){
        return masterArr[i];
      }
    }
  }

}
