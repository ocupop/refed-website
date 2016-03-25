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
//= require vendor/jquery.cookie.js
//= require jquery-stickit/build/jquery.stickit.min.js
//= require bootstrap-tour/build/js/bootstrap-tour.min.js
//= require vendor/lunr.min.js

//= require _plugins
//= require _charts

//= require _tour
//= require _search


$(window).on('load', function (e){
  if (window.location.hash) {
    var h = window.location.hash.slice(0,-1) 
    window.console.log(h);
    $.scrollTo($(h));
  }
});


$(document).on('ready', function() {

  if(urlParams["thanks"]) {
    $("#thanks .lead").text(urlParams["thanks"]);
    $("#thanks").fadeIn(500);

    setTimeout(function() {
      $('#thanks').fadeOut('slow');
    }, 1500);
  }
  $(".sticky").stickit({
    // scope: StickScope.Parent,
    top: 50
  });

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
  $( "#site-search-form").on('click', function () {
    $(this).addClass('active');
    $submit = $(this).find('input[type="submit"]');
  });
  $('input.keyterms').on('keyup', function(){
    // window.console.log($(this).val());
    if($(this).val().length !=0) {
      $submit.attr('disabled', false);
    } else {
      $submit.attr('disabled',true);
    }
  });


  $("#supply-chain li").on('click', function() {
    var activeClass = $(this).attr('class');
    $("#supply-chain li").each(function() {
      if($(this).hasClass(activeClass)) {
        $(this).addClass('active').removeClass('inactive');
      } else {
        $(this).removeClass('active').addClass('inactive');
      }
    });
    $("#related-solutions").attr('class', $(this).attr('class')).fadeIn();
  });
  $("#supply-chain .close").on('click', function() {
    $('#related-solutions').fadeOut();
    $("#supply-chain li").removeClass('active inactive');
  });


});

// INITIATE ANIMATIONS ON SCROLL
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

// When a user scrolls to 50px add class  condensed-header to body
$(window).scroll(function(){
  var currentScreenPosition  = $(document).scrollTop();

  if(currentScreenPosition > 50) {
    $('body').addClass('condensed-header');
  } else {
    $('body').removeClass('condensed-header');
  }
});



