import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './HelloWorld'
import ActionAreaSolutions from './ActionAreaSolutions'
// import Causes from './stakeholders/Causes'

import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const COMPONENTS = {
  HelloWorld,
  ActionAreaSolutions,
  // Causes,
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

var headerHeight = document.getElementById('pageHeader').getBoundingClientRect().height;

console.log(headerHeight)


function toggleSubnav() {
  var element = document.getElementById("subnav");
  element.classList.toggle("show-links");
}

document.getElementById("subnav-toggle").addEventListener("click", toggleSubnav);


ScrollTrigger.create({
  trigger: ".subnav",
  // start: 'top +' + headerHeight,
  start: 'top +110',
  end: 99999,
  pin: true,
  pinSpacing: false,
  toggleClass: {
    className: 'fixed-top',
    targets: '.subnav'
  }
})



// Navbar collapse sub-menu
var matches = document.querySelectorAll('.nav-back-button');
if (matches) {
  matches.forEach(function (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      var closestparent = btn.closest('.dropdown-menu');
      element.classList.remove('show');
    });
  });
}


// /* BEGIN Sticky Sub-Navigation with ScrollMagick */
// var w = window.innerWidth;
// var controller;
// var size = w > 768 ? "big" : "small";
// //if (size === "big") {
// makeScrollMagic();
// //}

// function makeScrollMagic() {
//   controller = new ScrollMagic.Controller();
//   var scene = new ScrollMagic.Scene({
//     triggerElement: ".subnav",
//     triggerHook: 0, // 0=top, 0.5=middle, 1=bottom
//   })
//     .setClassToggle(".subnav", "fixed-top") // add class toggle
//     .setPin(".subnav", {
//       // spacerClass: "stickynav"
//     })
//     // .addIndicators()
//     // .addIndicators({name: "2 (duration: 0)"}) // add indicators (requires plugin)
//     .addTo(controller);
// }


/*
 THIS FUNCTION ALLOWED FOR SCROLLMAGICK ONLY TO ACTIVATE ON DESKTOP SIZES, NOT MOBILE.
NOTE: after writing this, I later discovered the "WatchCSS" option for flickity, which is a more elegant solution:
watchCSS
*/
/*
function sizeIt() {
  w = window.innerWidth;
  var newSize = w > 768 ? "big" : "small";
  if (newSize != size) {
    size = newSize;
    if (newSize === "small") {
      //console.log("The screen is now small");
      if(controller){
        controller.destroy(true);
        //console.log("ScrollMagic has been destroyed by aliens.");
      }
    } else {
      //console.log("The screen is now large - ScrollMagic is active.");
      makeScrollMagic();
    }
  }
}
window.addEventListener("resize", sizeIt);
*/
/* END Sticky Sub-Navigation with ScrollMagick */



// $('#articlesCarousel').carousel({
//   // interval: 20000
// })

$('.carousel-card .carousel-item').each(function () {
  var minPerSlide = 3;
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i = 0; i < minPerSlide; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }

    next.children(':first-child').clone().appendTo($(this));
  }
})

/* BEGIN filterable list */
var filtered_list = document.querySelectorAll('.list-with-filter'); // for each dropdown on the page
if (filtered_list) {
  filtered_list.forEach(function (section) {
    init_dropdown(section);
    init_filter_buttons(section);
  });
}

function init_dropdown(section) {
  var dropdown = section.querySelector('.dropdown');
  var options = dropdown.querySelectorAll('.dropdown-item');
  if (options) {
    options.forEach(function (btn) { // for each option in this dropdown
      dropdown.querySelector('.dropdown-select').textContent = options[0].textContent;
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        var value = btn.getAttribute("data-value");
        var list = section.querySelector('.filterable-list');

        filterList(section, value);
      });
    });
  }
}


// function init_filter_buttons(section) {
//   /* add event listeners to the CASE STUDIES category pill (on the "our Impact" page) */
//   var pills = section.querySelectorAll('.case-study-filter');
//   if (pills) {
//     pills.forEach(function (pill) { // for each option in this dropdown
//       pill.style.cursor = 'pointer';
//       pill.addEventListener("click", (e) => {
//         e.preventDefault();
//         var filter = pill.getAttribute("data-filter");
//         var elem = pill.closest('.horizontal-carousel-arrows-only');
//         filterList(section, filter);

//       });
//     });
//   }
// }

// function filterList(section, filter) {
//   console.log("FILTER = " + filter)
//   var dropdown = section.querySelector('.dropdown');
//   var list = section.querySelector('.filterable-list');

//   // SHOW/HIDE lements based on which filter is selected.
//   var listitems = list.querySelectorAll('.filterable-list-item');
//   for (var i = 0; i < listitems.length; i++) {
//     listitems[i].style.display = '';
//   }
//   if (filter !== 'all') {
//     var listitems = list.querySelectorAll('.card:not(.' + filter + ')');
//     for (var i = 0; i < listitems.length; i++) {
//       listitems[i].style.display = 'none';
//     }
//   }


//   // change the value of the dropdown menu as well.
//   var options = dropdown.querySelectorAll('.dropdown-item');
//   for (var i = 0; i < options.length; i++) {
//     var label = 'Select';
//     if (options[i].getAttribute('data-value') == filter) {
//       var label = options[i].textContent;
//       break;
//     }
//   }
//   dropdown.querySelector('.dropdown-select').textContent = label;
//   var flkty = Flickity.data(list)
//   flkty.resize(); // TODO: this should be variable.
// }

/* END filterable list */


var btns = document.querySelectorAll('.toggle-newsletter-modal');
if (btns) {
  btns.forEach(function (btn) { // for each option in this dropdown
    btn.style.cursor = 'pointer';
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      var body = document.getElementsByTagName("BODY")[0]
      body.classList.toggle("show-subscribe-form");
    });
  });
}

//generate ics file to download
$('.ics-download').on('click', function () {
  var cal_single = ics();
  var subject = $(this).data('subject');
  var description = $(this).data('description');
  var location = $(this).data('location');
  var event_begin = moment($(this).data('begin'), 'MM-DD-YYYY h:mm:ss a').format('YYYY/MM/DD HH:mm:ss');
  console.log($(this).data('begin'));
  var event_end = moment($(this).data('end'), 'MM-DD-YYYY h:mm:ss a').format('YYYY/MM/DD HH:mm:ss');
  console.log('moment', moment($(this).data('begin'), 'MM-DD-YYYY h:mm:ss a').format('YYYY/MM/DD HH:mm:ss'));
  console.log(subject, description, location, event_begin, event_end)
  // cal_single.addEvent('Best Day', 'This is the best day to demonstrate a single event.', 'New York', '11/12/1987', '11/12/1987');
  cal_single.addEvent(subject, description, location, event_begin, event_end);
  cal_single.download(subject)
})




