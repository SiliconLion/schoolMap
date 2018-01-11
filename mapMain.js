

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var arrayOfNodes = [];

//x and y are the mouse coords adjusted for the canvas
// called every time there is a mouse click. decides what to do with that click
function clickHandler(x,y){
  var nodeBeneathMouse = overNode(x,y);

  /*checks to see if there is node beneath the mouse. if there is, toogle the color
  otherwise, place a node.*/
  //this is venurable. should check to see if nodeBeneathMouse is type node
  if (nodeBeneathMouse != false){
    nodeBeneathMouse.toggleColor();
  } else {
    makeNodeFromCoords(x,y);
  }


}




//called from html doc
//x and y are numbers inside the canvas
//creates a node at the x and y specified. Adds that node to the array of nodes
function  makeNodeFromCoords(x,y) {

  var node = new Node(x,y);
  arrayOfNodes.push(node);
  console.log("node added");
  console.log(node);
}


//x and y are the coords of the mouse position, adjusted to the canvas
/*checks to see if the mouse is hovering over a node. If it is,
it returns the node it is over, else it returns false*/
function overNode(xPos,yPos){
  var returnValue = false;
  for (var i = 0; i< arrayOfNodes.length; i++){
    var node = arrayOfNodes[i];

    //if xPos is beween the left and right sides of the node
    if ((node.x - (0.5 * node.r) <= xPos) && (node.x + (0.5 * node.r) >= xPos)){
    //if yPos is beween the left and right sides of the node
      if ((node.y - (0.5 * node.r) <= yPos) && (node.y + (0.5 * node.r) >= yPos)){
        returnValue = node;
        break;
      }
    }
  }
  //will either be false, or a node
   return returnValue;
}






//called from html doc
//displays all nodes
function displayAllNodes(){
  arrayOfNodes.forEach(function(node){
    node.display();
  });
}



// the following dont work yet
// function addSavedNodes(){
//   var inputedNodes = readLine();
//   arrayOfNodes.push(inputedNodes);
// }
//
//
// function getNodeData() {
//   console.log(arrayOfNodes);
// }
