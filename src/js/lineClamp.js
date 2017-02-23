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

$.behaviors('.lineClamp', clamp);

  function clamp(container) {

    container = $(container);

    var num_lines = container.data('numlines');
    var line_height = container.css('line-height').replace(/[^-\d\.]/g, '');  
    var clamp_height = num_lines * line_height;
    var total_height = container.css('height').replace(/[^-\d\.]/g, '');
    var unclamp = '<button class="unclamp">Read More</button>';
    if(clamp_height <= total_height){
      container.css('height', num_lines * line_height + 20);
      $('<button class="unClamp">Read More</button>').insertAfter(container);
    }

    var unclamp = $('.unClamp');

    unclamp.on('click', function(){
      if(container.hasClass('open')){
        unclamp.text('Read more');
        container.height(clamp_height).removeClass('open');
      }else {
        unclamp.text('Less');
        container.height('auto').addClass('open');
      }
    });
  }

})();