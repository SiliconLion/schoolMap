
class Node {
  constructor(x, y, r = 7){
    //radius
    this.r = r;
    //position
    this.x = x;
    this.y = y;
    //this is who it is connected to.
    this.neighbors = [];
    //the color of the node
    this.color = "blue";
  }
  // displays the node as a circle at position (this.x,this.y), with the color "this.color"
  display(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  toggleColor(){
    if(this.color == "blue"){
      this.color = "red";
    } else if (this.color == "red") {
      this.color = "blue";
    }
  }

}
