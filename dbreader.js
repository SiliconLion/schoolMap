function getRoom() {
  var name = new String(document.getElementById("teacher").value).toLowerCase();
  var period = parseInt(document.getElementById("period").value);
  if(isNaN(period) || period <= 0 || period >= 9) period = 1;
  accessDatabase(name, period);
}

//function to edit html or return whatever, can be changed to whatever really, but it is called when an xml change is detected
function update(response) {
  document.getElementById("display").innerHTML = response;
}

//function that takes care of grabbing the info for the teachers
function accessDatabase(name, period) {
  var xhttp = new XMLHttpRequest();   //create xhttp object to grab xml

  xhttp.onreadystatechange = function() {       //creates function for when a change occurs
    if (this.readyState == 4 && this.status == 200) {
      var response = getInfo(this, name, period);
      update(response);
    }
  };

  //request info from xml file
  xhttp.open("GET", "db.txt", true);
  xhttp.send();
}

//function that does the work to access the xml file and find the proper info
function getInfo(xml, name, period) {
  var roomNumber = "DEATH";
  //xmldoc is the object with access to xml document
  var xmlDoc = xml.responseXML;
  //teachers is array of teachers and their information; specifically anything with the teacherinfo tag
  var teachers = xmlDoc.getElementsByTagName("teacherinfo");
  //iterate through all the teachers and get the room number
  for(var i = 0; i < teachers.length; i++) {
      /*accesses teacher array, then gets the name element. Then it gets the last element. Then it gets the childNodes(basically a list of attributes)
        and selects the first attribute(which is text, and also the only attribute given to any element in my XML document)
      */
      var teacherName = teachers[i].getElementsByTagName("name")[0].getElementsByTagName("last")[0].childNodes[0].nodeValue;
      if(teacherName == name) {
          /*this get the XML attribute "moving", it is either true or false, and is dependant on whether or not the teacher is a "cart teacher", that is the move classes depending on the period
          if you are reading this post 2018, this is probably a foreign concept. Furthermore if you are from post-2018 and in charge of reviewing this code, the moving attribute
          is likely obscelete, to this code can likely be removes and the tag can be removed from the XML document. However, it isn't too expensive to keep there so maybe just keep it
          just in case?
          */
          var isMoving = teachers[i].getElementsByTagName("moving")[0].childNodes[0].nodeValue;
          if(isMoving == "true") {
              var tag = "p" + period;
              /*note that, since if the teacher is moving they will have 8 tags for each period, there will be nested elements. So getElementsByTagName("room") returns another list of
              list of elements, so then we call getElementsByTagName(tag) to get the element that contains the room number for the period.
              */
              roomNumber = teachers[i].getElementsByTagName("room")[0].getElementsByTagName(tag)[0].childNodes[0].nodeValue;
            }else{
              roomNumber = teachers[i].getElementsByTagName("room")[0].childNodes[0].nodeValue;
            }
            return roomNumber;
      }
    }
    return "no teacher found";
}

function print(text) {
  document.getElementById("debug").innerHTML += "  |  " + text;
}
