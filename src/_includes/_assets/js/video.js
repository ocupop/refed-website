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

$.behaviors('[data-toggle="video"]', initVideo);

  function initVideo(button) {
    var target = $(button).data('target');

    $(button).on('click', loadVideo);
    $(target).on('hidden.bs.modal', unloadVideo);
  }

  function loadVideo() {
    button = $(this);
    var source = button.data('source');
    var target = button.data('target');

    $(target).find('iframe').attr('src', source);
    $(target).modal();
  }

  function unloadVideo() {
    $(this).find('iframe').attr('src', '');
  }

})();