'use strict'


var blueVal = rgbToDecimal([0,0,255]);
var roomColorVal = rgbToDecimal([?,?,?]);
var nodeWidth = 13;
var foundNodes[];

//temporary, for testing purposes
var height = 800;
var width = 800;
//End temp.

function scanForNodes(){
  for (h = 0; h < height; h++){
    for (w = 0; w < width; w++){


      if (getPixelColor(w,h) === blueVal
      && getPixelColor(w+1,h) === blueVal
      && getPixelColor(w,h+1) === blueVal
      && getPixelColor(w-1,h) !== blueVal
      && getPixelColor(w,h-1) !== blueVal)  {

        w = w + nodeWidth - 1;  //Skips the next few values which we know will be blue because they are part of the node we just found
        console.log("I've struck gold! ...blue gold.");
        //Adds node coordinates to an array for future use in drawing connections.
        foundNodes.push(w+(nodeWidth/2)-1); //Saves the x and y value of the nodes center ((w or h)+(nodeWidth/2)-1)
        foundNodes.push(h+(nodeWidth/2)-1); //rather than the x and y of the top left corner (w or h)
        iFoundANode(w+(nodeWidth/2)-1,h+(nodeWidth/2)-1); //Generates a node at the proper x and y values and inputs it's color ID
      }
    }
  }
}

function getPixelColor(x,y){
  return rgbToDecimal(getColorAtPixleNTX(scrollX,scrollY));
}

function getColorAtPixleNTX(x,y){
  return ntx.getImageData(x,y, 1, 1).data;
}

function whichLocation(x,y){
  if (getPixelColor(x+1,y)===roomColorVal)
    return "room";
  else
    return "hallway";
}

function iFoundANode(x,y){
  makeNodeFromCoords(x,y,7,getPixelColor(x, y),whichLocation(x,y));
}
