'use strict'


var scrollX=1;
var scrollY=1;
var blueVal = rgbToDecimal([0,0,255]);
var foundCorners = [];
var nodeWidth = 20;

//temporary, for testing purposes
var height = 800;
var width = 800;
//End temp.

function scanForNodes(){
  for (h = 0; h < height; h++){
    for (w = 0; w < width; w++){


      if (getPixelColor(scrollX,scrollY) === blueVal
      && getPixelColor(scrollX+1,scrollY) === blueVal
      && getPixelColor(scrollX,scrollY + 1) === blueVal
      && getPixelColor(scrollX - 1,scrollY) !== blueVal
      && getPixelColor(scrollX,scrollY - 1) !== blueVal)  {

        i = i + nodeWidth - 1;
        console.log("I've struck gold! ...blue gold.");
      }
    }
  }
}

function getPixelColor(x,y){
  pixelColor = rgbToDecimal(getColorAtPixleNTX(scrollX,scrollY));
  return pixelColor;
}

function getColorAtPixleNTX(x,y){
  ntx.getImageData(x, y, 1, 1).data
}
