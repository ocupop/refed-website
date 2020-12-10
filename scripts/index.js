import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './HelloWorld'
import KeyIndicators from './KeyIndicators'
import TopSolutions from './stakeholders/TopSolutions'
import ModeledSolutions from './stakeholders/ModeledSolutions'
import SolutionGroup from './stakeholders/SolutionGroup'
import Test from './Test'
import CategorySolutions from './CategorySolutions'
// import Causes from './stakeholders/Causes'

import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { InsightsEngineProvider } from './context'


gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const COMPONENTS = {
  HelloWorld,
  KeyIndicators,
  TopSolutions,
  ModeledSolutions,
  SolutionGroup,
  Test,
  CategorySolutions,
  // Causes,
}

// function renderAppInElement(el) {
//   const Component = COMPONENTS[el.dataset.component]
//   if (!Component) return
//   // get props from elements data attribute, like the post_id
//   const props = Object.assign({}, el.dataset);
//   ReactDOM.render(<InsightsEngineProvider><Component {...props} /></InsightsEngineProvider>, el);
// }

// document
//   .querySelectorAll('.__react-app')
//   .forEach(renderAppInElement)

const portals = []

function buildPortal(el) {
  var Component = COMPONENTS[el.dataset.component]
  if (!Component) return
  // get props from elements data attribute, like the post_id
  const props = Object.assign({}, el.dataset)
  return ReactDOM.createPortal(<Component {...props} />, el)
}


document
  .querySelectorAll('.__react-component')
  .forEach((el) => {
    const portal = buildPortal(el)
    portals.push(portal)
  })

const Main = () => (
  <InsightsEngineProvider>
    {portals.map(portal => portal)}
  </InsightsEngineProvider>
)

ReactDOM.render(<Main />, document.getElementById("main"))

$('#subnav-toggle').on('click', function () {
  $('#subnav').toggleClass('show-links');
})

$('#subnav .nav-link').on('click', function () {
  $('#subnav').removeClass('show-links')
})

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




