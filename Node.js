
class Node {
  constructor(x, y, r = 6){
    //radius
    this.r = r;
    //position
    this.x = Math.floor(x/10)*10;
    this.y = Math.floor(y/10)*10;
    //this is who it is connected to.
    this.neighbors = [];
    //the color of the node
    this.color = "red";
    this.location = "hallway";
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
      this.color = "red";
      this.makeHallway();
    } else if (this.color == "red") {
      this.color = "blue";
      this.makeRoom();
    }
  }

//no args
//changes the location type to room
  makeRoom(){
    this.location = "room";
  }

//no args
//changes the location type to hallway
  makeHallway(){
    this.location = "hallway";
  }

  toggleLocation(){
    if (this.location == "hallway"){
      makeRoom();
    } else if (this.location == "room") {
      makeHallway();
    }
  }
}
