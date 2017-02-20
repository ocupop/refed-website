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

$.behaviors('.innovatorDatabase_list', innovatorDatabase_list);

  function innovatorDatabase_list(list) {
    list = $(list);
    $(window).on('searchLocation', function(event, location) {
        var searchLocation = new google.maps.LatLng(location.lat, location.lng),
            compare = new google.maps.LatLng(-34.397, 150.644);
        var distance = calcDistance(searchLocation, compare);
        window.console.log("Distance: ", distance);
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

  function updateInnovatorDistances(location) {

  }
  function calcDistance(p1, p2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
  }

})();
