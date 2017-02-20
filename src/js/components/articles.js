/* Copyright (C) 2017 Ocupop
 * 
 * http://www.ocupop.com
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see
 * http://www.gnu.org/licenses/agpl-3.0.html.
 */
(function() {

$.behaviors('.articles', initMixItUp);

  function initMixItUp(container) {
    // button = $(button);
    var mixer = mixitup(container);
    
    $('.sort-articles').on('click', function(){
      var sort = $(this).data('sort');
      // window.console.log("/components/article.js: "sort);

      mixer.sort(sort)
        .then(function(state) {
          $(this).toggleClass('sort-desc sort-asc')
        });

      if(sort == 'date:asc'){

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

  }

})();


$(function(){
  var $container = $('.articles');
  
  $container.mixItUp();
  
  $('.sort-articles').on('click', function(){
    var sort = $(this).data('sort');
    // window.console.log("/components/article.js: "sort);
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




