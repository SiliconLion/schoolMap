var array = []; // YEEEHAAAA
var fileName = "Data.txt"; // What we call our file that we save
var reader = new FileReader(); // This is how we read the file
// We take an array of objects and convert it to a saveable file
function createData(savedArray){
  array = savedArray;
  var str;
  var cache = [];
  // We convert our array to strings
  for(var i = 0; i< array.length; i++)
    {
    array[i] = JSON.stringify()+"@";
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
  arrayOfNodes.forEach(function(node){
    node.neighbors.forEach(function(neighbor){
      neighbor = arrayOfNodes.getIndexOf(neighbor);
    });
  });
}

function rewrapNodeJSON(){
  arrayOfNodes.forEach(function(node){
    node.neighbors.forEach(function(neighbor){
      neighbor = arrayOfNodes[neighbor];
    });
  });
}
