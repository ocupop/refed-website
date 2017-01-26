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

});



