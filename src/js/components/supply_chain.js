/* Copyright (C) 2017 ReFED
 * 
 * http://www.refed.com
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

$.behaviors('#supply-chain', initChain);

  function initChain(container) {
    // TODO - Refactor. RE-think selector. Maybe this need to be a class and match naming conventions

    $("#supply-chain li").on('click', function() {
      var activeClass = $(this).attr('class');
      $("#supply-chain li").each(function() {
        if($(this).hasClass(activeClass)) {
          $(this).addClass('active').removeClass('inactive');
        } else {
          $(this).removeClass('active').addClass('inactive');
        }
      });
      $("#related-solutions").attr('class', $(this).attr('class')).fadeIn();
    });
    $("#supply-chain .close").on('click', function() {
      $('#related-solutions').fadeOut();
      $("#supply-chain li").removeClass('active inactive');
    });
  }

})();


