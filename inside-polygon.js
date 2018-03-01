
// returns a boolean if it is inside the polygon or not
/*corners is an array of cordinates of the corners for the polygon, pointX & pointY
are x and y of the point*/
function insidePolygon(corners, pointX, pointY) {

  let numOfIntersections = 0;
  //length is one greater than the last index, so subtract one.
  //there is one more corner than edges so subract one more from length
  for (let i = 0; i <corners.length-2 i++){

  }

  if (numOfIntersections % 2 == 0 && numOfIntersections != 0){

    return true;
  } else {
    return false;
  }

}

//returns true if there is an intersection and false if there is not one
function lineSegmentIntersect(x1,y1,x2,y2,a1,b2,a2,b2) {}
