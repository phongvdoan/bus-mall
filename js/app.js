'use strict';
//global variables
var firstImgElem = document.getElementById('firstImg');
var secImgElem = document.getElementById('secImg');
var thirdImgElem = document.getElementById('thirdImg');
var firstNameElem = document.getElementById('firstImgName');
var secNameElem = document.getElementById('secImgName');
var thirdNameElem = document.getElementById('thirdImgName');
var imgChoice = document.getElementById('image-choices');
var imgElem = [firstImgElem, secImgElem, thirdImgElem];
var imgNameElem = [firstNameElem, secNameElem, thirdNameElem];
var imgGenerator = [];
var randomArr = [];
//contructor
function Selectproduct(name, imgURL, clickCtr = 0, shownCtr = 0) {
  this.name = name;
  this.imgURL = imgURL;
  this.clickCtr = clickCtr;
  this.shownCtr = shownCtr;

  Selectproduct.all.push(this);
}

//Properties of Selectproduct constructor
Selectproduct.all = [];
//contructor properties for counter
Selectproduct.voteCTR = 0;
Selectproduct.maxVote = 25;

//Renders App
function startApp() {
  console.log('localStorage.getItem(\'productStats\') :', localStorage.getItem('productStats'));
  // eslint-disable-next-line valid-typeof
  if (localStorage.getItem('productStats') === null) {
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

    generateImages();
  } else {
    var pulledData = JSON.parse(localStorage.productStats);
    for ( var i = 0; i < pulledData.length; i++){
      new Selectproduct(pulledData[i].name, pulledData[i].imgURL, pulledData[i].clickCtr, pulledData[i].shownCtr);
    }
    endResults();
  }
}
//check for previous localStorage for data
function saveStatsToLocalStorage(data) {
  var productStats = [];
  for (var i = 0; i < data.length; i++) {
    productStats.push(data[i]);
  }
  localStorage.productStats = JSON.stringify(productStats);
}
//Shuffles an array
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
//Gets last index in a shuffled copied array
function getLastIndex() {
  if (randomArr.length === 0) {
    randomArr = shuffle(Selectproduct.all.slice());
  }
  var arrPop = randomArr.pop();
  return arrPop;
}
//takes the last three indexes from shuffled arrray and generating images
function generateImages() {
  for (var i = 0; i < 3; i++) {
    imgGenerator.push(getLastIndex());
    imgElem[i].src = imgGenerator[i].imgURL;
    imgNameElem[i].textContent = imgGenerator[i].name;
    imgGenerator[i].shownCtr++;
  }
}
//
function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  element.textContent = text;
  return element;
}
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
  Selectproduct.maxVote--;
  if (Selectproduct.maxVote >= 0) {
    imgGenerator = [];
    generateImages();
    console.log('randomArr :', randomArr);
  } else {
    saveStatsToLocalStorage(Selectproduct.all);
    endResults();

  }

}

function endResults() {
  firstImgElem.removeEventListener('click', clickHandler);
  secImgElem.removeEventListener('click', clickHandler);
  thirdImgElem.removeEventListener('click', clickHandler);
  barChartResults();
}

function barChartResults() {
  imgChoice.innerHTML = '';

  var productName = [];
  var productVoteTotal = [];
  var productShownTotal = [];

  for (var i = 0; i < Selectproduct.all.length; i++) {
    var singleProductName = Selectproduct.all[i].name;
    productName.push(singleProductName);
    var singleProductVoteTotal = Selectproduct.all[i].clickCtr;
    productVoteTotal.push(singleProductVoteTotal);
    var singleProductShownTotal = Selectproduct.all[i].shownCtr;
    productShownTotal.push(singleProductShownTotal);

  }

  var barChart = addElement('CANVAS', imgChoice);
  barChart.setAttribute('id', 'productChart');


  var ctx = document.getElementById('productChart').getContext('2d');
  // eslint-disable-next-line no-undef, no-unused-vars
  var productChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: 'Votes',
        backgroundColor: 'orange',
        data: productVoteTotal
      },
      {
        label: 'Times Shown',
        backgroundColor: 'blue',
        data: productShownTotal
      }]
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      responsive: false,
      layout: {
        width: 800
      }
    }
  });
}

startApp();
firstImgElem.addEventListener('click', clickHandler);
secImgElem.addEventListener('click', clickHandler);
thirdImgElem.addEventListener('click', clickHandler);

