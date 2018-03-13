

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var hiddenCanvas = document.getElementById("hiddenCanvas");
var htx = hiddenCanvas.getContext("2d");
var visibleCanvas = document.getElementById("visibleCanvas");
var vtx = visibleCanvas.getContext("2d");

//holds every node
var arrayOfNodes = [];
var arrayOfRooms = [];
var connectBuffer = [];
var connections = [];
var pathSpecifications = [];


// stores information about whether or not a key is currently held down
var keysDown = {
  shift : false,
  x : false,
  j : false,
  a : false,
  c : false
}

//called from html document
// a keyDown event is passed in
// handles the key down events
function eventHandleKeyDown(){
  /*stores the key that was pressed down as a string ("Shift" instead of 16. also
  doesnt care if it is left shift or right shift etc.) */
  const keyName = event.key;
  /*checks to see if 'keyname' == any of the keys in the object keysDown.
  if it does, sets that key to true */
  if (keyName == "Shift"){
    keysDown.shift = true;
  } else if (keyName == "x"){
    keysDown.x = true;
  } else if (keyName == "j"){
    keysDown.j = true;
  } else if (keyName == "a"){
    keysDown.a = true;
  } else if (keyName == "c"){
    keysDown.c = true;
  }
  //this should be reomved soon. currently used just as a debugging helper.
}

//called from html document
// a keyup event is passed in
// handles the key up events
function eventHandleKeyUp(){
  /*stores the key that was released as a string ("Shift" instead of 16. also
  doesnt care if it is left shift or right shift etc.) */
  const keyName = event.key;
  /*checks to see if 'keyname' == any of the keys in the object keysDown.
  if it does, sets that key to false */
  if (keyName == "Shift"){
    keysDown.shift = false;
    connectNodes(connectBuffer);
    redraw();
    connectBuffer.splice(0,connectBuffer.length);
  } else if (keyName == "x"){
    keysDown.x = false;

  } else if (keyName == "j"){
    keysDown.j = false;
    //gets the nodes from the buffer
    let start = pathSpecifications[0];
    let end = pathSpecifications[1];
    //clears the buffer
    pathSpecifications.splice(0,pathSpecifications.length);
    //'path' will be an array of nodes for the path from start to end
    let path = findPath(start, end);
    drawPath(path);
    //colors every node in the path red
    path.forEach(function(node){
      node.changeColor("red");
    });

  } else if (keyName == "r"){
    arrayOfNodes.forEach(function(node){
      if (node.location === "room"){
        node.changeColor("blue");
      } else {
      node.changeColor("grey");
      }
    })
  } else if (keyName == "a"){
    keysDown.a = false;
    connectCorners(connectBuffer);
    redraw();
    connectBuffer.splice(0,connectBuffer.length);

    // need to add the connection buffer stuff here for room corner creation
  } else if (keyName == "c") {
    keysDown.c = false;
  }

}






//x and y are the mouse coords adjusted for the canvas
// called every time there is a mouse click. decides what to do with that click
function clickHandler(x,y){

  let pressed = getPressedKeys();
  //if over a node, refrences that node. else will have 'false' value
  let nodeBeneathMouse = overNode(x,y);

  switch (pressed[0]) {
    case 'x':
        //cleanly deletes node and connections to it from arrayOfNodes
        deleteNode(nodeBeneathMouse);
        redraw();
        break;
    case 'shift':
        if (connectBuffer.length < 2){
          connectBuffer.push(nodeBeneathMouse);
        }
        break;
    case 'a':
      //adds corners to the connection buffer whereever the mouse clicks
        connectBuffer.push(x);
        connectBuffer.push(y);
        break;
    case 'j':
        pathSpecifications.push(nodeBeneathMouse);
        break;
    case 'c':
        break;

    default:
        //this is venurable. should check to see if nodeBeneathMouse is type node
        if (nodeBeneathMouse != false){
          nodeBeneathMouse.toggleColor();
          nodeBeneathMouse.toggleLocation();
        } else {
          makeNodeFromCoords(x,y);
        }
  }
}
// returns all the keys that are pressed down as an array
function getPressedKeys() {
  //holds all the keys that are pressed down
  let pressed = [];
  //itterates over every key in 'keysDown'
  for (var key in keysDown){
    if (keysDown.hasOwnProperty(key)) {
      //if key is held down, add it to 'pressed'
      if (keysDown[key] === true){
        pressed.push(key);
      }
    }
  }
  return pressed;
}


//called from html doc
//x and y are numbers inside the canvas
//creates a node at the x and y specified. Adds that node to the array of nodes
function  makeNodeFromCoords(x,y) {

  var node = new Node(x,y);
  arrayOfNodes.push(node);
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

  node.neighbors.forEach(function(neighbor){
    var indexInNeighbors = neighbor.neighbors.indexOf(node);
    neighbor.neighbors.splice(indexInNeighbors, 1);
    console.log("removed from a neighbor");
  });

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
  displayObjects(arrayOfRooms);
  displayObjects(arrayOfNodes);
  displayObjects(connections);

  arrayOfRooms.forEach(function(room){
    room.hiddenDisplay();
    room.visibleMapDisplay();
  });


}


//called from html doc
//displays all nodes
function displayObjects(objArray){
  objArray.forEach(function(object){
    object.display();
  });
}




function connectNodes(nodes){
  //checks 'nodes' to make sure there are two nodes
  var valid = true;
  for (var i = 0; i < nodes.length; i++){
    if (nodes[i] == false || nodes[i] == undefined) {
      console.log("not a vaild selection");
      valid = false;
      break;
    }
  }
  if (valid === false || nodes.length != 2){
    return;
  }

  //adds the nodes to eachother's neighbor array
    nodes[0].neighbors.push(nodes[1]);
    nodes[1].neighbors.push(nodes[0]);

    //makes new connection and adds it to the array of connections
    var line = new Connection(nodes[0].x,nodes[0].y,nodes[1].x,nodes[1].y);
    console.log(line);
    connections.push(line);
}




function connectCorners(corners){
  //makes a new room with a color that corisponds to the index it will have in "arrayOfRooms"
  var color = decimalToRGB(arrayOfRooms.length);
  colorString = "rgb(" + color[0]+","+ color[1] + "," + color[2] + ")"
  var room = new Room(undefined,undefined,corners,colorString);
  arrayOfRooms[arrayOfRooms.length] = room;
}

function makeHallwaysInvisible() {
  console.log('make disapear');
  arrayOfNodes.forEach(function(node){
    if (node.location === "hallway"){
      node.color = "#00000000";
    }
  });
  connections.forEach(function(stick){
    stick.color = "#00000000";
  })
  redraw();
}

function makeHallwaysVisible() {
  arrayOfNodes.forEach(function(node){
    if (node.location === "hallway"){
      node.color = "grey";
    }
  });
  connections.forEach(function(connection){
    connection.color = "red";
  })
  redraw();
}

function drawPath(pathArray){
  //Draws a path between an array of nodes. This will draw the final path on the map.
  ctx.beginPath();
  ctx.lineWidth = 5;

  ctx.moveTo(pathArray[0].x,pathArray[0].y);
  for (var i = 1; i < pathArray.length; i += 1) {
    ctx.lineTo(pathArray[i].x,pathArray[i].y);
  }

  ctx.strokeStyle = "purple";
  ctx.stroke();
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
