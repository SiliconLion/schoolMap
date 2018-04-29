

var hiddenCanvas = document.getElementById("hiddenCanvas");
var htx = hiddenCanvas.getContext("2d");
var visibleCanvas = document.getElementById("visibleCanvas");
var vtx = visibleCanvas.getContext("2d");

//holds every node
var arrayOfNodes = [];
var arrayOfRooms = [];
var connectBuffer = [];
var connections = [];
var pathSpecifications = [];



// Find the room of the given name
// string is the room number, which is a ###(LETTER), like 112A
function findRoom(string) {
  for(var i=0;i<arrayOfRooms.length;i++){
    if(string == rgbToDecimal(arrayOfRooms[i].color)){
      return arrayOfRooms[i];
    }
  }
}


function redraw(){
  //redraws the map image so nodes that no longer exist disapear
  arrayOfRooms.forEach(function(room){
    room.hiddenDisplay();
  });
}

function redrawVTX(){
//Draws the background of VTX, effectivly clearing it.
  vtx.fillStyle="#FFFFFF";
  vtx.fillRect(0,0,800,800);
  var img = document.getElementById("bluePrint");
  vtx.drawImage(img,10,10,676,480);
}

function drawPath(pathArray){
  //Draws a path between an array of nodes. This will draw the final path on the map.
  vtx.beginPath();
  vtx.lineWidth = 5;

  vtx.moveTo(pathArray[0].x,pathArray[0].y);
  for (var i = 1; i < pathArray.length; i += 1) {
    vtx.lineTo(pathArray[i].x,pathArray[i].y);
  }

  vtx.strokeStyle = "purple";
  vtx.stroke();
}
