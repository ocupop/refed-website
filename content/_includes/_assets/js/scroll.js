
// When a user scrolls to 50px add class  condensed-header to body
$(window).scroll(function(){
  var currentScreenPosition  = $(document).scrollTop();

  if(currentScreenPosition > 50) {
    $('body').addClass('condensed-header');
  } else {
    $('body').removeClass('condensed-header');
  }
});

(function() {

  window.pageScroll = function(target, offset) {
    window.console.log(target);
    target = $(target);
    offset = offset || 0;

    $('html, body').animate({
      scrollTop: target.offset().top - offset
    }, 800);

    return false;
  }

})();