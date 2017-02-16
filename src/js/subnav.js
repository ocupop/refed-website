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

$.behaviors('.subnav', subnav);

  function subnav(container) {
   $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
     var nextText = $('.nav-tabs > .active').next('li').find('a').text();
     // window.console.log("nextText is", nextText);
     if(nextText == ''){
       $('.btnNext').addClass('disabled');
     }else {
       $('.btnNext').removeClass('disabled');
       $('.btnNext .title').text(nextText);
     }
   })
   $('.btnNext').click(function(){
     $('.nav-tabs > .active').next('li').find('a').trigger('click');
     var title = $('.nav-tabs > .active').next('li').find('a').text();
     // window.console.log(title);
     $("html, body").animate({ scrollTop: 0 }, 500);
     if(title == ''){
       $(this).addClass('disabled');
       window.console.log("no title to show");
     } else {
       $(this).removeClass('disabled');
       $('.btnNext .title').text(title);
     }
   });
  }

})();
