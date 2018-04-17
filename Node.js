
class Node {

  constructor(x, y, r = 7, colorID, roomOrHall){

    //The nodes color ID in decimal, derived from rgb
    this.colorID = colorID;
    //radius
    this.r = r;
    //position
    this.x = x;
    this.y = y;
    //this is who it is connected to.
    this.neighbors = [];
    //the color of the node
    this.color = "grey";
    this.location = roomOrHall;
  }
  // displays the node as a circle at position (this.x,this.y), with the color "this.color"
  display(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
//no args
//changes the color of the node.
  toggleColor(){
    if(this.color == "blue"){
      this.color = "grey";
    } else if (this.color == "grey") {
      this.color = "blue";
    }
    redraw();

  }

  changeColor(color){
    this.color = color;
    redraw();

  }

//no args
//changes the location type to room
  makeRoom(){
    this.location = "room";
    let room = getRoomByLocation(this.x, this.y);
    //this.room = getRoomByLocation(this.x, this.y);
    room.node = this;
  }

//no args
//changes the location type to hallway
  makeHallway(){
    this.location = "hallway";
    this.room = "undefined";
  }

  toggleLocation(){
    if (this.location == "hallway"){
      this.makeRoom();
    } else if (this.location == "room") {
      this.makeHallway();
    }
  }
}
