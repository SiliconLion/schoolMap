'use strict'

//ImageHandler2.0 New and Improved to use Python Generated Text File!

//Data values used in scanning for nodes
var imgWidth;
var imgHeight;
var pixArr;
var blueVal = "0,0,255";
var emptyVal = "255,255,255"; //<--- potentially the same as blueVal, if so we can just substitute all references to emptyVal with blueVal
var roomColorVal = "0,255,255";
var nodeWidth = 13;
//List of the x and y values of nodes in the format [x,y],[x,y]
var foundNodes = [];

//Node Generation

//WIP: Python being modified to simplify
function readImageText(str){
  var pixText = str;
  pixText = pixText.replace("\n","");
  pixText = pixText.replace("\n","");

  var tempArr1 = pixText.split(';');

  //Pulls the image width and height from the first two lines of the pixel text file
  imgWidth = tempArr1[1];
  imgHeight = tempArr1[0];
  var tempArr2 = tempArr1.slice(2,tempArr1.length);
  //[x value][y value]
  pixArr = createArray(imgWidth,imgHeight);

  //Sorts tempArr2 into the two dimentional array pixArr
  var i = 0;
  for (var w = 0; w < imgWidth; w++){
    for (var h = 0; h < imgHeight; h++){

    pixArr[w][h] = tempArr2[i]
    i++;

    }
  }
  scanForNodes();
}

//written by users Matthew Crumley and yckart on https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
//End copied code

function scanForNodes(){
  //w and h need to be set at 0 if there is a node that starts in the top left
  for (var h = 1; h < imgHeight; h++){
    //Scans through all x values from 0 to the width of the canvas
    for (var w = 1; w < imgWidth; w++){
      //Checks to see if the pixel at (w,h) is the top left corner of a node
      if (pixArr[w][h] === blueVal){
      if( pixArr[w+1][h] === blueVal
      &&  pixArr[w][h+1] === blueVal
      &&  pixArr[w-1][h] !== blueVal
      &&  pixArr[w][h-1] !== blueVal){
        console.log("I've struck gold! ...blue gold.\n@: "+w+", "+h);
        //Skips the next few values which we know will be blue because they are part of the node we just found.
        w = w + nodeWidth - 1;

        //Adds node coordinates to an array for future use in drawing connections.
        //Saves the x and y value of the nodes center ((w or h)+(nodeWidth/2)-1) rather than the x and y of the top left corner (w or h)
        //Adjusts to find the center of the found node
        foundNodes.push([w+(nodeWidth/2)-.5,h+(nodeWidth/2)-.5]);

        iFoundANode(w+(nodeWidth/2)-.5,h+(nodeWidth/2)-.5);

      }
    }
    }
  }
  connectAllFoundNodes(foundNodes);
}

function iFoundANode(x,y){
  console.log(x);
  console.log(y);
  makeNodeFromColors(x,y,undefined,getPixelColor(x, y),whichLocation(x,y));
}//End iFoundANode(x,y)

//Generates a node in the arrayOfNodes at the index of it's color ID
function makeNodeFromColors(x,y,rad,colorID,location){
  var node = new Node(x,y,rad,colorID,location);
  arrayOfNodes[colorID] = node;
}

//Called from iFoundANode(x,y) and accepts two integers as input.
function whichLocation(x,y){
  //Checks if the pixel to the right of the top left corner is the color (roomColorVal) that indicates that the node is a room
  if (getPixelColor(x+2,y)===roomColorVal)
    //Returns "room" if the node is indicated to be a room
    return "room";
  else
    //Returns "hallway" if the node is not indicated to be a room.
    return "hallway";
}//End whichLocation(x,y)

//Called from iFoundANode(x,y), whichLocation(x,y), and scanForNodes() and accepts two integers as input.
function getPixelColor(x,y){
  //Returns the decimal equivelant of the RGB value of the pixel at (x,y)

  return rgbToDecimal(pixArr[x][y]);
}//End getPixelColor(x,y)


//End Node Generation
//------------------------------------
//Node connections


//loops to run the connectNodesFromImage() funtion on each found node, accepts input of an array in the format of [[x,y],[x,y],[x,y]]
function connectAllFoundNodes(nodeCoordList){
  for (var i=0; i < nodeCoordList.length; i++){
    connectNodesFromImage(nodeCoordList[i][0],nodeCoordList[i][1]);
  }
      console.log(arrayOfNodes);
      redraw();
}

//Function used to connect nodes using the image they were generated from, accepts input of (x,y), called from connectAllFoundNodes
function connectNodesFromImage(x,y){

  //creates a variable that stores the index in arrayOfNodes of the node whose neighbors array is currently being built
  var homeColorID = getPixelColor(x,y);

  //Checks top left corner of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (pixArr[x-4,y-4] !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x-4,y-4)]);

//Checks top middle of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (pixArr[x,y-4] !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x,y-4)]);

//Checks top right corner of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (pixArr[x+4,y-4] !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x+4,y-4)]);

//Checks left side of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (pixArr[x-4,y] !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x-4,y)]);

//Checks right side of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (pixArr[x+4,y] !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x+4,y)]);

//Checks bottom left corner of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (pixArr[x-4,y+4] !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x-4,y+4)]);

//Checks bottom middle of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (pixArr[x,y+4] !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x,y+4)]);

//Checks bottom right corner of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (pixArr[x+4,y+4] !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x+4,y+4)]);

}


//Old version, Uses the NTX canvas rather than pixels.txt, non-functional

