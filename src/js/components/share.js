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

$.behaviors('.share', initShare);

  function initShare(button) {
    button = $(button);
    var shareSource = button.data('src');
    var host = window.location.host;
    var pathname = window.location.pathname;
    var current_url = host + pathname;
    // window.console.log(current_url);
    var linkedin_url = 'https://www.linkedin.com/shareArticle?mini=true&url=http%3A//' + current_url + '&title=&summary=&source=';
    var facebook_url = 'http://www.facebook.com/sharer.php?u=http%3A//' + current_url;
    var twitter_url = 'https://twitter.com/intent/tweet?url=http%3A//' + current_url + '&amp;text=ReFED+%7C+Rethink+Food+Waste&amp;hashtags=refed';
    var full_url = 'http://' + current_url;
    // window.console.log(full_url);

    button.on('click', function(e){
      e.preventDefault();
      $('#socialShare').attr('src', shareSource);
      // window.console.log('share clicked');
      $('#share-instructions .facebook').attr('href', facebook_url);
      $('#share-instructions .twitter').attr('href', twitter_url);
      $('#share-instructions .linkedin').attr('href', linkedin_url);
      $('#share-instructions input').attr('value', full_url);
      $('#share-instructions').addClass('active');
    });
  }

})();


// TODO - Combine with the embed include