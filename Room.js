'use strict';
class Room{
  constructor(number, name, arrayOfCorners, color){
    //this.borders = corners of the room Format (x1,y1,x2,y2,x3,y3,...)
    this.borders = [];
    //
    this.color = color;
    this.node;
    //Fills the borders array with all of the information from the arrayOfCorners
    //unexpected behavior when initializing this.borders directly to arrayOfCorners

    if (arrayOfCorners.length == 4)  {//Checks to see if there are only two corners given
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
    //Sets a room number as an ID for the room
    this.roomNumber = number;
    //
    this.roomName = name;
  }

  //Called from the visibleMapDisplay function, draws the rooms border with blue lines and fills it with this.color all on the CTX canvas
  display(){
    //Sets the fill color to this.color
    ctx.fillStyle = this.color;
    //Starts drawing the border with a line width of 5
    ctx.beginPath();
    ctx.lineWidth = 5;
      //Draws a blue line from the first corner to the last
      ctx.moveTo(this.borders[0],this.borders[1]);

      for (var i = 2; i < (this.borders.length); i += 2){
        ctx.lineTo(this.borders[i],this.borders[i+1]);
      }
      //Closes the room by drawing from the last corner to the first
      ctx.lineTo(this.borders[0],this.borders[1]);
    //Sets the line color to blue
    ctx.strokeStyle = "blue";
    ctx.stroke();
    //fills in the borders with this.color
    ctx.fill();

  }

  //Called from the hiddenDisplay function, draws the rooms border with blue lines and fills it with this.color all on the CTX canvas
  hiddenDisplay(){
    //Sets the fill color to this.color
    htx.fillStyle = this.color;
    //Starts drawing the border with a line width of 5
    htx.beginPath();
    htx.lineWidth = 5;
      //Draws a blue line from the first corner to the last
      htx.moveTo(this.borders[0],this.borders[1]);

      for (var i = 2; i < (this.borders.length); i += 2){
        htx.lineTo(this.borders[i],this.borders[i+1]);
      }
      //Closes the room by drawing from the last corner to the first
      htx.lineTo(this.borders[0],this.borders[1]);
    //Sets the line color to blue
    htx.strokeStyle = "blue";
    htx.stroke();
    //fills in the borders with this.color
    htx.fill();
  }
//I didn't write this, david, do your comments
  visibleMapDisplay() {
    vtx.fillStyle = "pink";
    vtx.beginPath();
    vtx.lineWidth = 5;
      vtx.moveTo(this.borders[0],this.borders[1]);

      for (var i = 2; i < (this.borders.length); i += 2){
        vtx.lineTo(this.borders[i],this.borders[i+1]);
      }

      vtx.lineTo(this.borders[0],this.borders[1]);
    vtx.strokeStyle = "blue";
    vtx.stroke();
    vtx.fill();
  }

}
