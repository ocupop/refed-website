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


Google API key: AIzaSyDwNUfXSzS2DIWfUsYhhbIM22xUtNJ4DtM

 */
(function() {

$.behaviors('.innovatorDatabase_filters', innovatorDatabase_filters);

  var targetSelector = '.mix';
  var activeHash = '';


  function innovatorDatabase_filters(filters) {
    filters = $(filters);
    var containerEl = document.querySelector('.innovatorDatabase_list');

    // Instantiate MixItUp
    // var mixer = mixitup(containerEl, {
    //     multifilter: {
    //         enable: true
    //     },
    //     animation: {
    //         effects: 'fade translateZ(-100px)'
    //     },
    //     callbacks: {
    //         onMixEnd: setHash // Call the setHash() method at the end of each operation
    //     }
    // });

    // var groupsState = deserializeHash();

    // if (groupsState) {
    //     // If a valid groupsState object is present on page load, filter the mixer
    //     filterMixerByGroupsState(groupsState);
    // }

  }


  /**
   * Deserializes a hash segment (if present) into in an object.
   *
   * @return {object|null}
   */

   function deserializeHash() {
       var hash    = window.location.hash.replace(/^#/g, '');
       var obj     = null;
       var groups  = [];

       if (!hash) return obj;

       obj = {};
       groups = hash.split('&');

       groups.forEach(function(group) {
           var pair = group.split('=');
           var groupName = pair[0];

           obj[groupName] = pair[1].split(',');
       });

       return obj;
   }

  /**
   * Serializes a groupsState object into a string.
   *
   * @param   {object}    groupsState
   * @return  {string}
   */

  function serializeGroupsState(groupsState) {
      var output = '';

      for (var key in groupsState) {
          var values = groupsState[key];

          if (!values.length) continue;

          output += key + '=';
          output += values.join(',');
          output += '&';
      };

      output = output.replace(/&$/g, '');

      return output;
  }

  /**
   * Constructs a `groupsState` hash object using the
   * `getFilterGroupSelectors()` API method.
   *
   * @return {object}
   */

  function getGroupsState() {
      // NB: You will need to rename the object keys to match the names of
      // your project's filter groups – these should match those defined
      // in your HTML.

      var groupsState = {
          color: mixer.getFilterGroupSelectors('status').map(getValueFromSelector),
          shape: mixer.getFilterGroupSelectors('category').map(getValueFromSelector),
          size: mixer.getFilterGroupSelectors('hierarchy').map(getValueFromSelector)
      };

      return groupsState;
  }

  /**
   * Updates the URL hash whenever the current filter changes.
   *
   * @param   {mixitup.State} state
   * @return  {void}
   */

  function setHash(state) {
    window.console.log("setHash");
      // var selector = state.activeFilter.selector;

      // // Construct an object representing the current state of each
      // // filter group

      // var groupsState = getGroupsState();

      // // Create a URL hash string by serializing the groupsState object

      // var newHash = '#' + serializeGroupsState(groupsState);

      // if (selector === targetSelector && window.location.hash) {
      //     // Equivalent to filter "all", remove the hash

      //     activeHash = '';

      //     history.pushState(null, document.title, window.location.pathname); // or `history.replaceState()`
      // } else if (newHash !== window.location.hash && selector !== targetSelector) {
      //     // Change the hash

      //     activeHash = newHash;

      //     history.pushState(null, document.title, window.location.pathname + newHash); // or `history.replaceState()`
      // }
  }

  /**
   * Filters the mixer and updates the multifilter UI using a provided
   * groupsState object.
   *
   * @param  {object|null}    groupsState
   * @param  {boolean}        [animate]
   * @return {Promise}
   */

  function filterMixerByGroupsState(groupsState, animate) {
      var color = (groupsState && groupsState.color) ? groupsState.color : [];
      var size = (groupsState && groupsState.size) ? groupsState.size : [];
      var shape = (groupsState && groupsState.shape) ? groupsState.shape : [];

      mixer.setFilterGroupSelectors('status', status.map(getSelectorFromValue));
      mixer.setFilterGroupSelectors('category', category.map(getSelectorFromValue));
      mixer.setFilterGroupSelectors('hierarchy', hierarchy.map(getSelectorFromValue));

      // Parse the filter groups (passing `false` will perform no animation)

      return mixer.parseFilterGroups(animate ? true : false);
  }

  /**
   * Converts a selector (e.g. '.green') into a simple value (e.g. 'green').
   *
   * @param   {string} selector
   * @return  {string}
   */

  function getValueFromSelector(selector) {
      return selector.replace(/^./, '');
  }

  /**
   * Converts a simple value (e.g. 'green') into a selector (e.g. '.green').
   *
   * @param   {string} selector
   * @return  {string}
   */

  function getSelectorFromValue(value) {
      return '.' + value;
  }


  // Add an "onhashchange" handler to keep the mixer in sync as the user goes
  // back and forward through their history.

  // TB: This may or may not be the desired behavior for your project. If you don't
  // want MixItUp operations to count as individual history items, simply use
  // `history.replaceState()` instead of `history.pushState()` within the `setHash()`
  // function above. In which case this handler would no longer be neccessary.

  window.onhashchange = function() {
      var groupsState = deserializeHash();
      var hash        = window.location.hash;

      // Compare new hash with active hash

      if (hash === activeHash) return; // no change

      activeHash = hash;

      filterMixerByGroupsState(groupsState, true);
  };

})();


