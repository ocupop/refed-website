$(document).on('ready', function() {
  $('#tooltip .close').on('click', function() {
    $('#tooltip').removeClass('active');
  });

  if(urlParams["thanks"]) {
    $("#thanks .lead").text(urlParams["thanks"]);
    $("#thanks").fadeIn(500);

    setTimeout(function() {
      $("#thanks").fadeOut('slow');
    }, 3500);
  }

  $("#thanks .close").on('click', function(){
    $("#thanks").fadeOut('slow');
  });

  // TODO - Refactor into component
  // Make all external links open in another window.
  var editing = $('body').hasClass('cms-editor-active');
  // if(!editing) {
  //   $('a').each(function() {
  //      var a = new RegExp('/' + window.location.host + '/');
  //      var href = $(this).attr('href');
  //      var mail = href.indexOf("mailto") >= 0 ? true: false;

  //      window.console.log("main.js:", window.location.host, mail, href);
  //      if(!a.test(this.href) && !mail ) {
  //        $(this).addClass('external');
  //        $(this).click(function(event) {
  //            event.preventDefault();
  //            event.stopPropagation();
  //            window.open(this.href, '_blank');
  //        });
  //      }
  //   });
  // }

  // TODO - Refactor and add to tooltip.js
  $('[data-toggle="tooltip"]').tooltip();

});