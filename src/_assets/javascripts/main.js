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

  window.console.log(solution_data);
  solution_data.sort.forEach(function(sort) {
    window.console.log(sort);
    $tab = $($.parseHTML("<li class='tab sort'></li>"));
    $tab.attr('data-sort', sort.slug).text(sort.label).appendTo(".sort.tabs");
  })

  $('.tab').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    var sort = $(this).attr('data-sort');

    showStat(sort);
    // chart.update(getData(filter));
  });
});