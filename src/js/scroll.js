//initiate localscroll
$.localScroll();

$.extend($.scrollTo.defaults, {
  axis: 'y',
  duration: 800,
  offset: {
    top: -100
  }
});

$(window).on('load', function (e){
  if (window.location.hash) {
    var h = window.location.hash.slice(0,-1) 
    window.console.log(h);
    $.scrollTo($(h));
  }
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
