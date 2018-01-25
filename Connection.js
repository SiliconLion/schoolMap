class Connection {
  constructor(node1,node2){
    this.node1 = node1;
    this.node2 = node2;
    this.color = "red";
  }
//displays the connection as a line with its starting and ending points
  display() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.node1.x,this.node1.y);
    ctx.lineTo(this.node2.x,this.node2.y);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  updateColor() {
    if(this.node1.location == "room" && this.node2.location == "room"){
      this.color = "purple";
    }else if(this.node1.location == "room" || this.node2.location == "room"){
      this.color = "teal";
    }else{
      this.color = "orange";
    }
  }
}
