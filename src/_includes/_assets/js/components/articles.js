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

    var mixer = mixitup(container, {
      multifilter: {
          enable: true
      },
      selectors: {
        target: '.article',
        control: '[data-mixitup-control]'
      }
    });

    $('.sort-articles').on('click', function(){
      var sort = $(this).attr('data-sort');
      mixer.sort(sort);
      
      if(sort == 'date:asc'){
        $(this).attr('data-sort', 'date:desc');
      } else {
        $(this).attr('data-sort', 'date:asc');
      }
    });
  }
  
})();




