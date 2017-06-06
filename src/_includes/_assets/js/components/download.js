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

$.behaviors('.downloads', download);
$.behaviors('#member_signup_form', validateForm);

  function download(container) {

    if ($.cookie('memberEmail')) {
      window.console.log('/components/profile.js: cookie is set');
      $('.chapter').find('.message').fadeOut().end()
                    .find('.button').removeClass('disabled').off('click');
      $('.profileMessage').removeClass('active');
      $('[data-message="member_signin_form"]').addClass('active');
    }
  }

  function validateForm(form) {
    form = $(form);
    var fields = form.find('input');
    var required_fields = form.find('input[required]');
    var submit_button = form.find('input[type="submit"]');

    // Make sure that a user fills out all of the required fields in the member sign up form in order to enable the submit button
    fields.keyup(function() {
        var empty = false;
        required_fields.each(function() {
          if ($(this).val() == '') {
            empty = true;
          }
        });

        if (empty) {
            submit_button.attr('disabled', 'disabled');
        } else {
            submit_button.removeAttr('disabled').removeClass('disabled');
        }
    });
  }


})();
