$(function(){
  var $container = $('.articles');
  
  $container.mixItUp();
  
  $('.sort-articles').on('click', function(){
    var sort = $(this).data('sort');
    // window.console.log(sort);
    if(sort == 'date:asc'){
      $container.mixItUp('sort', sort);
      $('.sort-articles').toggleClass('sort-dsc').data('sort', 'date:dsc');
    }
    if(sort == 'date:dsc'){
      $container.mixItUp('sort', sort);
      $('.sort-articles').toggleClass('sort-dsc').data('sort', 'date:asc');
    }
  });

  $('#filter-articles').on('change', function(){
    $container.mixItUp('filter', this.value);
  });
});




