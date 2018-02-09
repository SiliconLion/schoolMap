
class Room{
  constructor(number = -1, name = ""){
    //Shape of room
    this.borders = [];
    //Room name / number
    this.roomNumber = number;
    this.roomName = name;
  }
  display(){
    ctx.fillStyle = "blue";
    ctx.beginPath();
    //drawing
    ctx.strokeStyle = "blue";
    ctx.stroke();

  }
  getCorners(){
    //saves the X and Y values of the corners

  }

}
