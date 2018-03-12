'use strict'

var colorIndex = 0;



//takes a rgb color, and treats it as a number in base 255,
// with r being the ones place, g being the 255's place, and b being the 255^2 place
function rgbToDecimal(colorArr) {
  //colorArr[0] == r, colorArr[1] == g,colorArr[2] == b,
  //change this to bit manipulation
  return (colorArr[2]*65025) + (colorArr[1] * 255) + colorArr[0];
}

//takes a decimal number, and turns it into a rbg color.
/* Uses bitwise level hacking. If you dont understand this and need to change it
for some reason, here is alternative code*/
// function decimalToRGB(num) {
//   let b = 0;
//   let g = 0;
//   let r = 0;
//   while (num >= 65536) {
//     console.log(num + "b");
//     b++;
//     num -= 65536;
//   }
//   while (num >= 256) {
//     console.log(num + "g");
//     g++;
//     num -= 256;
//   }
//   console.log(num + "r");
//   r = num;
//
//   return [r,g,b];
// }
function decimalToRGB(num){
  var r,g,b;
  r = num & 0x000000FF;
  g = (num & 0x0000FF00) >> 8;
  b = (num & 0x00FF0000) >> 16;
  return [r,g,b];
}


function getColorAtPixle(x,y) {
  return htx.getImageData(x, y, 1, 1).data
}

//color is an array in the format [r,g,b]
//returns the room that has the same index as the decimal value of the color
function getRoomByColor(colorArr) {
  return arrayOfRooms[rgbToDecimal(colorArr)];
}
