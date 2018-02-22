var array = []; // YEEEHAAAA
var fileName = "Data.txt"; // What we call our file that we save
var reader = new FileReader(); // This is how we read the file

function createData() {

  // Some test objects
  var obj = {
    name: 'Samson \"Sam\" Smith',
    health: 21,
    cats: 2
  };
  var hoopla = {
    name: 'Hoopla',
    data: 'Hoopla',
    yesSir: true,
    nested: {
      nest: "for the birds",
      worms: "for the baby birds",
      inception: {
        actor: "Leo",
        plot: "Obtuse",
        bendiness: NaN
      }
    }
  }



  // Then we stringify all of our objects
  var str01 = JSON.stringify(obj)+"@"; // We append the @ symbol to the stringify command so we can seperate them later
  var str02 = JSON.stringify(hoopla)+"@"; // The last one doesn't need a @, but it works if it has one

  // Then we take our strings and put them in our savable array
  for(var i = 0; i< 10000; i++)
    {
    if(i % 2 == 0)
      {
      array[i] = str01; // Obj
      }else{
      array[i] = str02; // Hoopla
      }
    }
  console.log(array.length);
}

function writeFile(){
  // This takes whatever is inside the [ ] and converts it to a saveable format
  var blob = new Blob([array], {type: "text/plain;charset=utf-8"});
  saveAs(blob, fileName); // This saves the blob under the given filename with magic, apperently.
}
