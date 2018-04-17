"use strict"
var array = []; // YEEEHAAAA
var totalArray = []; // Master Array
var fileName = "Data.txt"; // What we call our file that we save
var reader = new FileReader(); // This is how we read the file
// We take an array of objects and convert it to a saveable file
function createData(savedArray1,savedArray2){
  array = [];
  array = savedArray1.slice();
  // We convert our array to strings
  for(var i = 0; i< array.length; i++){
    array[i] = JSON.stringify(array[i])+"@";
    }
  totalArray = array.slice();
  totalArray[totalArray.length] = "@@";
  i = totalArray.length;
  array = savedArray2.slice();
  for(var ii = 0; ii< array.length;ii++){
    totalArray[i+ii] = JSON.stringify(array[ii])+"@";
    }
}

function writeFile(){
  // This takes whatever is inside the [ ] and converts it to a saveable format
  var blob = new Blob([totalArray], {type: "text/plain;charset=utf-8"});
  saveAs(blob, fileName); // This saves the blob under the given filename with magic, apperently.
  // Destroy the array
  array = [];
}

function unwrapNodeJSON() {
  var i,ii,iii,iv,neigh;

  arrayOfNodes.forEach(function(node){
  if(node.location == "room"){
    // Fixing Circlar flow in rooms. Thanks, david.
    for(iii=0;iii<arrayOfRooms.length;iii++){
      if(arrayOfRooms[iii].node == node){
        console.log("We have found the correct room");
        for(iv=0;iv<arrayOfNodes.length;iv++){
          console.log("BEEP BEEP");
          if(arrayOfNodes[iv] == node){
            console.log("We got this far");
            arrayOfRooms[iii].node = iv;
            break;
          }
        }
      break;
      }
    }
  }
  for(i=0;i<node.neighbors.length;i++){
    // Fixing circular flow in nodes. Thanks, entire team.
    neigh = node.neighbors[i];
    for(ii=0;ii<arrayOfNodes.length;ii++){
      if(arrayOfNodes[ii] == neigh){
        break;
        }
      }
    node.neighbors[i] = ii;
    }
  });
}

function rewrapNodeJSON(){
  var i,ii,iii,iv,neigh;
  arrayOfNodes.forEach(function(node){
  if(node.location == "room"){
    for(iv=0;iv<arrayOfNodes.length;iv++){
      if(arrayOfNodes[iv] == node){
        break;
        }
      }
    for(iii=0;iii<arrayOfRooms.length;iii++){
      if(arrayOfRooms[iii].node == iv){
        arrayOfRooms[iii].node = arrayOfNodes[iv];
        break;
        }
      }
    }
    for(i=0;i<node.neighbors.length;i++){
      node.neighbors[i] = arrayOfNodes[node.neighbors[i]];
      var line = new Connection(node.x,node.y,node.neighbors[i].x,node.neighbors[i].y);
      connections.push(line);
      }
  });
}
