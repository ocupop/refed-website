jQuery(document).ready(function($) {

  // var tour = new Tour({
  //   name: "tour",
  //   steps: [],
  //   container: "body",
  //   keyboard: true,
  //   storage: window.localStorage,
  //   debug: false,
  //   backdrop: false,
  //   backdropContainer: 'body',
  //   backdropPadding: 0,
  //   redirect: true,
  //   orphan: false,
  //   duration: false,
  //   delay: false,
  //   basePath: "",
  //   template: "<div class='popover tour'>
  //     <div class='arrow'></div>
  //     <h3 class='popover-title'></h3>
  //     <div class='popover-content'></div>
  //     <div class='popover-navigation'>
  //         <button class='btn btn-default' data-role='prev'>« Prev</button>
  //         <span data-role='separator'>|</span>
  //         <button class='btn btn-default' data-role='next'>Next »</button>
  //     </div>
  //     <button class='btn btn-default' data-role='end'>End tour</button>
  //     </nav>
  //   </div>",
  //   afterGetState: function (key, value) {},
  //   afterSetState: function (key, value) {},
  //   afterRemoveState: function (key, value) {},
  //   onStart: function (tour) {},
  //   onEnd: function (tour) {},
  //   onShow: function (tour) {},
  //   onShown: function (tour) {},
  //   onHide: function (tour) {},
  //   onHidden: function (tour) {},
  //   onNext: function (tour) {},
  //   onPrev: function (tour) {},
  //   onPause: function (tour, duration) {},
  //   onResume: function (tour, duration) {},
  //   onRedirectError: function (tour) {}
  // });


  // Instance the tour
  var tour = new Tour({
    steps: [
    {
      element: "#foodwaste-link",
      content: "Explore the food waste issue and how it impacts our environment and communities.",
      placement: 'bottom'
    },
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
    template: "<div class='popover tour'>
                <div class='arrow'></div>
                <button class='close' data-role='end'><span aria-hidden='true'>&times;</span></button>
                <div class='popover-content'></div>
                <div class='popover-navigation'>
                  <button class='btn btn-default' data-role='prev'>&lt;&nbsp;Prev</button>
                  <button class='btn btn-default' data-role='next'>Next&nbsp;&gt;</button>
                </div>
              </div>"
  });


  $('.start-ride').on('click', function() {
    $('#downloadDialog').modal('hide');

    // Initialize the tour
    tour.init(true);

    // Start the tour
    tour.start(true);

  });

});