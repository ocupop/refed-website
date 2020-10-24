import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './HelloWorld'
import StakeholdersList from './StakeholdersList'
import SolutionDetail from './SolutionDetail'

const COMPONENTS = {
  HelloWorld,
  StakeholdersList,
  SolutionDetail
}

function renderComponentInElement(el) {
  var Component = COMPONENTS[el.dataset.component];
  if (!Component) return;
  // get props from elements data attribute, like the post_id
  const props = Object.assign({}, el.dataset);
  ReactDOM.render(<Component {...props} />, el);
}

document
  .querySelectorAll('.__react-component')
  .forEach(renderComponentInElement)

// Navbar collapse sub-menu
var matches = document.querySelectorAll('.nav-back-button');
if(matches){
  matches.forEach(function(btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      var closestparent = btn.closest('.dropdown-menu');
      element.classList.remove('show');
    });
  });
}


/* STICK TO TOP OF SCREEN WHEN SCROLLING PAST */

var controller = new ScrollMagic.Controller();
var scene = new ScrollMagic.Scene({
    triggerElement: "#sticky-nav",
    triggerHook: 0, // 0=top, 0.5=middle, 1=bottom
  })
    .setPin("#sticky-nav")
    //.addIndicators({name: "2 (duration: 0)"}) // add indicators (requires plugin)
    .addTo(controller);



/* CAROUSELS */
/* HOMEPAGE - NEWS CAROUSEL UNDER THE HERO */
var elem = document.querySelector('.homepage-newsfeed .news-carousel');
if(elem){
  var flkty_featurednews = new Flickity( elem, {
    prevNextButtons: true,
    pageDots: false,
    "wrapAround": true,
    cellAlign: 'left'
  });
}

/* Full page width carousel (Home page "The multi-billion dollar food waste problem") */
// var elems = document.querySelectorAll('.carousel-full-width');
// if(elems){
//   elems.forEach(function(elem) {
//     var flkty_slide = new Flickity( elem, {
//     prevNextButtons: false,
//     pageDots: true,
//     "wrapAround": true,
//     cellAlign: 'left',
//     adaptiveHeight: false
//   });
// });
// }




/* 3 cards at a time (Home page "What can I do to solve food waste") */
// var elem = document.querySelector('.three-card-carousel');
// if(elem){
//   var flkty_three_card = new Flickity( elem, {
//   cellAlign: 'left',
//   contain: true,
//   "wrapAround": true,
//   prevNextButtons: true,
//   pageDots: true,
//   adaptiveHeight: false
// });
// }

/* This adds a class of "flickity-resize" to carousels after they have initialized */
Flickity.prototype._createResizeClass = function() {
var that = this;
setTimeout(function(){ 
  that.element.classList.add('flickity-resize');
  }, 1000);
};

Flickity.createMethods.push('_createResizeClass');

var resize = Flickity.prototype.resize;
Flickity.prototype.resize = function() {
  this.element.classList.remove('flickity-resize');
  resize.call( this );
  this.element.classList.add('flickity-resize');
};


/* Testimonials (Multiple Pages) */
// var elem = document.querySelector('.carousel-testimonials');
// if(elem){
//   var flkty_testimonials = new Flickity( elem, {
//   cellAlign: 'left',
//   contain: true,
//   "wrapAround": true,
//   prevNextButtons: true,
//   pageDots: true,
//   adaptiveHeight: true
// });
// }

/* Carousels - no dots by default */
var carousel = document.querySelectorAll('.carousel-refed');
if(carousel){
  carousel.forEach(function(carousel){
    var flkty_logos = new Flickity( carousel, {
    contain: true,
    cellAlign: 'left',
    "wrapAround": true,
    prevNextButtons: true,
    pageDots: false,
    adaptiveHeight: false
    })
  });
}

/* Carousels - with dots */
var carousel_with_dots = document.querySelectorAll('.carousel-refed-dots');
if(carousel_with_dots){
  carousel_with_dots.forEach(function(carousel_with_dots){
    var flkty_logos = new Flickity( carousel_with_dots, {
    contain: true,
    cellAlign: 'left',
    "wrapAround": true,
    prevNextButtons: true,
    pageDots: true,
    adaptiveHeight: false
    })
  });
}


/*
var elem = document.querySelector('.featured-story-carousel');
if(elem){
var flkty_featuredstory = new Flickity( elem, {
cellAlign: 'center',
prevNextButtons: false,
pageDots: true,
"wrapAround": true,
contain: true,
});
}

var elem = document.querySelector('.hero-style-carousel');
if(elem){
var flkty_hero = new Flickity( elem, {
cellAlign: 'center',
prevNextButtons: true,
pageDots: false,
"wrapAround": true,
contain: true,
});
}
*/




/* BEGIN filterable list */
var filtered_list = document.querySelectorAll('.list-with-filter'); // for each dropdown on the page
if(filtered_list){
  filtered_list.forEach(function(section) {
  init_dropdown(section);
  init_filter_buttons(section);
  });
}

function init_dropdown(section){
var dropdown = section.querySelector('.dropdown');
var options = dropdown.querySelectorAll('.dropdown-item');
if(options){
  options.forEach(function(btn) { // for each option in this dropdown
    dropdown.querySelector('.dropdown-select').textContent = options[0].textContent;
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      var value = btn.getAttribute("data-value");
      var list = section.querySelector('.filterable-list');

      filterList(section,value);
    }); 
  });
  }
}


function init_filter_buttons(section){
/* add event listeners to the CASE STUDIES category pill (on the "our Impact" page) */
var pills = section.querySelectorAll('.case-study-filter');
if(pills){
pills.forEach(function(pill) { // for each option in this dropdown
  pill.style.cursor = 'pointer';
  pill.addEventListener("click", (e) => {
    e.preventDefault();
    var filter = pill.getAttribute("data-filter");
    var elem = pill.closest('.horizontal-carousel-arrows-only');
    filterList(section,filter);

  }); 
}); 
}
}





function filterList(section,filter){
console.log("FILTER = "+filter)
var dropdown = section.querySelector('.dropdown');
var list = section.querySelector('.filterable-list');

// SHOW/HIDE lements based on which filter is selected.
var listitems = list.querySelectorAll('.filterable-list-item');
for (var i=0; i < listitems.length; i++) {
listitems[i].style.display = '';
}
if(filter !== 'all'){
  var listitems = list.querySelectorAll('.card:not(.'+filter+')');  
  for (var i=0; i < listitems.length; i++) {
      listitems[i].style.display = 'none';
  }
}


// change the value of the dropdown menu as well.  
var options = dropdown.querySelectorAll('.dropdown-item');
for (var i=0; i < options.length; i++) {
  var label = 'Select';
  if(options[i].getAttribute('data-value') == filter){
    var label = options[i].textContent;
    break;
  }
}  
dropdown.querySelector('.dropdown-select').textContent = label;
var flkty = Flickity.data( list )
flkty.resize(); // TODO: this should be variable.
}

/* END filterable list */


var btns = document.querySelectorAll('.toggle-newsletter-modal');
if(btns){
btns.forEach(function(btn) { // for each option in this dropdown
  btn.style.cursor = 'pointer';
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    var body = document.getElementsByTagName("BODY")[0]
    body.classList.toggle("modal-open");
  }); 
}); 
}
