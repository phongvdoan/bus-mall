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
var imgNameElem = [];
var imgGenerator = [];
var randomArr = [];

// initialize image and image name arrays
imgElem.push(firstImgElem, secImgElem, thirdImgElem);
imgNameElem.push(firstNameElem, secNameElem, thirdNameElem);

// handle clicks
firstImgElem.addEventListener('click', clickHandler);
secImgElem.addEventListener('click', clickHandler);
thirdImgElem.addEventListener('click', clickHandler);



//contructor
function Product(name, imgURL) {
  this.name = name;
  this.imgURL = imgURL;
  this.clickCtr = 0;
  this.shownCtr = 0;

  Product.all.push(this);
}

//contructor properties
Product.voteCtr = 0;
Product.maxVote = 25;
Product.all = [];

// create a bunch of Products, will add to Product.all
function generateProducts() {
  new Product('bag', 'img/bag.jpg');
  new Product('banana', 'img/banana.jpg');
  new Product('bathroom', 'img/bathroom.jpg');
  new Product('boots', 'img/boots.jpg');
  new Product('breakfast', 'img/breakfast.jpg');
  new Product('bubblegum', 'img/bubblegum.jpg');
  new Product('chair', 'img/chair.jpg');
  new Product('cthulhu', 'img/cthulhu.jpg');
  new Product('dog-duck', 'img/dog-duck.jpg');
  new Product('dragon', 'img/dragon.jpg');
  new Product('pen', 'img/pen.jpg');
  new Product('pet-sweep', 'img/pet-sweep.jpg');
  new Product('scissors', 'img/scissors.jpg');
  new Product('shark', 'img/shark.jpg');
  new Product('sweep', 'img/sweep.png');
  new Product('tauntaun', 'img/tauntaun.jpg');
  new Product('unicorn', 'img/unicorn.jpg');
  new Product('usb', 'img/usb.gif');
  new Product('water-can', 'img/water-can.jpg');
  new Product('wine-glass', 'img/wine-glass.jpg');
}

function saveStatsToLocalStorage(data) {
  localStorage.productStats = JSON.stringify(data);
}

// make sure to attribute if you got this from somehwere else
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
    randomArr = shuffle(Product.all.slice());
  }
  return randomArr.pop();
}

function generateImages() {
  for (var i = 0; i < 3; i++) {
    var img = getRandomImg();
    imgElem[i].src = img.imgURL;
    imgNameElem[i].textContent = img.name;
    img.shownCtr++;
    imgGenerator.push(img);
  }
}

function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  element.textContent = text;
  return element;
}

function clickHandler(event) {

  var id = event.target.id;

  var img = null;

  if (id === 'firstImg') {
    img = imgGenerator[0];
  } else if (id === 'secImg') {
    img = imgGenerator[1];
  } else if (id === 'thirdImg') {
    img = imgGenerator[2];
  }

  if (img) {
    img.clickCtr++;

    Product.maxVote--;

    if (Product.maxVote >= 0) {
      imgGenerator = [];
      generateImages();
    } else {
      saveStatsToLocalStorage(Product.all);
      endResults();

    }
  } else {
    console.log('user did not click on known image', id);
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

  for (var i = 0; i < Product.all.length; i++) {
    var singleProductName = Product.all[i].name;
    productName.push(singleProductName);
    var singleProductVoteTotal = Product.all[i].clickCtr;
    productVoteTotal.push(singleProductVoteTotal);
    var singleProductShownTotal = Product.all[i].shownCtr;
    productShownTotal.push(singleProductShownTotal);

  }

  var barChart = addElement('CANVAS', imgChoice);
  barChart.setAttribute('id', 'productChart');


  var ctx = document.getElementById('productChart').getContext('2d');
  // eslint-disable-next-line no-undef, no-unused-vars
  var productChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
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
      layout: {
        width: 800
      }
    }
  });
}
///////////////////////////
// entry point ////////////
///////////////////////////
if (localStorage.getItem('productStats') === null) {
  generateProducts();
  generateImages();
} else {
  Product.all = JSON.parse(localStorage.productStats);
  endResults();
}
