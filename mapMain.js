

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//holds every node
var arrayOfNodes = [];
var connectBuffer = [];
var connections = [];


// stores information about whether or not a key is currently held down
var keysDown = {
  shift : false,
  x : false
}

//called from html document
// a keyDown event is passed in
// handles the key down events
function eventHandleKeyDown(){
  console.log("key is down");
  /*stores the key that was pressed down as a string ("Shift" instead of 16. also
  doesnt care if it is left shift or right shift etc.) */
  const keyName = event.key;
  //this should be reomved soon. currently used just as a debugging helper.
  console.log(event, keyName);

  /*checks to see if 'keyname' == any of the keys in the object keysDown.
  if it does, sets that key to true */
  if (keyName == "Shift"){
    keysDown.shift = true;
  } else if (keyName == "x"){
    keysDown.x = true;
  }
  //this should be reomved soon. currently used just as a debugging helper.
  console.log(keysDown);
}

//called from html document
// a keyup event is passed in
// handles the key up events
function eventHandleKeyUp(){
  /*stores the key that was released as a string ("Shift" instead of 16. also
  doesnt care if it is left shift or right shift etc.) */
  const keyName = event.key;
  //this should be reomved soon. currently used just as a debugging helper.
  console.log(event, keyName);

  /*checks to see if 'keyname' == any of the keys in the object keysDown.
  if it does, sets that key to false */
  if (keyName == "Shift"){

    keysDown.shift = false;
    connectNodes(connectBuffer);
    redraw();
    connectBuffer.splice(0,connectBuffer.length);
  } else if (keyName == "x"){
    keysDown.x = false;
  }
  console.log(keysDown);
}






//x and y are the mouse coords adjusted for the canvas
// called every time there is a mouse click. decides what to do with that click
function clickHandler(x,y){

  //if over a node, refrences that node. else will have 'false' value
  var nodeBeneathMouse = overNode(x,y);

  /*checks to see if there is node beneath the mouse. if there is and niether shift nor x are held, toogle the color
  otherwise, place a node.*/
  //this is venurable. should check to see if nodeBeneathMouse is type node
  if (nodeBeneathMouse != false){
    if (keysDown.shift != true){
      if (keysDown.x == true) {
        //cleanly deletes node from arrayOfNodes, and connections to it
        deleteNode(nodeBeneathMouse);
        redraw();
      } else {
        nodeBeneathMouse.toggleColor();
        nodeBeneathMouse.toggleLocation();
      }
    } else if(keysDown.shift == true) {
      //start drawing a connection.
      if (connectBuffer.length < 2){
        connectBuffer.push(nodeBeneathMouse);
      }
      console.log("in shift mouse mode");
    }
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


function deleteNode(node){
  var indexOfNode = arrayOfNodes.indexOf(node);

//removes the node passed into delete node. checks that it is a valid index first just cuz its good practice.
  if (indexOfNode > -1) {
    var removed = arrayOfNodes.splice(indexOfNode, 1);
    console.log(removed);
  }
}

function redraw(){
  //redraws the map image so nodes that no longer exist disapear
  var img = document.getElementById("bluePrint");
  ctx.drawImage(img, 10, 10);

  // redraws all the nodes over top that still do exist
  displayObjects(arrayOfNodes);
  displayObjects(connections);
}


//called from html doc
//displays all nodes
function displayObjects(objArray){
  objArray.forEach(function(object){
    object.display();
  });
}




function connectNodes(nodes){
  debugger;



  nodes[0].neighbors.push(nodes[1]);
  nodes[1].neighbors.push(nodes[0]);
  var rawPasta = new Connection(nodes[0].x,nodes[0].y,nodes[1].x,nodes[1].y);
  // connectBuffer.push(
  //   new Connection(nodes[0].x,nodes[0].y,nodes[1].x,nodes[1].y)
  // );
  connections.push(rawPasta);

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
