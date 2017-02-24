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

    var close = $('#share-instructions .close');
    var share_instructions = $('#share-instructions');

    button.on('click', function(e){
      e.preventDefault();
      build_urls(e);
      share_instructions.toggleClass('active');
    });

    close.on('click', function(){
      share_instructions.removeClass('active');
    });

    $(window).bind('hashchange', function() {
      window.console.log("share.js: hashchange");
    }); 

  }
  function build_urls(event) {
    var facebook_url = "http://www.facebook.com/sharer.php",
        twitter_url = "https://twitter.com/intent/tweet",
        linkedin_url = "https://www.linkedin.com/shareArticle",
        mail_url = "mailto:?subject=ReFED - ";
    window.console.log(event);
  }

})();


// TODO - Combine with the embed include

// share: {
//   title: "title",
//   summary: "lorem ipsum",
//   url: "absolute path",
//   keywords: "ReFED"
// }
