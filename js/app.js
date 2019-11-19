'use strict';
//global variables
var firstImgElem = document.getElementById('firstImg');
var secImgElem = document.getElementById('secImg');
var thirdImgElem = document.getElementById('thirdImg');
var firstNameElem = document.getElementById('firstImgName');
var secNameElem = document.getElementById('secImgName');
var thirdNameElem = document.getElementById('thirdImgName');
var imgChoice = document.getElementById('image-choices');
var imgElem = [];
imgElem.push(firstImgElem, secImgElem, thirdImgElem);
var imgNameElem = [];
imgNameElem.push(firstNameElem, secNameElem, thirdNameElem);
// console.log('imgElem :', imgElem);
var imgGenerator = [];
var randomArr = [];

//contructor
function Selectproduct(name, imgURL) {
  this.name = name;
  this.imgURL = imgURL;
  this.clickCtr = 0;
  this.shownCtr = 0;

  Selectproduct.all.push(this);
}

//add to contructor
Selectproduct.all = [];
new Selectproduct('bag', 'img/bag.jpg');
new Selectproduct('banana', 'img/banana.jpg');
new Selectproduct('bathroom', 'img/bathroom.jpg');
new Selectproduct('boots', 'img/boots.jpg');
new Selectproduct('breakfast', 'img/breakfast.jpg');
new Selectproduct('bubblegum', 'img/bubblegum.jpg');
new Selectproduct('chair', 'img/chair.jpg');
new Selectproduct('cthulhu', 'img/cthulhu.jpg');
new Selectproduct('dog-duck', 'img/dog-duck.jpg');
new Selectproduct('dragon', 'img/dragon.jpg');
new Selectproduct('pen', 'img/pen.jpg');
new Selectproduct('pet-sweep', 'img/pet-sweep.jpg');
new Selectproduct('scissors', 'img/scissors.jpg');
new Selectproduct('shark', 'img/shark.jpg');
new Selectproduct('sweep', 'img/sweep.png');
new Selectproduct('tauntaun', 'img/tauntaun.jpg');
new Selectproduct('unicorn', 'img/unicorn.jpg');
new Selectproduct('usb', 'img/usb.gif');
new Selectproduct('water-can', 'img/water-can.jpg');
new Selectproduct('wine-glass', 'img/wine-glass.jpg');

//contructor properties for counter
Selectproduct.voteCTR = 0;
Selectproduct.maxVote = 25;



//funtion to create random images
// var randomImgGenerator = function (max) {
//   // var imgSelection = new Set();
//   var randomUniqueValue = [];
//   for (var i = 0; i < 3; i++) {
//     randomUniqueValue.push(Math.floor(Math.random() * max));
//     //console.log('randomUniqueValue :', randomUniqueValue);
//     if (randomUniqueValue[i] === randomUniqueValue[(i + 1)] || randomUniqueValue[i] === randomUniqueValue[(i - 1)]) {
//       randomUniqueValue.pop();
//       i -= 1;
//       //console.log('randomUniqueValue :', randomUniqueValue);
//     }
//     for (var j = 0; j < randomUniqueValue.length; j++) {
//       var imgLocation = ['firstImg', 'secImg', 'thirdImg'];
//       document.getElementById(imgLocation[j]).src = Selectproduct.all[randomUniqueValue[j]].imgURL;
//     }
//   }
//   console.log('randomUniqueValue :', randomUniqueValue);

// };

function shuffle(array) {
  var currentIndex = array.length, tempValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;

}

function getRandomImg() {
  if (randomArr.length === 0) {
    randomArr = shuffle(Selectproduct.all.slice());
  }
  var arrPop = randomArr.pop();
  // console.log('arrPop :', arrPop);
  return arrPop;
}

function generateImages() {
  for (var i = 0; i < 3; i++) {
    imgGenerator.push(getRandomImg());
    imgElem[i].src = imgGenerator[i].imgURL;
    imgNameElem[i].textContent = imgGenerator[i].name;
  }
}

function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  element.textContent = text;
  return element;
}
var resultList = document.getElementById('resultList');


function listCickResult() {
  var text = '';

  for (var i = 0; i < Selectproduct.all.length; i++) {
    text = `${Selectproduct.all[i].name} : ${Selectproduct.all[i].clickCtr} votes.`;
    addElement('li', resultList, text);
  }
}


imgChoice.addEventListener('click', clickHandler);


function clickHandler(event) {
  var id = event.target.id;
  console.log('id :', id);
  if (id === 'firstImg') {
    imgGenerator[0].clickCtr++;
    console.log('imgGenerator[0].clickCtr :', imgGenerator[0].clickCtr);
  } else if (id === 'secImg') {
    imgGenerator[1].clickCtr++;
    console.log('imgGenerator[1].clickCtr :', imgGenerator[1].clickCtr);
  } else if (id === 'thirdImg') {
    imgGenerator[2].clickCtr++;
    console.log('imgGenerator[2].clickCtr :', imgGenerator[2].clickCtr);
  }

  console.log('Selectproduct :', Selectproduct.all);
  // firstImgElem.src = '';
  // secImgElem.src = '';
  // thirdImgElem.src = '';
  Selectproduct.maxVote--;
  if (Selectproduct.maxVote >= 0) {
    imgGenerator = [];
    resultList.innerHTML = '';
    generateImages();
    listCickResult();
  } else {
    imgChoice.innerHTML.html = '';

  }



  // function votingResults() {

}
generateImages();
listCickResult();
console.log('Selectproduct :', Selectproduct.all);