/*
//Data values used in scanning for nodes
var emptyVal = rgbToDecimal([255,255,255]); //<--- potentially the same as blueVal, if so we can just substitute all references to emptyVal with blueVal
var blueVal = rgbToDecimal([0,0,255]);
var roomColorVal = rgbToDecimal([0,255,255]);
var nodeWidth = 13;

//List of the x and y values of nodes in the format [x,y],[x,y]
var foundNodes[];

//Height and width of the image that the nodes are being generated from in pixels
//temporary, for testing purposes
var height = 80;
var width = 80;
//End temp.

//loops to run the connectNodesFromImage() funtion on each found node, accepts input of an array in the format of [[x,y],[x,y],[x,y]]
function connectAllFoundNodes(nodeCoordList){
  for (i=0, i < nodeCoordList.length; i++){
    connectNodesFromImage(nodeCoordList[i][0],nodeCoordList[i][1]);
  }
}

//Function used to connect nodes using the image they were generated from, accepts input of (x,y), called from connectAllFoundNodes
function connectNodesFromImage(x,y){

  //creates a variable that stores the index in arrayOfNodes of the node whose neighbors array is currently being built
  homeColorID = getPixelColor(x,y);

  //Checks top left corner of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (getPixelColor(x-4,y-4) !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x-4,y-4)]);

//Checks top middle of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (getPixelColor(x,y-4) !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x,y-4)]);

//Checks top right corner of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (getPixelColor(x+4,y-4) !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x+4,y-4)]);

//Checks left side of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (getPixelColor(x-4,y) !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x-4,y)]);

//Checks right side of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (getPixelColor(x+4,y) !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x+4,y)]);

//Checks bottom left corner of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (getPixelColor(x-4,y+4) !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x-4,y+4)]);

//Checks bottom middle of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (getPixelColor(x,y+4) !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x,y+4)]);

//Checks bottom right corner of the node for a color other than emptyVal and adds the corresponding node to arrayOfNodes[homeColorID].neighbors
  if (getPixelColor(x+4,y+4) !== emptyVal)
    arrayOfNodes[homeColorID].neighbors.push(
      arrayOfNodes[getPixelColor(x+4,y+4)]);

}

//Primary method of this Class, We should only ever need to call this function, it will run the rest.
//Function used to generate node data from an image, also calls connectAllFoundNodes() at the end to link all the newly created nodes
function scanForNodes(){
  //Scans through all y values from 0 to the height of the canvas
  for (h = 0; h < height; h++){
    //Scans through all x values from 0 to the width of the canvas
    for (w = 0; w < width; w++){

      //Checks to see if the pixel at (w,h) is the top left corner of a node
      if (getPixelColor(w,h) === blueVal
      && getPixelColor(w+1,h) === blueVal
      && getPixelColor(w,h+1) === blueVal
      && getPixelColor(w-1,h) !== blueVal
      && getPixelColor(w,h-1) !== blueVal)

       {
        console.log("I've struck gold! ...blue gold.");
        //Skips the next few values which we know will be blue because they are part of the node we just found.
        w = w + nodeWidth - 1;

        //Adds node coordinates to an array for future use in drawing connections.
        //Saves the x and y value of the nodes center ((w or h)+(nodeWidth/2)-1) rather than the x and y of the top left corner (w or0 h)
        foundNodes.push([w+(nodeWidth/2)-1,h+(nodeWidth/2)-1]);

        //Generates a node at the proper x and y values and inputs it's color ID
        iFoundANode(w+(nodeWidth/2)-1,h+(nodeWidth/2)-1);
      }//End if (getPixelColor(w,h) ...)
    }//End for (w = 0; w ...)
  }//End for (h = 0; h ...)
  connectAllFoundNodes(foundNodes);
}//End scanForNodes()

//Called from iFoundANode(x,y), whichLocation(x,y), and scanForNodes() and accepts two integers as input.
function getPixelColor(x,y){
  //Returns the decimal equivelant of the RGB value of the pixel at (x,y)
  return rgbToDecimal(getColorAtPixleNTX(x,y));
}//End getPixelColor(x,y)

//Called from getPixelColor(x,y) and accepts two integers as input.
function getColorAtPixleNTX(x,y){
  //Returns the RGB value of the pixel at (x,y) in the format of [R,G,B,A] ('A' value is typically ignored)
  return ntx.getImageData(x,y, 1, 1).data;
}//End getColorAtPixleNTX(x,y)

//Called from iFoundANode(x,y) and accepts two integers as input.
function whichLocation(x,y){
  //Checks if the pixel to the right of the top left corner is the color (roomColorVal) that indicates that the node is a room
  if (getPixelColor(x+2,y)===roomColorVal)
    //Returns "room" if the node is indicated to be a room
    return "room";
  else
    //Returns "hallway" if the node is not indicated to be a room.
    return "hallway";
}//End whichLocation(x,y)

//Called from scanForNodes, Creates a new node at (x,y) with a radius of 7, assigns the node it's color ID, and tells it whether it is a room or hallway
function iFoundANode(x,y){
  makeNodeFromColors(x,y,undefined,getPixelColor(x, y),whichLocation(x,y));
}//End iFoundANode(x,y)

//Generates a node in the arrayOfNodes at the index of it's color ID
function makeNodeFromColors(x,y,rad,colorID,location){
  var node = new Node(x,y,rad,colorID,location);
  arrayOfNodes[colorID] = node;
}
*/
