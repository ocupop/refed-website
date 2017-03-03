//initiate localscroll
$.localScroll();

$.extend($.scrollTo.defaults, {
  axis: 'y',
  duration: 800,
  offset: {
    top: -130
  }
});

// $(window).on('load', function (e){
//   if (window.location.hash) {
//     var h = window.location.hash.slice(0,-1) 
//     // window.console.log("scroll.js:", h);
//     $.scrollTo($(h));
//   }
// });

// When a user scrolls to 50px add class  condensed-header to body
$(window).scroll(function(){
  var currentScreenPosition  = $(document).scrollTop();

  if(currentScreenPosition > 50) {
    $('body').addClass('condensed-header');
  } else {
    $('body').removeClass('condensed-header');
  }
});



// $(document).on('ready', function() {
//   // scrolling behavior on policy tool content nav
//   $('.contentnav a').on('click', function(){
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//        var target = $(this.hash);
//        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//        if (target.length) {
//          $('html, body').animate({
//            scrollTop: target.offset().top - 105
//          }, 1000);
//          return false;
//        }
//     }
//   });


// });


// function pageScroll(target, offset) 

window.pageScroll = function(target, offset) {
  target = $(target);
  offset = offset || 0;

  $('html, body').animate({
    scrollTop: target.offset().top - offset
  }, 800);
  return false;
}