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
// window.addEventListener('popstate', function(event) {
//   // window.console.log("pageState: popstate", event);
//   var hash = window.location.hash;
  
//   if(hash) {
//     window.console.log("popstate: Activating Tabs", hash);
//     activateTab(hash);
//     return;
//   }
// });

  function pageState(body) {
    // var hash = location.hash;
    window.console.log("pageState: Initialized");
    // if (hash) {
    //   // run a check to see if there are any tabs with matching href
    //   window.console.log("pageState: Activating Tab");
    //   activateTab(hash);
    // }
    var hashState = deserializeHash();
    window.console.log(hashState);

    if(hashState.active_tab) {
      activateTab(hashState.active_tab);
    }

  }

  function updateContent(data) {
    // Set activeTab
    $(data.activeTab).addClass('active').siblings().removeClass('active');

  }

  function deserializeHash() {
      var hash    = window.location.hash.replace(/^#/g, '');
      window.console.log(hash);
      var obj     = null;
      var groups  = [];

      if (!hash) return obj;

      obj = {};
      groups = hash.split('&');

      window.console.log(groups);

      groups.forEach(function(group) {
          var pair = group.split('=');
          var groupName = pair[0];

          obj[groupName] = pair[1].split(',');
      });

      return obj;
  }



  window.activateTab = function(tab) {
    var tabClass = "activeTab_" + tab;

    // Activate Matching Tab
    $('[data-toggle="tab"]').filter('[href$="'+tab+'"]').tab("show");

    // Update the body class to reflect the active tab
    $('body').removeClass(function(index, className) {
        return (className.match (/(^|\s)activeTab_\S+/g) || []).join(' ');
      })
     .addClass(tabClass);


    // if (typeof hash != 'undefined' && hash != '') {
    //   if (history && history.pushState) {
    //     // window.console.log("DATA:", data);
    //     window.history.pushState('', 'ReFED', window.location.pathname + window.location.search + hash);
    //   } else {
    //     scrollV = document.body.scrollTop;
    //     scrollH = document.body.scrollLeft;
    //     window.location.hash = hash;
    //     document.body.scrollTop = scrollV;
    //     document.body.scrollLeft = scrollH;
    //   }
    // }
  }

})();
