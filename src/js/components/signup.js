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

$.behaviors('.signup', initSignup);

  function initSignup(container) {
    // window.console.log("HELLO");
  }

  // function showMessage(notification) {
  //   $("#thanks h2").text(notification.title);
  //   $("#thanks .lead").text(notification.message);
  //   $("#thanks").fadeIn(500);

  //   setTimeout(function() {
  //     $('#thanks').fadeOut('slow');
  //   }, 3000);
  // }

  // function updateProfile(resp) {
  //   window.console.log(resp);
  //   $.scrollTo($("#"));
  //   if (resp.error) {
  //     var notification = { title: 'Error', message: resp.error };
  //     showMessage(notification);
  //   } else {
  //     // Set Message
  //     var notification = { title: '', message: "Loading profile information..." };
  //     showMessage(notification);
  //     // Set cookie for memberEmail
  //     $.cookie('memberEmail', resp.email_address, { expires: 7, path: '/' });
  //     // Populate form values with response
  //     $("#confirm_email").val(resp.email_address);
  //     $("#confirm_first_name").val(resp.merge_fields.FNAME);
  //     $("#confirm_last_name").val(resp.merge_fields.LNAME);
  //     $("#confirm_zip_code").val(resp.merge_fields.ZIP);
  //     $("#confirm_organization").val(resp.merge_fields.ORG);
  //     $("#confirm_stakeholders").val(resp.merge_fields.STAKEHOLDE);
  //     $("#confirm_solutions").val(resp.merge_fields.SOLUTIONS);
      
  //     $("#signup-signin").hide();
  //     $("#profile").fadeIn();
  //     $('.chapter').find('.message').fadeOut().end()
  //                   .find('.button').removeClass('disabled');
  //   }
  // }
  // $('#profile form').ajaxForm({
  //   dataType: 'json',
  //   beforeSubmit: function(arr, $form, options) { 
  //     // The array of form data takes the following form: 
  //     // [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ] 
  //     // return false to cancel submit
  //   },
  //   success: function(resp) {
  //     updateProfile(resp);
  //   },
  //   error: function() {
  //     window.console.log("OOPS");
  //     var notification = { title: 'Error', message: "Sorry we have experienced an unexpected issue. Please try again." };
  //     showMessage(notification);
  //   }
  // });

  // $('#signup_form').ajaxForm({
  //   dataType: 'json',
  //   beforeSubmit: function(arr, $form, options) { 
  //     // The array of form data takes the following form: 
  //     // [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ] 
  //     // return false to cancel submit
  //   },
  //   success: function(resp) {
  //     updateProfile(resp);
  //   },
  //   error: function() {
  //     window.console.log("OOPS");
  //     var notification = { title: 'Error', message: "Sorry we have experienced an unexpected issue. Please try again." };
  //     showMessage(notification);
  //   }
  // });

  // $('#signin_form').ajaxForm({
  //   dataType: 'json',
  //   beforeSubmit: function(arr, $form, options) { 
  //     // The array of form data takes the following form: 
  //     // [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ] 
  //     // return false to cancel submit
  //   },
  //   success: function(resp) {
  //     updateProfile(resp);
  //   },
  //   error: function() {
  //     window.console.log("OOPS");
  //     var notification = { title: 'Error', message: "Sorry we have experienced an unexpected issue. Please try again." };
  //     showMessage(notification);
  //   }
  // });

  // $(function() {
  //   if ($.cookie('memberEmail')) {
  //     $('#signup-signin').hide();
  //     $.ajax({
  //       url: "https://ancient-wave-20081.herokuapp.com/signin",
  //       data: {email_return: $.cookie('memberEmail')},
  //       success: function(resp) {
  //         updateProfile(resp);
  //       }
  //     });
  //   }
  // });

  // $('.chapter .button').on('click', function(e) {
  //   if($(this).hasClass('disabled')) {
  //     e.stopPropagation();
  //     alert("Please fill in form details to enable download.");
  //     $.scrollTo('#signup-form');
  //   }
  // });

  // $(document).ready(function() {
  //     $('#confirm_stakeholders').multiselect({
  //       includeSelectAllOption: true,
  //       selectAllText: 'Select All',
  //       nonSelectedText: 'Choose Stakeholders'
  //     });
  //     $('#confirm_solutions').multiselect({
  //       includeSelectAllOption: true,
  //       selectAllText: 'Select All',
  //       nonSelectedText: 'Choose Solutions'
  //     });
  // });

})();


