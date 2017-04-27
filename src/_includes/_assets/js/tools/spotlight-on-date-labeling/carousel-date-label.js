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

$.behaviors('#carousel-date-label', carousel_date_label);

  function carousel_date_label(container){
    container = $(container);

    window.console.log('carousel-date-label.js: ready');

    container.on('slid.bs.carousel', function (e) {
      var direction = e.direction;
      var progress = $(e.relatedTarget).data("progress");
      var current_map = $(e.relatedTarget).data("map");

      $('.map-datelabel').removeClass('active');
      $(current_map).addClass('active');

      $('.progress-bar').css("width", progress + "%").attr("aria-valuenow", progress);
      if(progress == 100) {
        $('.right').addClass('hide');
      }else{
        $('.right').removeClass('hide');
      }
    });

    $('[data-slide="prev"]').on('click', function(){
      var progress = $('#carousel-date-label .active').data("progress");
      if(progress == 25){
        $('#labeling-carousel-intro').fadeIn();
        $('.carousel-datelabel').hide();
      }
    });

    $(window).on('hide.bs.tab', function(e) {
      $('#labeling-carousel-intro').fadeIn();
      $('.carousel-datelabel').hide();
    });

    $('#start-slides').click(function(){
      $('#labeling-carousel-intro').hide();
      $('.carousel-datelabel').fadeIn();
    });
  }
})(); 







