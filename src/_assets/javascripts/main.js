//= require vendor/modernizr-2.8.3.min.js
//= require jquery
//= require bootstrap-sprockets
//= require jquery.localScroll/jquery.localScroll.min.js
//= require jquery.scrollTo/jquery.scrollTo.min.js
//= require chartist/dist/chartist.min.js
//= require chartist-plugin-fill-donut/dist/chartist-plugin-fill-donut.min.js
//= require waypoints/lib/jquery.waypoints.min.js
//= require waypoints/lib/shortcuts/inview.min.js
//= require mixitup/build/jquery.mixitup.min.js
//= require vendor/jquery.mixitup-pagination.min.js
//= require _plugins
//= require _solutions
//= require _charts




$(document).on('ready', function() {
  //initiate localscroll
  $.localScroll();

  
  // RESPONSIVE MENU
  $('.menu-toggle').on('click', function(e) {
    e.stopPropagation();
    $("#page-header").toggleClass('open-menu');
  });
  // $("body").on('click', function() {
  //   if ($("#page-header").hasClass('open-menu')) {
  //     $("#page-header").removeClass("open-menu");
  //   }
  // });

  // TOPNAV SEARCH
  $( "#search-form").on('click', function () {
    $(this).addClass('active');
    $submit = $(this).find('input[type="submit"]');
  });
  $('input.keyterms').on('keyup', function(){
    window.console.log($(this).val());
      if($(this).val().length !=0) {
        $submit.attr('disabled', false);
      } else {
        $submit.attr('disabled',true);
      }
  });

  // solution_data.sort.forEach(function(sort) {
  //   $tab = $($.parseHTML("<li class='tab sort'></li>"));
  //   $tab.attr('data-sort', sort.slug).text(sort.title).appendTo(".tabs");
  // })

  $('.sort').on('click', function() {
    $(this).trigger('sort-cards');
    // This might need to be moved to the sort-cards listener
    $(this).addClass('active').siblings().removeClass('active');
    // Change the summary statement if present?

    // chart.update(getData(filter));
  });

});

jQuery(document).ready(function($) {
  // Control animation on scroll event
  $('.scroll-animate').each(function() {
    var inview = new Waypoint.Inview({
      element: $(this)[0],
      enter: function(direction) {
        $(this.element).addClass('animated ' + $(this.element).data('animation'));
        window.console.log('Enter triggered with direction ' + direction);
        window.console.log($(this.element).attr('class'));
      },
      entered: function(direction) {
        window.console.log('Entered triggered with direction ' + direction)
      },
      exit: function(direction) {
        $(this.element).removeClass('animated ' + $(this.element).data('animation'));
        window.console.log('Exit triggered with direction ' + direction);
        window.console.log($(this.element).attr('class'));
      },
      exited: function(direction) {
        window.console.log('Exited triggered with direction ' + direction)
      }
    })
  });
});