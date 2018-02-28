'use strict';
class Room{
  constructor(number, name, arrayOfCorners){
    //all corners of the room Format (x1,y1,x2,y2,x3,y3,...)
    this.borders =[];
    //Fills the borders array with all of the information from the arrayOfCorners
    //unexpected behavior when initializing this.borders directly to arrayOfCorners

    if (arrayOfCorners.length == 4)  {
      //This portion handles setting up a room given only two conrners
      this.borders.push(arrayOfCorners[0]);
      this.borders.push(arrayOfCorners[1]);

      this.borders.push(arrayOfCorners[0]);
      this.borders.push(arrayOfCorners[3]);

      this.borders.push(arrayOfCorners[2]);
      this.borders.push(arrayOfCorners[3]);

      this.borders.push(arrayOfCorners[2]);
      this.borders.push(arrayOfCorners[1]);
    }

    else {
      //This sets up rooms with any number of corners
          for (var a = 0; a < arrayOfCorners.length; a++){
          this.borders.push(arrayOfCorners[a]);
          }
    }
    this.roomNumber = number;
    this.roomName = name;
  }
  display(){

    ctx.fillStyle = "lightgrey";
    ctx.beginPath();
    ctx.lineWidth = 5;
      ctx.moveTo(this.borders[0],this.borders[1]);

      for (var i = 2; i < (this.borders.length); i += 2){
        ctx.lineTo(this.borders[i],this.borders[i+1]);
      }

      ctx.lineTo(this.borders[0],this.borders[1]);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.fill();

  }

}
