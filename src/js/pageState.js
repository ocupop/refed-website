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

$.behaviors('body', pageState);

// Revert to a previously saved state
window.addEventListener('popstate', function(event) {
  updateContent(event.state);
});

  function pageState(body) {
    body = $('body');
    var hash = location.hash;
    var link = $('[href="' + location.hash + '"]').first();

    if (hash) {
      // potential breakpoint for intercepting the browser behavior
      if (link) {
        link.trigger('click');
      } else {
        window.console.log("pageState.js: DOM does not contain an href that matches the hash", location.hash);
        // $.scrollTo(location.hash);
      }
    } else {
      window.console.log("pageState.js: Checked for hash but did not find one.");
    }

  }

  function updateContent(data) {
    // window.console.log("pageState.js: data", data);
    // window.console.log("pageState.js: activeTab", data.activeTab);
    var activeTab = $("[data-target='"+data.activeTab+"'], [href='"+data.activeTab+"']").first();
    if(activeTab) activeTab.trigger('click');

  }

})();
