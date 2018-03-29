'use strict'

//Data values used in scanning for nodes
var blueVal = rgbToDecimal([0,0,255]);
var roomColorVal = rgbToDecimal([?,?,?]);
var nodeWidth = 13;

//List of the x and y values of nodes in the format [x,y],[x,y]
var foundNodes[];

//temporary, for testing purposes
var height = 800;
var width = 800;
//End temp.

//Function used to generate node data from an image.
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
  if (getPixelColor(x+1,y)===roomColorVal)
    //Returns "room" if the node is indicated to be a room
    return "room";
  else
    //Returns "hallway" if the node is not indicated to be a room.
    return "hallway";
}//End whichLocation(x,y)

//Creates a new node at (x,y) with a radius of 7, assigns the node it's color ID, and tells it whether it is a room or hallway
function iFoundANode(x,y){
  makeNodeFromCoords(x,y,7,getPixelColor(x, y),whichLocation(x,y));
}//End iFoundANode(x,y)
