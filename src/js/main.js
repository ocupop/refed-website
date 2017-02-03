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

  // Make all external links open in another window.
  $('a').each(function() {
     var a = new RegExp('/' + window.location.host + '/');
     if(!a.test(this.href)) {
       $(this).addClass('external');
       $(this).click(function(event) {
           event.preventDefault();
           event.stopPropagation();
           window.open(this.href, '_blank');
       });
     }
  });


});