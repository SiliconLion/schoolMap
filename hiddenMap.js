'use strict'

var colorIndex = 0;



//takes a rgb color, and treats it as a number in base 255,
// with r being the ones place, g being the 255's place, and b being the 255^2 place
function rgbToDecimal(r,g,b) {
  return (b*255*255) + (g * 255) + r;
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
  return ctx.getImageData(x, y, 1, 1).data
}
