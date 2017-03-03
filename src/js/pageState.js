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
    window.console.log("pageState: Initialized");
    // Deserialize the hash on page load
    var hashState = deserializeHash();
    // window.console.log("DETERMINE HASH STATE ON PAGE LOAD:", hashState);
    
    // Activate Tabs
    if(hashState && hashState.active_tab) {
      activateTab(hashState.active_tab);
    }

  }


  window.deserializeHash = function() {
      var hash    = window.location.hash.replace(/^#/g, '');
      window.console.log("deserializeHash:", hash);
      var obj     = null;
      var groups  = [];

      if (!hash) return obj;

      obj = {};
      groups = hash.split('&');

      window.console.log("DESERIALIZE HASH: ", groups);

      groups.forEach(function(group) {
          var pair = group.split('=');
          window.console.log("DESERIALIZE HASH: pair ");
          var groupName = pair[0];
          // TODO - Avoiding errors on simple anchors - Needs refactor
          if(pair[1]) {
            obj[groupName] = pair[1].split(',');
          }
      });

      return obj;
  }


  function serializeHashState(state) {
      var output = '';

      for (var key in state) {
        // window.console.log("KEY/VALUE:", key, state[key]);
          var values = state[key];

          if (!values.length) continue;

          output += key + '=';
          output += values.join(',');
          output += '&';
      };

      output = output.replace(/&$/g, '');

      return output;
  }

  window.setHash = function(state) {
    // Create a URL hash string by serializing the state object
    var newHash = '#' + serializeHashState(state);

    // window.console.log("NEW HASH STATE: ", newHash);


    if (history && history.pushState) {
      // window.console.log("DATA:", data);
      window.history.pushState(null, document.title, window.location.pathname + window.location.search + newHash);
    } else {
      // TODO - Understand this case scenario
      scrollV = document.body.scrollTop;
      scrollH = document.body.scrollLeft;
      window.location.hash = newHash;
      document.body.scrollTop = scrollV;
      document.body.scrollLeft = scrollH;
    }

  }

  window.setActiveTabInHash = function(tab) {
    var currentState = deserializeHash();
    newState = currentState ? currentState : {};

    newState.active_tab = [tab];
    setHash(newState);

  }

  window.setTabClass = function(tab) {
    // TODO - Update CSS so that we can just add a class of tab value to the body.
    var tabClass = "activeTab_" + tab;
    // window.console.log("tabClass:", tabClass);

    // Update the body class to reflect the active tab
    $('body').removeClass(function(index, className) {
        return (className.match (/(^|\s)activeTab_\S+/g) || []).join(' ');
      })
     .addClass(tabClass);
  }

  activateTab = function(tab) {
    window.console.log("activateTab: ", tab);
    var link = $('[data-target="#'+tab+'"]');

    // Show the tab content
    link.tab('show');

    // Set the body class
    setTabClass(tab);
  }

  window.onhashchange = function(e) {
    window.console.log("HASH CHANGE: update activeTab", e);
    // window.console.log("HASH CHANGE: current_url", window.location);
    // location.reload();
      // var groupsState = deserializeSearch();
      // var search      = window.location.search;

      // // Compare new hash with active hash

      // if (search === activeSearch) return; // no change

      // activeSearch = search;

      // filterMixerByHashState(groupsState, true);
  };

})();
