//global variables


//contructor
function Selectproduct(name, imgURL) {
  this.name = name;
  this.imgURL = imgURL;
  this.clickCtr = clickCtr;
  this.shownCtr = shownCtr;
}

//contructor properties for counter
Selectproduct.voteCTR = 0;
Selectproduct.maxVote = 25;


//funtion to create random images
