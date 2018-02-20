'use strict';
class Room{
  constructor(number, name, arrayOfCorners){
    //all corners of the room Format (x1,y1,x2,y2,x3,y3,...)
    this.borders =[];
    //Fills the borders array with all of the information from the arrayOfCorners
    //unexpected behavior when initializing this.borders directly to arrayOfCorners
    for (var a = 0; a < arrayOfCorners.length; a++){
      this.borders.push(arrayOfCorners[a]);
    }
    
    this.roomNumber = number;
    this.roomName = name;
  }
  display(){

    ctx.fillStyle = "blue";
    ctx.beginPath();
      ctx.moveTo(this.borders[0],this.borders[1]);

      for (var i = 2; i < (this.borders.length); i += 2){
        ctx.lineTo(this.borders[i],this.borders[i+1])
      }

      ctx.lineTo(this.borders[0],this.borders[1])
    ctx.strokeStyle = "blue";
    ctx.stroke();

  }

}
