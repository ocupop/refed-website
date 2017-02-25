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

4 scenarios
- signing up for first time (confirmation message)
- signing in from downloads page (confirmation message and update downloadble links - with a link to show the form)

- singing in (show the update form)






 */
(function() {

$.behaviors('.profile', initSignup);

  function initSignup(form) {
    form = $(form);
    var form_id;
    var profile_message = $('.profileMessage');

    form.ajaxForm({
      dataType: 'json',
      beforeSubmit: function(arr, $form, options) { 
        // The array of form data takes the following form: 
        // [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ] 
        // return false to cancel submit
        form_id = $form.attr('id');
      },
      success: function(resp) {
        window.console.log("/components/signup.js: Success", form_id);
        if (resp.error) {
          var notification = { title: 'Error', message: resp.error };
          showProgress(notification);
        } else {
          // Set Message
          var notification = { title: '', message: "Updating page..." };
          showProgress(notification);
          // Set cookie for memberEmail
          $.cookie('memberEmail', resp.email_address, { expires: 7, path: '/' });

          // if this is an update do this
          if(form.data('action') == 'update') {
            buildUpdateForm(resp);
          }
          if(form.data('action') == 'signin'){
            buildUpdateForm(resp);
          }
          // if this is a download do this
          if(form.data('action') == 'download') {
            updateDownloadPage();
            buildUpdateForm(resp);
          }
          
          profile_message.each(function(){
            $(this).removeClass('active');
            if($(this).data('message') == form_id){
              window.console.log($(this).data('message'));
              $(this).addClass('active');
            }
          })
        }
      },
      error: function() {
        // window.console.log("/components/signup.js: OOPS");
        var notification = { title: 'Error', message: "Sorry we have experienced an unexpected issue. Please try again." };
        showProgress(notification);
      }
    });
  }

  function buildUpdateForm(resp) {
    window.console.log("/components/signup.js: buildUpdateForm");
    // Populate form values with response
    $("#confirm_email").val(resp.email_address);
    $("#confirm_first_name").val(resp.merge_fields.FNAME);
    $("#confirm_last_name").val(resp.merge_fields.LNAME);
    $("#confirm_zip_code").val(resp.merge_fields.ZIP);
    $("#confirm_organization").val(resp.merge_fields.ORG);
    $("#confirm_stakeholders").val(resp.merge_fields.STAKEHOLDE);
    $("#confirm_solutions").val(resp.merge_fields.SOLUTIONS);
    var firstname = ' ' + resp.merge_fields.FNAME;
    window.console.log(firstname);
    $("#firstname").append(firstname);
  }

  function signUpSuccess() {
    window.console.log("/components/signup.js: signUpSuccess");
    // Leave a message in place of the signup form
  }

  function updateDownloadPage() {
    window.console.log("/components/signup.js: updateDownloadPage");
    // $.scrollTo($("#"));
    
    $('.chapter').find('.message').fadeOut().end()
                  .find('.button').removeClass('disabled').off('click');
  }

  function showProgress(notification) {
    $("#thanks h2").text(notification.title);
    $("#thanks .lead").text(notification.message);
    $("#thanks").fadeIn(500);

    setTimeout(function() {
      $('#thanks').fadeOut('slow');
    }, 3000);
  }



  

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
  //     window.console.log("/components/signup.js: OOPS");
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
  //     window.console.log("/components/signup.js: OOPS");
  //     var notification = { title: 'Error', message: "Sorry we have experienced an unexpected issue. Please try again." };
  //     showMessage(notification);
  //   }
  // });



  


  // // TODO - Needs to be abstracte out to seperate JS
  // $('.chapter .button').on('click', function(e) {
  //   if($(this).hasClass('disabled')) {
  //     e.stopPropagation();
  //     alert("Please fill in form details to enable download.");
  //     $.scrollTo('#signup-form');
  //   }
  // });


})();


