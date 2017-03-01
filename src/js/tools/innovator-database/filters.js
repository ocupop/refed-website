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
$.behaviors('.filterToggle', initToggle);

  var targetSelector = '.innovator';
  var activeHash = '';

  function initToggle(container) {
    container = $(container);
    container.on('click', function() {
      $('.innovatorDatabase_filters').toggleClass('open');
    });
  }

  function innovatorDatabase_filters(filters) {
    filters = $(filters);
    var list = $('.innovatorDatabase_list').first();

    window.mixer = mixitup(list, {
      multifilter: {
        enable: true,
        minSearchLength: 2
      },
      load: {
        sort: 'random'
      },
      selectors: {
        target: '.innovator',
        control: '[data-mixitup-control], .mixitup-control'
      },
      pagination: {
        limit: 10,
        // maintainActivePage: false,
        // loop: true,
        hidePageListIfSinglePage: true
      },
      callbacks: {
          onMixEnd: setSearch // Call the setSearch() method at the end of each operation
      }
    });

    var groupsState = deserializeSearch();

    if (groupsState) {
        // If a valid groupsState object is present on page load, filter the mixer
        filterMixerByGroupsState(groupsState);
    }

  }


  /**
   * Deserializes a hash segment (if present) into in an object.
   *
   * @return {object|null}
   */

   function deserializeSearch() {
       // var hash    = window.location.hash.replace(/^#/g, '');
       var search  = window.location.search.replace(/^\?/g, '');
       var obj     = null;
       var groups  = [];

       if (!search) return obj;

       obj = {};
       groups = search.split('&');

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
        business_model: mixer.getFilterGroupSelectors('business_model').map(getValueFromSelector),
        innovator_category: mixer.getFilterGroupSelectors('innovator_category').map(getValueFromSelector),
        hierarchy: mixer.getFilterGroupSelectors('hierarchy').map(getValueFromSelector)
      };

      return groupsState;
  }

  /**
   * Updates the URL search whenever the current filter changes.
   *
   * @param   {mixitup.State} state
   * @return  {void}
   */

  function setSearch(state) {
    var selector = state.activeFilter.selector;

    // Construct an object representing the current state of each
    // filter group

    var groupsState = getGroupsState();

    // Create a URL search string by serializing the groupsState object

    var newSearch = '?' + serializeGroupsState(groupsState);

    if (selector === targetSelector && window.location.search) {
        // Equivalent to filter "all", remove the search

        activeSearch = '';

        history.pushState(null, document.title, window.location.pathname); // or `history.replaceState()`
    } else if (newSearch !== window.location.search && selector !== targetSelector) {
        // Change the search

        activeSearch = newSearch;

        history.pushState(null, document.title, window.location.pathname + newSearch); // or `history.replaceState()`
    }
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

      var business_model = (groupsState && groupsState.business_model) ? groupsState.business_model : [];
      var innovator_category = (groupsState && groupsState.innovator_category) ? groupsState.innovator_category : [];
      var hierarchy = (groupsState && groupsState.hierarchy) ? groupsState.hierarchy : [];

      mixer.setFilterGroupSelectors('business_model', business_model.map(getSelectorFromValue));
      mixer.setFilterGroupSelectors('innovator_category', innovator_category.map(getSelectorFromValue));
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
  // `history.replaceState()` instead of `history.pushState()` within the `setSearch()`
  // function above. In which case this handler would no longer be neccessary.

  window.onhashchange = function() {
      var groupsState = deserializeSearch();
      var search        = window.location.search;

      // Compare new hash with active hash

      if (search === activeSearch) return; // no change

      activeSearch = search;

      filterMixerByGroupsState(groupsState, true);
  };

})();


