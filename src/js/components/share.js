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

    var share = {};
    share.title = button.data('title') || document.querySelector("title").innerHTML.replace(/[^a-z0-9\s]/gi, ' ');
    share.summary = document.querySelector('meta[name="description"]')["content"];
    share.url = button.data('link') || window.location;

    button.on('click', function(e){
      // window.console.log('share.js: share url', share.url)
      // window.console.log('share.js: share title', share.title);
      e.preventDefault();
      build_urls(share);

      ga('send', 'event', 'share', 'refed', share.url);

    });

    // $(window).bind('hashchange', function() {
    //   window.console.log("share.js: hashchange");
    // }); 
    // if($('#share-instructions').hasClass('active')){
    //   window.console.log('share.js: share instructions active');
      
    // }
    // if ($("#share-instructions.active")[0]){
    //  window.console.log('share active'); 
    //   $('#pageContent').on('click', function(){
    //     window.console.log('share.js share is active');
    //     $('#share-instructions').removeClass('active');
    //   });
    // }
    $('#pageContent').mouseup(function (e)
    {
        var container = $("#share-instructions.active");
        // window.console.log('clicked');
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass('active');
        }
    });
  }

  function build_urls(share) {
    var facebook_url = "http://www.facebook.com/sharer.php?u=" + share.url,
        twitter_url = "https://twitter.com/intent/tweet?url="+share.url+"&text="+share.title+"+%7C+Rethink+Food+Waste&amp;hashtags=refed",
        linkedin_url = "https://www.linkedin.com/shareArticle?mini=true&url="+share.url+"&title="+share.title+"&summary="+share.summary+"&source=",
        mail_url = 'mailto:?subject= ' + share.title + '&body=' + share.url;

    var close = $('#share-instructions .close');
    var share_instructions = $('#share-instructions');

    share_instructions.find('a.facebook').attr('href', facebook_url).end()
                      .find('a.twitter').attr('href', twitter_url).end()
                      .find('a.linkedin').attr('href', linkedin_url).end()
                      .find('a.mail').attr('href', mail_url).end()
                      .find('input.link').val(share.url).end()
                      .addClass('active');

    close.on('click', function(){
      share_instructions.removeClass('active');
    });
    $("#share-instructions input").on("click", function () {
      $(this).select();
    });
  }

})();
