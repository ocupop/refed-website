//= require jquery
//= require bootstrap-sprockets
//= require chartist/dist/chartist.min.js
//= require scrollme/jquery.scrollme.min.js
//= require mixitup/build/jquery.mixitup.min.js
//= require vendor/jquery.mixitup-pagination.min.js
//= require _plugins
//= require _solutions




$(document).on('ready', function() {
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

  // solution_data.sort.forEach(function(sort) {
  //   $tab = $($.parseHTML("<li class='tab sort'></li>"));
  //   $tab.attr('data-sort', sort.slug).text(sort.title).appendTo(".tabs");
  // })

  $('.sort').on('click', function() {
    $(this).trigger('sort-cards');
    // This might need to be moved to the sort-cards listener
    $(this).addClass('active').siblings().removeClass('active');
    // chart.update(getData(filter));
  });
});