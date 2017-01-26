$(document).on('ready', function() {
  $('#tooltip .close').on('click', function() {
    $('#tooltip').removeClass('active');
  });

  if(urlParams["thanks"]) {
    $("#thanks .lead").text(urlParams["thanks"]);
    $("#thanks").fadeIn(500);

    setTimeout(function() {
      $('#thanks').fadeOut('slow');
    }, 1500);
  }

  
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



