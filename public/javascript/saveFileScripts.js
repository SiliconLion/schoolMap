"use strict"


var array = []; // YEEEHAAAA
var fileName = "Data.txt"; // What we call our file that we save
var reader = new FileReader(); // This is how we read the file
// We take an array of objects and convert it to a saveable file
function createData(savedArray){
  array = savedArray;
  // We convert our array to strings
  for(var i = 0; i< array.length; i++)
    {
    console.log(array[i]);
    array[i] = JSON.stringify(array[i])+"@";
    }
}

function writeFile(){
  // This takes whatever is inside the [ ] and converts it to a saveable format
  var blob = new Blob([array], {type: "text/plain;charset=utf-8"});
  saveAs(blob, fileName); // This saves the blob under the given filename with magic, apperently.
  // Destroy the array
  array.splice(0,array.length);
}

function unwrapNodeJSON() {
  var i,ii,neigh;
  arrayOfNodes.forEach(function(node){
  for(i=0;i<node.neighbors.length;i++){
    neigh = node.neighbors[i];
    for(ii = 0; ii < arrayOfNodes.length;ii++){
      if(arrayOfNodes[ii] == neigh){
        break;
        }
      }
    node.neighbors[i] = ii;
    }
  });
}

function rewrapNodeJSON(){
  var i,ii,neigh;
  arrayOfNodes.forEach(function(node){
    for(i=0;i<node.neighbors.length;i++){
      node.neighbors[i] = arrayOfNodes[node.neighbors[i]];
      var line = new Connection(node.x,node.y,node.neighbors[i].x,node.neighbors[i].y);
      connections.push(line);
      }
  });
}
