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

//subnav toggle
var element =  document.getElementById('subnav-toggle');
if (typeof(element) != 'undefined' && element != null)
{
  document.getElementById("subnav-toggle").addEventListener("click", toggleSubnav);
}

function toggleSubnav() {
  var element = document.getElementById("subnav");
  element.classList.toggle("show-links");
}

//subnav scroll trigger
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




