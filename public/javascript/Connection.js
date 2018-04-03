class Connection {
  constructor(x1,y1,x2,y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = "red";
  }
//displays the connection as a line with its starting and ending points
  display() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

}
