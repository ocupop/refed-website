//= require jquery
//= require bootstrap-sprockets
//= require chartist/dist/chartist.min.js
//= require scrollme/jquery.scrollme.min.js
//= require mixitup/build/jquery.mixitup.min.js
//= require _plugins
//= require _solutions




$(document).on('ready', function() {
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


  solution_data.filters.forEach(function(filter) {
    $tab = $($.parseHTML("<li class='tab'></li>"));
    $tab.data('filter', filter.slug).text(filter.label).appendTo(".filter.tabs");
  })

  $('.tab').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    var filter = $(this).data('filter');

    showStat(filter);
    // chart.update(getData(filter));
  });
});