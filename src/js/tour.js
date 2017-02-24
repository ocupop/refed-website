/* Copyright (C) 2017 Ocupop
 * 
 * http://www.ocupop.com
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see
 * http://www.gnu.org/licenses/agpl-3.0.html.
 */
(function() {

$.behaviors('.start-tour', start_tour);

  function start_tour(container) {
    container = $(container);

    var tour_backdrop = $('.tour-backdrop');
    // Instance the tour
    var tour = new Tour({
      // name: "Site Tour",
      // container: "body",
      // keyboard: true,
      // storage: window.localStorage,
      // debug: false,
      // backdrop: true,
      // backdropContainer: 'body',
      // backdropPadding: 0,
      // redirect: true,
      // orphan: false,
      // duration: false,
      // delay: false,
      // basePath: "",
      steps: [
      // {
      //   element: "#foodwaste-link",
      //   content: "Explore the food waste issue and how it impacts our environment and communities.",
      //   placement: 'bottom'
      // },
      {
        element: "#analysis-link",
        content: "Data which uncovers the cost effective solutions and their benefits for businesses and consumers.",
        placement: 'bottom'
      },
      {
        element: "#solutions-link",
        content: "All 27 solutions to reduce, recover & recycle food waste",
        placement: 'bottom'
      },
      {
        element: "#stakeholders-link",
        content: "Discover your role in making a change",
        placement: 'bottom'
      },
      {
        element: "#action-link",
        content: "The levers needed to scale impact nationally",
        placement: 'bottom'
      },
      {
        element: "#download-link",
        content: "Download the full report, or the chapters that interest you.",
        placement: 'bottom'
      },
      {
        element: "#about-link",
        content: "Learn who we are, and who we work with",
        placement: 'bottom'
      },
      {
        element: "#resources-link",
        content: "Downloads, links, and the tools you need to get started",
        placement: 'bottom'
      }],
      backdrop: true,
      template: `<div class='popover tour'>
                  <div class='arrow'></div>
                  <button class='close' data-role='end'><span aria-hidden='true'>&times;</span></button>
                  <div class='popover-content'></div>
                  <div class='popover-navigation'>
                    <button data-role='prev'>&lt;&nbsp;Prev</button>
                    <button data-role='next'>Next&nbsp;&gt;</button>
                  </div>
                  <button class='end hide' data-role='end'>End tour</button>
                </div>`
    });


    container.on('click', function() {
      $('#downloadDialog').modal('hide');
      $('#pageHeader').addClass('open-menu');
      //window.console.log("tour.js:", 'start tour clicked');
      // Initialize the tour
      tour.init(true);

      // Start the tour
      tour.goTo(0);

    });
    tour_backdrop.on('click', function() {
      alert('clicked');
      // tour.end();
    });
  }

})();

// TODO - Refactor to match behaviors pattern
// jQuery(document).ready(function($) {

//   // var tour = new Tour({
//   //   name: "tour",
//   //   steps: [],
//   //   container: "body",
//   //   keyboard: true,
//   //   storage: window.localStorage,
//   //   debug: false,
//   //   backdrop: false,
//   //   backdropContainer: 'body',
//   //   backdropPadding: 0,
//   //   redirect: true,
//   //   orphan: false,
//   //   duration: false,
//   //   delay: false,
//   //   basePath: "",
//   //   template: "<div class='popover tour'>
//   //     <div class='arrow'></div>
//   //     <h3 class='popover-title'></h3>
//   //     <div class='popover-content'></div>
//   //     <div class='popover-navigation'>
//   //         <button class='btn btn-default' data-role='prev'>« Prev</button>
//   //         <span data-role='separator'>|</span>
//   //         <button class='btn btn-default' data-role='next'>Next »</button>
//   //     </div>
//   //     <button class='btn btn-default' data-role='end'>End tour</button>
//   //     </nav>
//   //   </div>",
//   //   afterGetState: function (key, value) {},
//   //   afterSetState: function (key, value) {},
//   //   afterRemoveState: function (key, value) {},
//   //   onStart: function (tour) {},
//   //   onEnd: function (tour) {},
//   //   onShow: function (tour) {},
//   //   onShown: function (tour) {},
//   //   onHide: function (tour) {},
//   //   onHidden: function (tour) {},
//   //   onNext: function (tour) {},
//   //   onPrev: function (tour) {},
//   //   onPause: function (tour, duration) {},
//   //   onResume: function (tour, duration) {},
//   //   onRedirectError: function (tour) {}
//   // });


//   // Instance the tour
//   var tour = new Tour({
//     // name: "Site Tour",
//     // container: "body",
//     // keyboard: true,
//     // storage: window.localStorage,
//     // debug: false,
//     // backdrop: true,
//     // backdropContainer: 'body',
//     // backdropPadding: 0,
//     // redirect: true,
//     // orphan: false,
//     // duration: false,
//     // delay: false,
//     // basePath: "",
//     steps: [
//     // {
//     //   element: "#foodwaste-link",
//     //   content: "Explore the food waste issue and how it impacts our environment and communities.",
//     //   placement: 'bottom'
//     // },
//     {
//       element: "#analysis-link",
//       content: "Data which uncovers the cost effective solutions and their benefits for businesses and consumers.",
//       placement: 'bottom'
//     },
//     {
//       element: "#solutions-link",
//       content: "All 27 solutions to reduce, recover & recycle food waste",
//       placement: 'bottom'
//     },
//     {
//       element: "#stakeholders-link",
//       content: "Discover your role in making a change",
//       placement: 'bottom'
//     },
//     {
//       element: "#action-link",
//       content: "The levers needed to scale impact nationally",
//       placement: 'bottom'
//     },
//     {
//       element: "#download-link",
//       content: "Download the full report, or the chapters that interest you.",
//       placement: 'bottom'
//     },
//     {
//       element: "#about-link",
//       content: "Learn who we are, and who we work with",
//       placement: 'bottom'
//     },
//     {
//       element: "#resources-link",
//       content: "Downloads, links, and the tools you need to get started",
//       placement: 'bottom'
//     }],
//     backdrop: true,
//     template: `<div class='popover tour'>
//                 <div class='arrow'></div>
//                 <button class='close' data-role='end'><span aria-hidden='true'>&times;</span></button>
//                 <div class='popover-content'></div>
//                 <div class='popover-navigation'>
//                   <button data-role='prev'>&lt;&nbsp;Prev</button>
//                   <button data-role='next'>Next&nbsp;&gt;</button>
//                 </div>
//                 <button class='end hide' data-role='end'>End tour</button>
//               </div>`
//   });


//   $('.start-tour').on('click', function() {
//     $('#downloadDialog').modal('hide');
//     $('#pageHeader').addClass('open-menu');
//     window.console.log("tour.js:", 'start tour clicked');
//     // Initialize the tour
//     tour.init(true);

//     // Start the tour
//     tour.goTo(0);

//   });
//   $(".tour-backdrop").on('click', function() {
//     alert('clicked');
//     // tour.end();
//   });
// });