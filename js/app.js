//global variables


//contructor
function Selectproduct(name, imgURL) {
  this.name = name;
  this.imgURL = imgURL;
  this.clickCtr = 0;
  this.shownCtr = 0;
}

//add to contructor
var products = [];
products.push(new Selectproduct('bag', 'img/bag.jpg'));
products.push(new Selectproduct('banana', 'img/banana.jpg'));
products.push(new Selectproduct('bathroom', 'img/bathroom.jpg'));
products.push(new Selectproduct('boots', 'img/boots.jpg'));
products.push(new Selectproduct('breakfast', 'img/breakfast.jpg'));
products.push(new Selectproduct('bubblegum', 'img/bubblegum.jpg'));
products.push(new Selectproduct('chair', 'img/chair.jpg'));
products.push(new Selectproduct('cthulhu', 'img/cthulhu.jpg'));
products.push(new Selectproduct('dog-duck', 'img/dog-duck.jpg'));
products.push(new Selectproduct('dragon', 'img/dragon.jpg'));
products.push(new Selectproduct('pen', 'img/pen.jpg'));
products.push(new Selectproduct('pet-sweep', 'img/pet-sweep.jpg'));
products.push(new Selectproduct('scissors', 'img/scissors.jpg'));
products.push(new Selectproduct('shark', 'img/shark.jpg'));
products.push(new Selectproduct('sweep', 'img/sweep.png'));
products.push(new Selectproduct('tauntaun', 'img/tauntaun.jpg'));
products.push(new Selectproduct('unicorn', 'img/unicorn.jpg'));
products.push(new Selectproduct('usb', 'img/usb.gif'));
products.push(new Selectproduct('water-can', 'img/water-can.jpg'));
products.push(new Selectproduct('wine-glass', 'img/wine-glass.jpg'));


console.log('products :', products);

//contructor properties for counter
Selectproduct.voteCTR = 0;
Selectproduct.maxVote = 25;



//funtion to create random images
var randomImgGenerator = function (max) {
  // var imgSelection = new Set();
  var randomUniqueValue = [];
  for (var i = 0; i < 3; i++) {
    randomUniqueValue.push(Math.floor(Math.random() * Math.floor(max)));
    //console.log('randomUniqueValue :', randomUniqueValue);
    if (randomUniqueValue[i] === randomUniqueValue[(i + 1)] || randomUniqueValue[i] === randomUniqueValue[(i - 1)]) {
      randomUniqueValue.pop();
      i -= 1;
      //console.log('randomUniqueValue :', randomUniqueValue);
    }
    for (var j = 0; j < randomUniqueValue.length; j++) {
      var imgLocation = ['firstImg', 'secImg', 'thirdImg'];
      document.getElementById(imgLocation[j]).src = products[randomUniqueValue[j]].imgURL;
    }
  }
  console.log('randomUniqueValue :', randomUniqueValue);

};
var firstImgElem = document.getElementById('firstImg');
var secImgElem = document.getElementById('secImg');
var thirdImgElem = document.getElementById('thirdImg');

firstImgElem.addEventListener('click', clickHandler);
secImgElem.addEventListener('click', clickHandler);
thirdImgElem.addEventListener('click', clickHandler);

function clickHandler(event){
  var id = event.target.id;

  // if (id == ''
}


randomImgGenerator(products.length);


