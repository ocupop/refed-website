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

FOR SOLUTION CARDS AND BLOG ARTICLE FILTERS
import mixitup from 'mixitup';
import $ from 'jquery';

mixitup.use($);

// MixItUp can now be used as a jQuery plugin, as per the v2 API

$('.container').mixitup();

 */
(function() {

$.behaviors('.innovatorDatabase_list', innovatorDatabase_list);

  function innovatorDatabase_list(list) {
    list = $(list);
    $(window).on('searchLocation', function(event, location) {

        var searchLocation = new google.maps.LatLng(location.lat, location.lng);
        updateInnovatorDistances(list, searchLocation);

    });
    // list.mixItUp({
    //   controls: {
    //     enable: false 
    //     // as we are interacting via the API, we can disable default controls to increase performance
    //   },
    //   load: {
    //     filter: urlParams["filter"],
    //     sort: "name:desc"
    //   },
    //   callbacks: {
    //     onMixEnd: function(state){
    //       window.console.log("/tools/innovator-database.list.js: ", state);
    //     }
    //   },
    //   selectors: {
    //     target: '.row',
    //     filter: '.filter',
    //     sort: '.sort'
    //   }
    //   // ,pagination: {
    //   //   limit: limit
    //   // }
    // });

  }

  function updateInnovatorDistances(list, searchLocation) {

    list.find('.innovator').each(function() {
        var lat = $(this).data('lat')/1,
            lng = $(this).data('lng')/1,
            position = new google.maps.LatLng(lat, lng);

        var distance = calcDistance(position, searchLocation);

        $(this).find('.distance').text(distance);
        $(this).attr('data-distance', distance);
        // list.mixItUp({});
    });
  }
  function calcDistance(p1, p2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) * 0.000621371).toFixed(0);
  }

})();
